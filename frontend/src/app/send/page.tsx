"use client"
import { Receiver } from '@/components/transfer/receiver';
import { transferUSDC } from '@/libs/actions/transfer';
import { pimlicoUSDCPaymaster } from '@/libs/paymaster/paymaster';
import { useMe } from '@/providers/Me';
import { chainNameMap } from '@/utils';
import { useRouter } from 'next/navigation'
import { useState } from 'react';

export default function Send() {
    const router = useRouter();

    const { isMounted, me } = useMe()
    
    const [isConfirm, setIsConfirm] = useState<boolean>(false)
    const [selected, setSelected] = useState<'base' | 'eth' | 'ava' | 'polygon' | 'arb'>('base');
    const [receiverAddr, setReceiverAddr] = useState<string>("")
    const [amount, setAmount] = useState<number | "">("")

    return (
        <div className="relate py-6 flex flex-col items-center">
            <div
                className="absolute bg-black w-[48px] h-[48px] left-4 top-4 cursor-pointer"
                onClick={() => {
                    router.push('/home');
                }}
            >

            </div>
            <div className="text-black text-2xl text-center">
                Transfer USDC
            </div>
            <Receiver 
                confirm={{ isConfirm: isConfirm, setIsConfirm: setIsConfirm }}
                chain={{ selected: selected, setSelected: setSelected }}
                receiver={{ receiverAddr: receiverAddr, setReceiverAddr: setReceiverAddr }}
                amount={{ amount: amount, setAmount: setAmount }}
            />
            {
                isConfirm &&
                <div>
                    <button
                        className="px-6 py-3 text-black cursor-pointer button-35 w-[120px]"
                        onClick={async () => {
                            transferUSDC(
                                receiverAddr as any,
                                amount as any,
                                chainNameMap[selected],
                                {
                                    id: me?.id as any,
                                    publicKey: me?.publicKey as any
                                }
                            )
                        }}
                    >
                        Transfer
                    </button>
                </div>
            }
        </div>
    )
}