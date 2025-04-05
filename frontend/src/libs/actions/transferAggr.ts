import { transferData } from "@/transferStrategy";
import { transferUSDC } from "./transfer";
import { chainNameMap } from "@/utils";
import { Hex } from "viem";

export async function transferAggr(transferDatas: transferData, credential: {
    id: string,
    publicKey: `0x${string}`
}): Promise<`0x${string}`[]> {
    const pending = transferDatas.map((tx) => {
        if(tx.fromChain == "ava") {

        } else {
            if(tx.fromChain == tx.toChain) {
                return new Promise(async (resolve, reject) => {
                    const txHash = await transferUSDC(
                        tx.receiver as any,
                        BigInt(tx.amount),
                        chainNameMap[tx.toChain],
                        credential
                    )
                    resolve(txHash)
                })
            } else {
                //CCTP

            }
        }
    })

    const res = await Promise.all(pending)
    return res as any
}