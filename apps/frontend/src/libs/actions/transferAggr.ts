import { transferData } from '@/transferStrategy'
import { transferUSDC } from './transfer'
import { chainNameMap } from '@/utils'
import { Address, Hex } from 'viem'
import { TransferCCTP } from '../CCTPV2/CCTPV2'
import { Dispatch, SetStateAction } from 'react'
import { storeRecord } from '@/services/record'

export async function transferAggr(
  from: Address,
  transferDatas: transferData,
  credential: {
    id: string
    publicKey: `0x${string}`
  },
  setProcessCount: Dispatch<SetStateAction<number>>,
): Promise<`0x${string}`[]> {
  const txHashs: Hex[] = []

  const rr = await singleTransferIteration({
    tx: transferDatas[0],
    count: 0,
  })

  async function singleTransferIteration({
    tx,
    count,
  }: {
    tx: {
      fromChain: 'ava' | 'eth' | 'base' | 'arb' | 'polygon'
      toChain: 'ava' | 'eth' | 'base' | 'arb' | 'polygon'
      amount: number
      receiver: string
    }
    count: number
  }) {
    setProcessCount(count)
    if (tx.fromChain == 'ava') {
    } else {
      if (tx.fromChain == tx.toChain) {
        const txHash = await transferUSDC(
          tx.receiver as any,
          BigInt(Number(tx.amount.toFixed(6)) * 1000000),
          chainNameMap[tx.toChain],
          credential,
        )
        const rr = await storeRecord({
          FromAddress: from,
          ToAddress: tx.receiver,
          FromChain: tx.fromChain,
          ToChain: tx.toChain,
          TxHash: txHash,
          Amount: tx.amount.toString(10),
          CCTP: false,
          Status: 2,
        } as any)
        txHashs.push(txHash)
      } else {
        //CCTP
        const txHash = await TransferCCTP({
          to: tx.receiver as any,
          ToChain: tx.toChain as any,
          fromChain: tx.fromChain as any,
          amount: Number(tx.amount.toFixed(6)) * 1000000,
          credential: credential,
        })
        const rr = await storeRecord({
          FromAddress: from,
          ToAddress: tx.receiver,
          FromChain: tx.fromChain,
          ToChain: tx.toChain,
          TxHash: txHash,
          Amount: tx.amount.toString(10),
          CCTP: true,
          Status: 1,
        } as any)
        txHashs.push(txHash)
      }
    }

    if (count < transferDatas.length - 1) {
      const cc = await singleTransferIteration({
        tx: transferDatas[count + 1],
        count: count + 1,
      })
    } else {
      return
    }
  }

  return txHashs
}
