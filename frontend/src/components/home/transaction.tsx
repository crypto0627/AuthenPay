'use client'

import React, { useState, useEffect } from "react";
import { useMe } from "@/providers/Me";
import ChainItem from "./chainItem";
import TransactionItem from "./transactionItem";
import { Chain, Transaction_Form } from "@/types/transaction-type";

export default function Transaction({ activeTab, address }: { activeTab: "balance" | "transactions", address: string }) {
    const { getBalance, balance } = useMe();
    const [chains, setChains] = useState<Chain[]>([
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


    const transactions: Transaction_Form[] = [
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

    useEffect(() => {
        const fetchAndUpdateBalances = async () => {
            try {
                if (balance) {
                    const chainMapping: { [key: string]: string } = {
                        'base': 'Base',
                        'eth': 'Ethereum',
                        'ava': 'Avalanche',
                        'arb': 'Arbitrum',
                            'polygon': 'Polygon'
                        };
                        
                    setChains(prevChains => {
                        const updatedChains = prevChains.map(chain => {
                            const chainKey = Object.entries(chainMapping).find(([_, value]) => value === chain.name)?.[0];
                            const chainBalance = chainKey && balance[chainKey] !== undefined ? balance[chainKey] : 0;
                            
                            return {
                                ...chain,
                                balance: `$${chainBalance.toPrecision(2)}`
                            };
                        });
                        return updatedChains;
                    });
                }
            } catch (error) {
                console.error("Failed to fetch balance:", error);
            }
        };

        fetchAndUpdateBalances();
    }, [balance]);

    return (
        <div className="flex flex-col w-full">
            <div className="w-full h-[2px] bg-gray-200"></div>
            {activeTab === "balance" ? (
                <div className="p-4">
                    <div className="grid grid-cols-2 gap-4">
                        {chains.map((chain) => (
                            <ChainItem
                                key={chain.name}
                                name={chain.name}
                                icon={chain.icon}
                                balance={chain.balance}
                                currency={chain.currency}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="px-4 py-2 w-full max-w-full">
                    {transactions.map((transaction: Transaction_Form, index: number) => (
                        <TransactionItem
                            key={index}
                            method={transaction.method}
                            date={transaction.date}
                            status={transaction.status}
                            amount={transaction.amount}
                            ens={transaction.ens}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}