import React from 'react';
import Image from "next/image";
import { ChainItemProps } from "@/types/transaction-type";

export default function ChainItem({ name, icon, balance, currency }: ChainItemProps) {
    return (
        <React.Fragment>
            <div className="p-3 flex items-center justify-start text-black gap-4">
                <div className="flex-shrink-0 gap-2">
                    <Image src={icon} alt={name.toLowerCase()} width={24} height={24} className="rounded-full bg-black" />
                </div>
                <div className="flex flex-col">
                    <p className="text-lg font-bold mt-1">{name}</p>
                </div>
            </div>
            <div className="p-3 flex items-center justify-center gap-2 text-black">
                <p className="text-2xl font-light">{balance}</p>
                <p className="font-medium">{currency}</p>
            </div>
        </React.Fragment>
    );
} 