type chain = 'ava' | 'eth' | 'base' | 'arb' | 'polygon';

export type transferData = {
  fromChain: chain;
  toChain: chain;
  amount: number;
  receiver: string;
}[];

export function buildTransferPlan(
  balances: Record<chain, number>,
  transfer: { receiver: string; amount: number; toChain: chain }
): transferData {
  const { receiver, amount, toChain } = transfer;

  // Minimum leftover after using any chain
  const MIN_LEFTOVER = 0.5;

  // ---------------------------------------------
  // 1) If sending to 'arb' or 'polygon', bridging is impossible.
  //    We must do a same-chain transfer (if leftover >= 0.5).
  // ---------------------------------------------
  if (toChain === 'arb' || toChain === 'polygon') {
    // To use fromChain=toChain, we must ensure leftover >= 0.5
    // => we can only transfer "balances[toChain] - 0.5" at most
    const maxUsable = Math.max(0, balances[toChain] - MIN_LEFTOVER);
    if (maxUsable >= amount) {
      // Enough for a same-chain transfer
      return [
        {
          fromChain: toChain,
          toChain,
          amount,
          receiver,
        },
      ];
    }
    // Not enough while keeping leftover >= 0.5 => no plan
    return [];
  }

  // ---------------------------------------------
  // 2) Otherwise, toChain is one of 'ava', 'sepolia', 'base'.
  //    Cross-chain bridging among these three is allowed.
  // ---------------------------------------------
  const bridgingChains: chain[] = ['ava', 'eth', 'base'];

  // We'll compare two plans:
  //    (A) Use partial from `toChain` + bridging remainder
  //    (B) Bridge everything from all bridging chains (ignoring toChain's local balance)

  // Attempt (A) - partial usage from toChain + bridging the remainder
  // Only if toChain is among bridgingChains => it is, from above condition
  const toChainBalance = balances[toChain];
  const partialAvailable = Math.max(0, toChainBalance - MIN_LEFTOVER);
  // how much do we actually use from the local chain
  const partialUsed = Math.min(partialAvailable, amount);
  const remainderA = amount - partialUsed;

  // gatherFromChains: tries to pick bridging amounts from the given set of chains
  // so that the leftover in each chain is >= MIN_LEFTOVER
  function gatherFromChains(
    chains: chain[],
    needed: number
  ): { fromChain: chain; amount: number }[] | null {
    // Sort chains by descending balance so we pick from largest first
    const candidates = chains
      .map((chain) => ({
        chain,
        usable: Math.max(0, balances[chain] - MIN_LEFTOVER), // this is how much we can use
      }))
      .filter((c) => c.usable > 0)
      .sort((a, b) => b.usable - a.usable);

    let remaining = needed;
    const result: { fromChain: chain; amount: number }[] = [];

    for (const { chain, usable } of candidates) {
      if (remaining <= 0) break;
      const useAmt = Math.min(usable, remaining);
      if (useAmt > 0) {
        result.push({ fromChain: chain, amount: useAmt });
        remaining -= useAmt;
      }
    }

    if (remaining > 0) {
      return null; // not enough total usable across the candidate chains
    }
    return result;
  }

  // (A) Gather remainder from bridgingChains minus `toChain` itself
  const planA_sources = gatherFromChains(
    bridgingChains.filter((c) => c !== toChain),
    remainderA
  );

  let planA: transferData = [];
  let txCountA = Infinity;
  if (planA_sources) {
    // If partialUsed > 0 => we do a same-chain send
    if (partialUsed > 0) {
      planA.push({
        fromChain: toChain,
        toChain,
        amount: partialUsed,
        receiver,
      });
    }
    for (const s of planA_sources) {
      planA.push({
        fromChain: s.fromChain,
        toChain,
        amount: s.amount,
        receiver,
      });
    }
    txCountA = planA.length;
  }

  // (B) Bridge everything from bridgingChains (including toChain? Typically no,
  // because "bridging from the same chain to itself" doesn't make sense.)
  // So we exclude toChain from the source set:
  const planB_sources = gatherFromChains(
    bridgingChains.filter((c) => c !== toChain),
    amount
  );

  let planB: transferData = [];
  let txCountB = Infinity;
  if (planB_sources) {
    planB = planB_sources.map((s) => ({
      fromChain: s.fromChain,
      toChain,
      amount: s.amount,
      receiver,
    }));
    txCountB = planB.length;
  }

  // Decide which plan to pick:
  // 1) If only one plan works => use it
  // 2) If both valid => use the fewer-tx plan
  // 3) If tie => use partial approach (A)
  const hasPlanA = planA_sources !== null;
  const hasPlanB = planB_sources !== null;

  if (!hasPlanA && !hasPlanB) {
    // Can't cover the needed amount while keeping leftover >= 0.5
    return [];
  } else if (hasPlanA && !hasPlanB) {
    return planA;
  } else if (!hasPlanA && hasPlanB) {
    return planB;
  } else {
    // Both are valid
    if (txCountA < txCountB) return planA;
    if (txCountB < txCountA) return planB;
    // tie => partial approach
    return planA;
  }
}
