import { chainDisplayNameMap } from "@/utils"

export function ReceiverInfo({ amount, chain, cancel }: {
    amount: number,
    chain: string,
    cancel: () => void
}) {

    return (
        <div>
            <div className="flex justify-between items-end text-2xl my-2">
                <div
                    className=""
                >
                    {chainDisplayNameMap[chain]}
                </div>
                <div
                    className="text-3xl"
                >
                    ${amount} <span className="text-lg">USDC</span>
                </div>
            </div>
            <div className="w-full flex flex-col items-end">
                <button
                    className="px-6 py-2 text-black cursor-pointer button-35 w-[80px]"
                    onClick={() => {
                        cancel()
                    }}
                >
                    Edit
                </button>
            </div>
        </div>
    )
}