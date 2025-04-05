import { chainDisplayNameMap } from "@/utils";
import { Address } from "viem";

export function SenderBlock({ fromChain, amount }: {
    fromChain: 'base' | 'eth' | 'ava' | 'polygon' | 'arb';
    amount: number;
}) {

    return (
        <div
            className="w-[330px] py-4 px-4 text-black glass my-4 rounded-[24px] text-black"
        >
            <div className="flex justify-between text-2xl">
                <div>From</div>
                <div>{chainDisplayNameMap[fromChain]}</div>
            </div>
            <div className="flex justify-end items-end text-2xl my-2">
                <div
                    className="text-3xl"
                >
                    ${amount} <span className="text-lg">USDC</span>
                </div>
            </div>
        </div>
    )
}