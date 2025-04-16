"use client";

import { record } from "@/services/record";
import { userBalanceData } from "@/services/userBalance";
import { TransactionRecord } from "@/types/record";
import { sleep } from "@/utils";
import { createContext, useContext, useEffect, useState } from "react";
import { Address, createPublicClient, http } from "viem";
import { createWebAuthnCredential, toCoinbaseSmartAccount, toWebAuthnAccount } from "viem/account-abstraction";
import { baseSepolia } from "viem/chains";

export type Me = {
  id: string;
  publicKey: `0x${string}`
};

function useMeHook() {
  const [isLoading, setIsLoading] = useState(false);
  const [me, setMe] = useState<Me | null>();
  const [isMounted, setIsMounted] = useState(false);
  const [address, setAddress] = useState<Address>("0x")
  const [balance, setBalance] = useState<Record<string, number>>(
    {
      "base": 0,
      "eth": 0,
      "ava": 0,
      "polygon": 0,
      "arb": 0
    }
  )
  const [records, setRecords] = useState<TransactionRecord[]>()

  function disconnect() {
    localStorage.removeItem("walletCredential");
    setMe(null);
    setIsMounted(false)
  }

  async function Update() {
    setIsLoading(true)
    const r1 = await getBalance(address)
    const r2 = await getRecords(address)
    setIsLoading(false)
  }

  async function create(
    userId: string
  ) {
    setIsLoading(true)
    try {
      const credential = await createWebAuthnCredential({ name: userId })
      const jsonn = JSON.stringify({
          id: credential.id,
          publicKey: credential.publicKey
      })
      localStorage.setItem("walletCredential", jsonn)
      
      setMe({ id: credential.id, publicKey: credential.publicKey })
      setIsMounted(true)
      getAddress({ id: credential.id, publicKey: credential.publicKey})
    } catch(e) {
      console.log("User reject the request QAQ")
    }
    setIsLoading(false)
  }

  async function getRecords(addr: Address) {
    const res = await record(addr)
    setRecords(res)
  }

  async function getBalance(addr: Address) {
    const _balance = await userBalanceData(addr)
    setBalance(_balance)
  }

  async function getAddress(credential: {
    id: string,
    publicKey: `0x${string}`
  }) {
    const publicClient = createPublicClient({
      chain: baseSepolia,
      transport: http("https://sepolia.base.org"),
    })
    
    const owner = toWebAuthnAccount({ credential })
    const account = await toCoinbaseSmartAccount({ 
      client: publicClient, 
      owners: [owner], 
    })
    setAddress(account.address)
    setIsLoading(true)
    const r1 = await getBalance(account.address)
    const r2 = await getRecords(account.address)
    setIsLoading(false)
  }

  useEffect(() => {
    const me = localStorage.getItem("walletCredential")
    if (me) {
      try {
        const parsed = JSON.parse(me)
        console.log(parsed)
        setMe(parsed);
        setIsMounted(true);
        getAddress({ id: parsed.id, publicKey: parsed.publicKey})
      } catch (e) {
        console.log("error while parsing me");
      }
    }
  }, []);

  useEffect(() => {
  }, [address])

  return {
    isLoading,
    isMounted,
    me,
    create,
    disconnect,
    address,
    balance,
    records,
    Update
  };
}

type UseMeHook = ReturnType<typeof useMeHook>;
const MeContext = createContext<UseMeHook | null>(null);

export const useMe = (): UseMeHook => {
  const context = useContext(MeContext);
  if (!context) {
    throw new Error("useMeHook must be used within a MeProvider");
  }
  return context;
};

export function MeProvider({ children }: { children: React.ReactNode }) {
  const hook = useMeHook();

  return <MeContext.Provider value={hook}>{children}</MeContext.Provider>;
}
