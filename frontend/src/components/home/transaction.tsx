'use client'

import React, { useState, useEffect } from "react";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";
import Image from "next/image";

export default function Transaction({ activeTab, address }: { activeTab: "balance" | "transactions", address: string }) {
    const [chains, setChains] = useState([
        {
            name: "Base",
            icon: "/base.png",
            balance: "$0",
            currency: "USDC"
        },
        {
            name: "Ethereum",
            icon: "/ethereum.png",
            balance: "$0",
            currency: "USDC"
        },
        {
            name: "Avalanche",
            icon: "/avalanche.png",
            balance: "$0",
            currency: "USDC"
        },
        {
            name: "Arbitrum",
            icon: "/arbitrum.png",
            balance: "$0",
            currency: "USDC"
        },
        {
            name: "Polygon",
            icon: "/polygon.png",
            balance: "$0",
            currency: "USDC"
        }
    ]);

    useEffect(() => {
        const fetchBalances = async () => {
            try {
                const response = await fetch('https://alchemy-api.jake0627a1.workers.dev/balance', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        address: address
                    }),
                });
                
                if (!response.ok) {
                    throw new Error('Failed to fetch balance data');
                }
                
                const data = await response.json();
                
                // Map chain names to more readable formats
                const chainMapping: { [key: string]: string } = {
                    'base-sepolia': 'Base',
                    'sepolia': 'Ethereum',
                    'avalanche-fuji': 'Avalanche',
                    'arbitrum-sepolia': 'Arbitrum',
                    'polygon-amoy': 'Polygon'
                };
                
                // Update chains with fetched balances
                setChains(prevChains => 
                    prevChains.map(chain => {
                        const matchedData = data.find((item: any) => 
                            chainMapping[item.chain] === chain.name
                        );
                        
                        return {
                            ...chain,
                            balance: matchedData ? `$${matchedData.balance.toFixed(2)}` : "$0"
                        };
                    })
                );
            } catch (error) {
                console.error('Error fetching balances:', error);
            }
        };
        
        fetchBalances();
    }, []);

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
        <div className="flex flex-col w-full">
            <div className="w-full h-[2px] bg-gray-200"></div>
                        {activeTab === "balance" ? (
                            <div className="p-4">
                                <div className="grid grid-cols-2 gap-4">
                                    {chains.map((chain, index) => (
                                        <React.Fragment key={chain.name}>
                                            <div className="p-3 flex items-center justify-start text-black gap-4">
                                                <div className="flex-shrink-0 gap-2">
                                                    <Image src={chain.icon} alt={chain.name.toLowerCase()} width={24} height={24} className="rounded-full bg-black" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <p className="text-lg font-bold mt-1">{chain.name}</p>
                                                </div>
                                            </div>
                                            <div className="p-3 flex items-center justify-center gap-2 text-black">
                                                <p className="text-2xl font-light">{chain.balance}</p>
                                                <p className="font-medium">{chain.currency}</p>
                                            </div>
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="px-4 py-2 w-full max-w-full">
                                {transactions.map((transaction, index) => (
                                    <div key={index} className="mb-3 p-3 bg-gray-50 rounded-lg flex items-center justify-between text-black w-full">
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
    )
}