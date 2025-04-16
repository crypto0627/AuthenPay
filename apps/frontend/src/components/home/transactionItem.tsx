import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownLeft, ArrowBigRight, Link as GLink } from "lucide-react";
import { chainDisplayNameMap, chainExploreMap, cn, formatAddress, formatTimestamp } from '@/utils';
import { TransactionRecord } from '@/types/record';
import Link from 'next/link';

interface TransactionItemProps {
    method: boolean
    date: string;
    status: number;
    amount: string;
    ens: string;
    address: string
    tx: TransactionRecord
}

const statusList: string[] = ["", "Pending", "Success"]

export default function TransactionItem({ method, date, status, amount, ens, address, tx }: TransactionItemProps) {

    const [isExpand, setIsExpand] = useState<boolean>(false)

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
        <div 
            className={cn(
                "mb-3 px-5 py-5 rounded-[24px] text-black w-[330px] transition-all delay-150 duration-300 ease-in-out glass6",
            )}
            onClick={() => {
                setIsExpand(!isExpand)
            }}
        >
            <div
            className="flex items-center text-black w-full "
            >
                <div className="flex-shrink-0 pr-3">
                    {method ? <ArrowUpRight /> : <ArrowDownLeft />}
                </div>
                <div className='w-full'>
                    <div className='flex justify-between w-full cursor-pointer'> 
                        <div className="flex items-center">
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
                            <p className="font-bold text-2xl">{(Number(amount).toFixed(2))}<span className='ml-2 text-lg'>USDC</span></p>
                            <span className="text-sm text-gray-500">{formatAddress(address)}</span>
                        </div>
                    </div>
                    {
                        isExpand && 
                        <div className='pt-2'>
                            <div className='py-1 flex justify-between items-center text-xl w-full'>
                                <div className='font-light'>
                                    {chainDisplayNameMap[(tx as any).fromchain]}
                                </div>
                                <ArrowBigRight />
                                <div>
                                    {chainDisplayNameMap[(tx as any).tochain]}
                                </div>
                            </div>
                            <div className='flex justify-between w-full text-lg'>
                                <div>Hash:</div>
                                <Link 
                                    className='flex items-center gap-1'
                                    href={`${chainExploreMap[(tx as any).fromchain]}/${(tx as any).txhash}`}
                                    target="_blank"
                                >
                                    <GLink size={18} className='text-gray-400'/>
                                    <div>{formatAddress((tx as any).txhash)}</div>
                                </Link>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
} 