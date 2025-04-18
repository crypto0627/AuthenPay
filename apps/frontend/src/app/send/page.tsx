"use client"
import { Suspense } from 'react';
import { Receiver } from '@/components/transfer/receiver';
import { transferUSDC } from '@/libs/actions/transfer';
import { useMe } from '@/providers/Me';
import { chainNameMap } from '@/utils';
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import { Sender } from '@/components/transfer/sender';
import { transferData } from '@/transferStrategy';
import { transferAggr } from '@/libs/actions/transferAggr';
import { ChevronLeftIcon } from 'lucide-react';

export default function Send() {
    const router = useRouter();

    const { isMounted, me, address } = useMe()
    
    const [isConfirm, setIsConfirm] = useState<boolean>(false)
    const [selected, setSelected] = useState<'base' | 'eth' | 'ava' | 'polygon' | 'arb'>('base');
    const [receiverAddr, setReceiverAddr] = useState<string>("")
    const [amount, setAmount] = useState<number | "">("")
    const [transferDatas, setTransferDatas] = useState<transferData>([])
    const [processCount, setProcessCount] = useState<number>(-1)
    const [complete, setIsComplete] = useState<boolean>(false)

    return (
        <div className="relative py-6 flex flex-col items-center">
            <div
                className="absolute w-[48px] h-[48px] left-4 top-6 cursor-pointer"
                onClick={() => {
                    router.push('/home');
                }}
            >
                <ChevronLeftIcon className="w-8 h-8 text-gray-400" />
            </div>
            <div className="w-[330px] text-black text-2xl text-center">
                Transfer USDC
            </div>
            {
                !complete
                &&
                <Suspense>
                    <Receiver 
                        confirm={{ isConfirm: isConfirm, setIsConfirm: setIsConfirm }}
                        chain={{ selected: selected, setSelected: setSelected }}
                        receiver={{ receiverAddr: receiverAddr, setReceiverAddr: setReceiverAddr }}
                        amount={{ amount: amount, setAmount: setAmount }}
                    />
                </Suspense>
            }
            {
                isConfirm && !complete &&
                <div
                >
                    <Sender
                        amount={amount as any}
                        receiver={receiverAddr as any}
                        toChain={selected}
                        transferDatas={{ transferDatas: transferDatas, setTransferDatas: setTransferDatas }}
                        processCount={processCount}
                    />
                    <div className='w-full flex justify-end px-4'>
                        <div>
                            <button
                                className="px-6 py-3 text-black cursor-pointer button-35 w-[120px]"
                                onClick={async () => {
                                    const res = await transferAggr( address, transferDatas, { id: me?.id as any, publicKey: me?.publicKey as any }, setProcessCount)
                                    console.log(res)
                                    setIsComplete(true)
                                }}
                                disabled={transferDatas.length == 0 || processCount > 0}
                            >
                                Transfer
                            </button>
                        </div>
                    </div>
                </div>
            }
            {
                complete &&
                <div className='flex flex-col items-center'>
                    <div className='h-[400px] py-36 text-4xl text-black text-center'>
                        Transaction sent successfully!
                    </div>
                    <button
                        className="px-6 py-3 text-black cursor-pointer button-35 w-[120px]"
                        onClick={async () => {
                            router.push('/home');
                        }}
                    >
                        Back
                    </button>
                </div>
            }
        </div>
    )
}