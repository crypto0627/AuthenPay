"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Address } from "viem";
import { createWebAuthnCredential } from "viem/account-abstraction";

export type Me = {
  id: string;
  publicKey: `0x${string}`
};

function useMeHook() {
  const [isLoading, setIsLoading] = useState(false);
  const [me, setMe] = useState<Me | null>();
  const [isMounted, setIsMounted] = useState(false);

  function disconnect() {
    localStorage.removeItem("walletCredential");
    setMe(null);
    setIsMounted(false)
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
    } catch(e) {
      console.log("User reject the request QAQ")
    }
    setIsLoading(false)
  }

  async function get() {
    
  }

  useEffect(() => {
    const me = localStorage.getItem("walletCredential")
    if (me) {
      try {
        setMe(JSON.parse(me));
        setIsMounted(true);
      } catch (e) {
        console.log("error while parsing me");
      }
    }
  }, []);

  return {
    isLoading,
    isMounted,
    me,
    create,
    disconnect,
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
