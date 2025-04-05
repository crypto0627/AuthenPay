import { Address, Chain, encodeFunctionData, erc20Abi, Hex } from "viem";
import { pimlicoUSDCPaymaster } from "../paymaster/paymaster";
import { USDCAddress } from "../paymaster/configs/config";

export async function transferUSDC(
    to: Address, 
    amount: BigInt, 
    chain: Chain, 
    credential: {
        id: string,
        publicKey: `0x${string}`
    }
): Promise<Hex> {

    console.log(to, amount)

    const usdc: Address = USDCAddress(chain)
    
    const transferCallData = encodeFunctionData({
        abi: erc20Abi,
        functionName: 'transfer',
        args: [to, (amount) as any],
    })

    const transactionHash = await pimlicoUSDCPaymaster({
        credential,
        chain,
        rawCalls: [{
            to: usdc,
            data: transferCallData
        }]
    })

    return transactionHash
}