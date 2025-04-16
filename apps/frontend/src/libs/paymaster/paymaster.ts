import { toSimpleSmartAccount } from 'permissionless/accounts'
import { createPimlicoClient } from 'permissionless/clients/pimlico'
import {
  createPublicClient,
  encodeFunctionData,
  getAddress,
  type Hex,
  http,
  parseAbi,
  erc20Abi,
  Chain,
  Address,
} from 'viem'
import {
  createBundlerClient,
  createWebAuthnCredential,
  entryPoint06Address,
  toCoinbaseSmartAccount,
  toWebAuthnAccount,
  UserOperation,
  type EntryPointVersion,
} from 'viem/account-abstraction'
import {
  baseSepolia,
  avalancheFuji,
  arbitrumSepolia,
  sepolia,
  polygonAmoy,
} from 'viem/chains'
import { USDCAddress } from './configs/config'

export async function pimlicoUSDCPaymaster({
  credential,
  chain,
  rawCalls,
}: {
  credential: {
    id: string
    publicKey: `0x${string}`
  }
  chain: Chain
  rawCalls: {
    to: Address
    data: `0x${string}`
  }[]
}): Promise<Hex> {
  const pimlicoUrl = `https://api.pimlico.io/v2/${chain.id}/rpc?apikey=pim_63u8N8Lfj9im3rVggEbqtS`

  const publicClient = createPublicClient({
    chain: chain,
    transport: http(),
  })

  const owner = toWebAuthnAccount({ credential })
  const account = await toCoinbaseSmartAccount({
    client: publicClient,
    owners: [owner],
  })

  const pimlicoClient = createPimlicoClient({
    chain: chain,
    transport: http(pimlicoUrl),
    entryPoint: {
      address: entryPoint06Address,
      version: '0.6' as EntryPointVersion,
    },
  })

  const bundlerClient = createBundlerClient({
    account: account,
    chain: chain,
    transport: http(pimlicoUrl),
    paymaster: pimlicoClient,
    userOperation: {
      estimateFeesPerGas: async () => {
        return (await pimlicoClient.getUserOperationGasPrice()).fast
      },
    },
  })

  var usdc = USDCAddress(chain)
  const smartAccountAddress = bundlerClient.account.address

  console.log(usdc)

  const senderUsdcBalance = await publicClient.readContract({
    abi: parseAbi(['function balanceOf(address account) returns (uint256)']),
    address: usdc,
    functionName: 'balanceOf',
    args: [smartAccountAddress],
  })

  if (senderUsdcBalance < 1_000_000n) {
    throw new Error('insufficient USDC balance, required at least 1 USDC.')
  }

  const quotes = await pimlicoClient.getTokenQuotes({
    tokens: [usdc],
  })
  const { postOpGas, exchangeRate, paymaster } = quotes[0]

  const userOperation: UserOperation<'0.7'> =
    await bundlerClient.prepareUserOperation({
      calls: rawCalls,
    })

  const userOperationMaxGas =
    userOperation.preVerificationGas +
    userOperation.callGasLimit +
    userOperation.verificationGasLimit +
    (userOperation.paymasterPostOpGasLimit || 0n) +
    (userOperation.paymasterVerificationGasLimit || 0n)

  const userOperationMaxCost = userOperationMaxGas * userOperation.maxFeePerGas

  // using formula here https://github.com/pimlicolabs/singleton-paymaster/blob/main/src/base/BaseSingletonPaymaster.sol#L334-L341
  const maxCostInToken =
    ((userOperationMaxCost + postOpGas * userOperation.maxFeePerGas) *
      exchangeRate) /
    BigInt(1e18)

  try {
    const hash = await bundlerClient.sendUserOperation({
      paymasterContext: {
        token: usdc,
      },
      calls: [
        {
          abi: parseAbi(['function approve(address,uint)']),
          functionName: 'approve',
          args: [paymaster, maxCostInToken],
          to: usdc,
        } as any,
        ...rawCalls,
      ],
    })

    const opReceipt = await bundlerClient.waitForUserOperationReceipt({
      hash,
    })
    console.log(`transactionHash: ${opReceipt.receipt.transactionHash}`)
    return hash
  } catch (e) {
    return '0x'
  }
}
