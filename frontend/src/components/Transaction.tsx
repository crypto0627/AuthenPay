'use client'

import React from "react";
import { useState } from "react";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";
import Image from "next/image";

export default function Transaction() {
    const [activeTab, setActiveTab] = useState<"balance" | "transactions">("balance");
    
    const chains = [
        {
            name: "Base",
            icon: "/base.png",
            balance: "$2000",
            currency: "USDC"
        },
        {
            name: "Ethereum",
            icon: "/ethereum.png",
            balance: "$3500",
            currency: "USDC"
        },
        {
            name: "Avalanche",
            icon: "/avalanche.png",
            balance: "$1200",
            currency: "USDC"
        }
    ];

    const transactions = [
        {
            method: "To",
            date: "Today, 12:00 PM",
            status: "Pending",
            amount: "$2000",
            ens: "jakekuo.eth"
        },
        {
            method: "From",
            date: "Today, 12:00 PM",
            status: "Success",
            amount: "$2000",
            ens: "jakekuo.eth"
        },
        {
            method: "To",
            date: "Today, 12:00 PM",
            status: "Failed",
            amount: "$2000",
            ens: "jakekuo.eth"
        },
        {
            method: "From",
            date: "Today, 12:00 PM",
            status: "Success",
            amount: "$2000",
            ens: "jakekuo.eth"
        },
        {
            method: "To",
            date: "Today, 12:00 PM",
            status: "Success",
            amount: "$2000",
            ens: "jakekuo.eth"
        }
    ];

    // Function to get status color based on status value
    const getStatusColor = (status: string) => {
        switch (status) {
            case "Pending":
                return "bg-yellow-100 text-yellow-800";
            case "Success":
                return "bg-green-100 text-green-800";
            case "Failed":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };
    return (
        <div className="row-span-1 flex flex-col">
                    <div className="flex justify-center items-center gap-8 mb-1">
                        <button 
                            className={`font-medium transition-colors ${activeTab === "balance" ? "text-blue-500" : "text-gray-600 hover:text-blue-500"}`}
                            onClick={() => setActiveTab("balance")}
                        >
                            Balance
                        </button>
                        <button 
                            className={`font-medium transition-colors ${activeTab === "transactions" ? "text-blue-500" : "text-gray-600 hover:text-blue-500"}`}
                            onClick={() => setActiveTab("transactions")}
                        >
                            Transactions
                        </button>
                    </div>
                    <div className="w-full h-[2px] bg-gray-200"></div>
                    <div className="flex-1 overflow-y-auto">
                        {activeTab === "balance" ? (
                            <div className="p-4">
                                <div className="grid grid-cols-2 gap-4">
                                    {chains.map((chain, index) => (
                                        <React.Fragment key={chain.name}>
                                            <div className="p-3 bg-gray-50 rounded-lg flex items-center justify-start gap-3 text-black">
                                                <div className="flex-shrink-0">
                                                    <Image src={chain.icon} alt={chain.name.toLowerCase()} width={32} height={32} className="rounded-full bg-black" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <p className="text-xl font-bold mt-1">{chain.name}</p>
                                                </div>
                                            </div>
                                            <div className="p-3 bg-gray-50 rounded-lg flex items-center justify-center gap-2 text-black">
                                                <p className="text-2xl font-bold">{chain.balance}</p>
                                                <p className="font-medium">{chain.currency}</p>
                                            </div>
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="px-4 py-2">
                                {transactions.map((transaction, index) => (
                                    <div key={index} className="mb-3 p-3 bg-gray-50 rounded-lg flex items-center justify-between text-black">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-shrink-0">
                                               {transaction.method === "To" ? <ArrowUpRight /> : <ArrowDownLeft />}
                                            </div>
                                            <div className="flex flex-col">
                                                <div className="flex items-start gap-2">
                                                    <span className={`text-lg font-medium text-black w-12`}>
                                                        {transaction.method}
                                                    </span>
                                                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(transaction.status)}`}>
                                                        {transaction.status}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-gray-500">{transaction.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <p className="font-bold text-2xl">{transaction.amount}</p>
                                            <span className="text-sm text-gray-500">{transaction.ens}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
    )
}