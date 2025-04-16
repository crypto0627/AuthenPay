import { useMe } from "@/providers/Me"
import { buildTransferPlan, transferData } from "@/transferStrategy"
import { Dispatch, SetStateAction, useEffect } from "react"
import { Address } from "viem"
import { SenderBlock } from "./senderBlock"

export function Sender({ transferDatas, amount, receiver, toChain, processCount }: {
    amount: number,
    receiver: Address,
    toChain: 'base'| 'eth' | 'ava' | 'polygon' | 'arb'
    transferDatas: {
        transferDatas: transferData,
        setTransferDatas: Dispatch<SetStateAction<transferData>>
    },
    processCount: number
}) {

    const { balance } = useMe()

    useEffect(() => {
        const sts = buildTransferPlan(balance, { receiver: receiver, amount: amount, toChain: toChain })
        console.log(sts)
        transferDatas.setTransferDatas(sts)
    }, [])

    return(
        <div
            className="w-full px-4"
        >
            <div className="w-full h-[2px] bg-gray-200"/>
            {

                transferDatas.transferDatas.map((ts, index) => {
                    return (
                        <SenderBlock
                            key={`senderBlock-${index}`}
                            fromChain={ts.fromChain}
                            amount={ts.amount}
                            status={index < processCount ? 2 : index == processCount ? 1 : 0}
                        />
                    )
                })
            }
            {
                transferDatas.transferDatas.length == 0 &&
                <div
                    className="p-4 text-black"
                >
                    Insufficient balance across chains for transfer. Please try to edit transaction.
                </div>
            }
        </div>
    )
}