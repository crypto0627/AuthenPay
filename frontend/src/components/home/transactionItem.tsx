import React from 'react';
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";

interface TransactionItemProps {
    method: "To" | "From";
    date: string;
    status: "Pending" | "Success" | "Failed";
    amount: string;
    ens: string;
}

export default function TransactionItem({ method, date, status, amount, ens }: TransactionItemProps) {
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
                    {method === "To" ? <ArrowUpRight /> : <ArrowDownLeft />}
                </div>
                <div className="flex flex-col">
                    <div className="flex items-start gap-2">
                        <span className={`text-lg font-medium text-black w-12`}>
                            {method}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(status)}`}>
                            {status}
                        </span>
                    </div>
                    <p className="text-xs text-gray-500">{date}</p>
                </div>
            </div>
            <div className="flex flex-col items-end">
                <p className="font-bold text-2xl">{amount}</p>
                <span className="text-sm text-gray-500">{ens}</span>
            </div>
        </div>
    );
} 