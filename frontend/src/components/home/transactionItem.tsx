import React from 'react';
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { formatAddress, formatTimestamp } from '@/utils';

interface TransactionItemProps {
    method: boolean
    date: string;
    status: number;
    amount: string;
    ens: string;
    address: string
}

const statusList: string[] = ["", "Pending", "Success"]

export default function TransactionItem({ method, date, status, amount, ens, address }: TransactionItemProps) {
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
        <div className="mb-3 p-3 bg-gray-50 rounded-lg flex items-center justify-between text-black w-full">
            <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                    {method ? <ArrowUpRight /> : <ArrowDownLeft />}
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 h-8">
                        <span className={`text-lg font-medium text-black`}>
                            {method ? "To" : "From"}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(statusList[status])}`}>
                            {statusList[status]}
                        </span>
                    </div>
                    <p className="text-xs text-gray-500">{formatTimestamp(date)}</p>
                </div>
            </div>
            <div className="flex flex-col items-end gap-2">
                <p className="font-bold text-2xl">{amount}<span className='ml-2 text-lg'>USDC</span></p>
                <span className="text-sm text-gray-500">{formatAddress(address)}</span>
            </div>
        </div>
    );
} 