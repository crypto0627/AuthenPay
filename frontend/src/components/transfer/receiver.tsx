'use client'
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import { formatAddress, isValidChain } from "@/utils";
import { ReceiverInfo } from "./receiverInfo";

export function Receiver({ confirm, chain, receiver, amount }: {
    confirm: {
        isConfirm: boolean,
        setIsConfirm: Dispatch<SetStateAction<boolean>>
    },
    chain: {
        selected: 'base' | 'eth' | 'ava' | 'polygon' | 'arb',
        setSelected: Dispatch<SetStateAction<"base" | "eth" | "ava" | "polygon" | "arb">>
    },
    receiver: {
        receiverAddr: string,
        setReceiverAddr: Dispatch<SetStateAction<string>>
    },
    amount: {
        amount: number | ""
        setAmount: Dispatch<SetStateAction<number | "">>
    }
}) {
    const searchParams = useSearchParams();
    const _receiver = searchParams.get('receiver');
    const _chain = searchParams.get('chain');
    const _amount = searchParams.get('amount');

    useEffect(() => {
        if(_receiver) {
            receiver.setReceiverAddr(_receiver)
        }
        if(_chain && isValidChain(_chain)) {
            chain.setSelected(_chain as any)
        }
        if(_amount) {
            try {
                const a = Number(_amount)
                if(a > 0) amount.setAmount(a)
            } catch {
            }
        }
    }, [])

    return(
        <div
            className="w-[330px] py-4 px-4 text-black glass my-4 rounded-[24px] text-black"
        >
            <div className="flex justify-between text-2xl">
                <div>To</div>
                {confirm.isConfirm && <div>{formatAddress(receiver.receiverAddr)}</div>}
            </div>
            {
                confirm.isConfirm ?
                <ReceiverInfo 
                    amount={amount.amount as any}
                    chain={chain.selected}
                    cancel={() => {confirm.setIsConfirm(false) }}
                />
                :
                <div className="w-full flex flex-col gap-4 my-4 items-center">
                    <div
                    className="p-[2px] rounded-[12px] border border-white w-[300px]"
                    style={{
                        background: "linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%)"
                    }}
                    >
                        <input
                            className="px-4 py-2 text-black bg-gray-200/20 rounded-[10px] w-full"
                            value={receiver.receiverAddr}
                            onChange={(e) => {
                                receiver.setReceiverAddr(e.target.value)
                            }}
                            placeholder="Receiver address"
                        />
                    </div>
                    <div
                        className="p-[2px] rounded-[12px] border border-white w-[300px]"
                        style={{
                            background: "linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%)"
                        }}
                    >
                        <select value={chain.selected} onChange={(e) => chain.setSelected(e.target.value as any)} className="px-4 py-2 text-black bg-gray-200/20 rounded-[10px] w-full">
                            <option value="base">Base</option>
                            <option value="eth">Ethereum</option>
                            <option value="ava">Avalanche</option>
                            <option value="polygon">Polygon</option>
                            <option value="arb">Arbitrum</option>
                        </select>
                    </div>
                    <div
                    className="p-[2px] rounded-[12px] border border-white w-[300px]"
                    style={{
                        background: "linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%)"
                    }}
                    >
                        <input
                            className="px-4 py-2 text-black bg-gray-200/20 rounded-[10px] w-full"
                            value={amount.amount}
                            type="number"
                            onChange={(e) => {
                                if(Number(e.target.value) > 0) {
                                    amount.setAmount(Number(e.target.value))
                                } else {
                                    amount.setAmount("")
                                }
                            }}
                            placeholder="Amount"
                        />
                    </div>
                    <button
                        className="px-6 py-3 text-black cursor-pointer button-35 w-[120px]"
                        onClick={() => {
                            if(typeof(amount.amount) == "number") {
                                confirm.setIsConfirm(true)
                            }
                        }}
                    >
                        Comfirm
                    </button>
                </div>
            }
        </div>
    )
}