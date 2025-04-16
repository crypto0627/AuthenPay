import { Address, Chain, encodeFunctionData } from "viem"
import { USDCAddress } from "../paymaster/configs/config"
import { chainNameMap } from "@/utils"
import { CCTPIDV2, TokenMessengerV2 } from "./config"
import { pimlicoUSDCPaymaster } from "../paymaster/paymaster"

export async function TransferCCTP({ fromChain, ToChain, amount, to, credential }: {
    fromChain: 'base' | 'eth' | 'ava',
    ToChain: 'base' | 'eth' | 'ava',
    amount: number,
    to: Address,
    credential: {
        id: string,
        publicKey: `0x${string}`
    }
}) {

    const usdc: Address = USDCAddress(chainNameMap[fromChain])
    //1. Approval
    const approveTxRaw = {
        to: usdc,
        data: encodeFunctionData({
          abi: [
            {
              type: 'function',
              name: 'approve',
              stateMutability: 'nonpayable',
              inputs: [
                { name: 'spender', type: 'address' },
                { name: 'amount', type: 'uint256' },
              ],
              outputs: [{ name: '', type: 'bool' }],
            },
          ],
          functionName: 'approve',
          args: [TokenMessengerV2[fromChain], 10_000_000_000n], // Set max allowance in 10^6 subunits (10,000 USDC; change as needed)
        }),
    }

    const maxFee = 5000n

    //2. BurnMint
    const burnTxRaw = {
        to: TokenMessengerV2[fromChain],
        data: encodeFunctionData({
        abi: [
            {
            type: 'function',
            name: 'depositForBurn',
            stateMutability: 'nonpayable',
            inputs: [
                { name: 'amount', type: 'uint256' },
                { name: 'destinationDomain', type: 'uint32' },
                { name: 'mintRecipient', type: 'bytes32' },
                { name: 'burnToken', type: 'address' },
                { name: 'destinationCaller', type: 'bytes32' },
                { name: 'maxFee', type: 'uint256' },
                { name: 'minFinalityThreshold', type: 'uint32' },
            ],
            outputs: [],
            },
        ],
        functionName: 'depositForBurn',
        args: [
            BigInt(amount),
            CCTPIDV2[ToChain],
            `0x000000000000000000000000${to.slice(2)}`,
            usdc,
            '0x0000000000000000000000000000000000000000000000000000000000000000',
            maxFee,
            1000, // minFinalityThreshold (1000 or less for Fast Transfer)
        ],
    }),
    }

    const res = await pimlicoUSDCPaymaster(
        {
            credential: credential,
            chain: chainNameMap[fromChain],
            rawCalls: [
                approveTxRaw, burnTxRaw
            ]
        }
    )
    console.log(res)
    return res
}