import dotenv from 'dotenv';
import pool from '../db';
import { TransactionRecord } from '../types';
import { CCTPIDV2, MessageTransmitterV2 } from './config';
import { createWalletClient, encodeFunctionData, Hex, http } from 'viem';
import { chainNameMap } from './utils';
import { privateKeyToAccount } from 'viem/accounts';
import { updateTransactionStatus } from '../db/CCTPRelayUpdate';

dotenv.config();

const PRIVATE_KEY=process.env.PRIVATE_KEY
const account = privateKeyToAccount(`0x${PRIVATE_KEY}`)

export async function getActiveCCTPTransactions(): Promise<TransactionRecord[]> {
  const query = `
    SELECT * FROM transactions
    WHERE status = 1 AND cctp = true
    ORDER BY TxID DESC
  `;

  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (err) {
    console.error('❌ Failed to fetch active CCTP transactions:', err);
    throw err;
  }
}


export async function CCTPRelayer() {
  const txs = await getActiveCCTPTransactions()
  var c = 0

  async function relayer(txs: TransactionRecord[], count: number) {
    const attestation = await retrieveAttestation((txs[count] as any).txhash, CCTPIDV2[(txs[count] as any).fromchain])
    if(attestation) {
      const mintHash = await mintUSDC({ attestation: attestation, chain: (txs[count] as any).tochain as any })
      if(mintHash) {
        //store mintHash as CCTPHash
        const isUpdate = await updateTransactionStatus((txs[count] as any).txhash, 2, mintHash)
      }
    }

    if(count < txs.length - 1) {
      const next = await relayer(txs, count + 1)
    }
    return
  }

  try {
    const iteration = await relayer(txs, c)
  } catch(e) {
    console.log(e)
  }
}

async function mintUSDC({ attestation, chain }: {
  attestation: {
    message: string,
    attestation: string
  }
  chain: 'base'| 'eth' | 'ava'
}) {
  const client = createWalletClient({
    chain: chainNameMap[chain],
    transport: http(),
    account,
  })

  try {
    const mintTx = await client.sendTransaction({
      to: MessageTransmitterV2[chain],
      data: encodeFunctionData({
        abi: [
          {
            type: 'function',
            name: 'receiveMessage',
            stateMutability: 'nonpayable',
            inputs: [
              { name: 'message', type: 'bytes' },
              { name: 'attestation', type: 'bytes' },
            ],
            outputs: [],
          },
        ],
        functionName: 'receiveMessage',
        args: [attestation.message as any, attestation.attestation as any],
      }),
    })
    console.log(`Mint Tx: ${mintTx}`)
    return mintTx
  } catch(e) {
    console.error('❌ Failed to mint USDC:', e);
  }
}

export async function retrieveAttestation(transactionHash: Hex, fromChainDomain: number) {
  const url = `https://iris-api-sandbox.circle.com/v2/messages/${fromChainDomain}?transactionHash=${transactionHash}`;

  try {
    const response = await fetch(url);

    if (response.status === 404) {
      console.log('Waiting for attestation...');
    } else {
      const data = await response.json();

      if (data?.messages?.[0]?.status === 'complete') {
        console.log('Attestation retrieved successfully!');
        console.log(data.messages[0])
        return data.messages[0];
      } else {
        console.error('Error fetching attestation', "| Tx: ", transactionHash); 
      }
    }

  } catch (error: any) {
    console.error('Error fetching attestation:', error?.message || error, "| Tx: ", transactionHash);
  }
}

