'use client'

import { useEffect, useState } from "react";
import { Address } from "viem";
import { useMe } from "@/providers/Me";

export function UserBalance({ address }: {
    address: Address
}) {
    const { balance } = useMe();
    const [totalBalance, setTotalBalance] = useState<number>(0);

    const now = new Date(); // current date
    const date = new Date(now.getTime() + 8 * 60 * 60 * 1000);

    const formatted = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div
            className="w-[330px] h-[150px] rounded-[20px] glass p-6 text-black flex items-center"
        >
            <div className="w-full flex flex-col gap-3">
                <div className="text-sm">{formatted}</div>
                <div className="w-full flex items-end justify-end text-4xl">
                    <div>
                        {`$${totalBalance < 1000000 ? totalBalance.toFixed(2) : totalBalance.toFixed(0)}`}
                    </div>
                    <div className="text-xl ml-[12px]">
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