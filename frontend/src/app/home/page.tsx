"use client"
import { UserBalance } from "@/components/home/userBalance";
import { useMe } from "@/providers/Me";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { FeatureList } from "@/components/home/featureList";
import Transaction from "@/components/home/transaction";
import { Checkout } from "@/components/home/checkout";
import { IterationCcw } from "lucide-react";

export default function Home() {

    const { isMounted, me, address, isLoading, disconnect, Update } = useMe()
    const [activeTab, setActiveTab] = useState<"balance" | "transactions">("balance");

    const router = useRouter();

    useEffect(() => {
        if(!isMounted) {
            router.push('/');
        } else {
            console.log(me)
        }
    }, [isMounted])

    return (
        <div className="relative w-full px-2 sm:px-8 py-16 flex flex-col items-center gap-[24px]">
            <div 
                className="absolute w-1 h-1 top-0 right-0"
                onClick={() => {
                    disconnect()
                }}
            >
            </div>
            <div 
                className="absolute w-15 h-15 top-4 -right-2"
                onClick={() => {
                    if(!isLoading) Update()
                }}
            >
                <IterationCcw width={32} height={32} className="text-blue-300"/>
            </div>
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
                <div className="flex w-full my-2">
                    <Transaction activeTab={activeTab} address={address}/>
                </div>
            </div>
        </div>
    )
}