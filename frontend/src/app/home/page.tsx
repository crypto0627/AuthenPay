"use client"
import { UserBalance } from "@/components/home/userBalance";
import { useMe } from "@/providers/Me";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { toCoinbaseSmartAccount, toWebAuthnAccount } from "viem/account-abstraction";
import { Address, createPublicClient, http } from "viem";
import { baseSepolia } from "viem/chains";
import { FeatureList } from "@/components/home/featureList";
import Transaction from "@/components/home/transaction";
import { Checkout } from "@/components/home/checkout";

export default function Home() {

    const { isMounted, me } = useMe()
    const [address, setAddress] = useState<Address>("0x")
    const [activeTab, setActiveTab] = useState<"balance" | "transactions">("balance");

    const router = useRouter();

    useEffect(() => {
        if(!isMounted) {
            setAddress("0x")
            router.push('/');
        } else {
            accountInit({
                id: me?.keyId as any,
                publicKey: me?.pubKey as any
            })
        }
    }, [isMounted])

    async function accountInit(credential: {
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
    }

    return (
        <div className="w-full px-2 sm:px-8 py-16 flex flex-col items-center gap-[24px]">
            <div
                className="text-2xl text-gray-400 w-[300px]"
            >
                <span className="text-blue-400">
                Authen
                </span>
                Pay
            </div>
            <UserBalance address={address} />
            <FeatureList />
            <div className="w-full h-full flex flex-col">
                <Checkout activeTab={activeTab} setActiveTab={setActiveTab} />
                <div className="flex overflow-y-auto max-h-[200px] w-full">
                    <Transaction activeTab={activeTab} address={address}/>
                </div>
            </div>
        </div>
    )
}