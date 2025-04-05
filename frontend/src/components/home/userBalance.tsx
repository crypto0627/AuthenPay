'use client'

import { useEffect, useState, useDeferredValue } from "react";
import { Address } from "viem";

export function UserBalance({ address }: {
    address: Address
}) {

    const now = new Date(); // current date
    const date = new Date(now.getTime() + 8 * 60 * 60 * 1000);

    const formatted = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const [balance, setBalance] = useState<number>(0)

    const fetchBalanceData = async (userAddress: string) => {
        try {
            const response = await fetch('https://alchemy-api.jake0627a1.workers.dev/balance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    address: userAddress
                }),
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch balance data');
            }
            
            const data = await response.json();
            let totalBalance = 0;
            data.forEach((chainData: any) => {
                totalBalance += chainData.balance;
            });
            
            return totalBalance;
        } catch (error) {
            console.error('Error fetching balance:', error);
            return 0;
        }
    }

    useEffect(() => {
        (async () => {
            const balanceData = await fetchBalanceData(address);
            setBalance(balanceData);
        })();
    }, [address]);

    return (
        <div
            className="w-[330px] h-[150px] rounded-[20px] glass p-6 text-black flex items-center"
        >
            <div className="w-full flex flex-col gap-3">
                <div className="text-sm">{formatted}</div>
                <div className="w-full flex items-end justify-end text-4xl">
                <div>
                    {`$${balance < 1000000 ? balance.toFixed(2) : balance.toFixed(0)}`}
                </div>
                <div
                    className="text-xl ml-[12px]"
                >
                    USDC
                </div>
                </div>
                <div className="text-sm">
                    Total balance
                </div>
            </div>
        </div>
    )
}