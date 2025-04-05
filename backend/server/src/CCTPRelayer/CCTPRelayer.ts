import dotenv from 'dotenv';
import pool from '../db';
import { TransactionRecord } from '../types';
import { CCTPIDV2, MessageTransmitterV2 } from './config';
import { createWalletClient, encodeFunctionData, Hex, http } from 'viem';
import { chainNameMap } from './utils';
import { privateKeyToAccount } from 'viem/accounts';

dotenv.config();

const PRIVATE_KEY=process.env.PRIVATE_KEY
const account = privateKeyToAccount(`0x${PRIVATE_KEY}`)

// src/db.ts 中已經 export 了 pool
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
    console.log(txs)
    try {
      const attestationsPending = txs.map((tx) => {
        return new Promise(async (resolve, reject) => {
          const att = await retrieveAttestation(tx.TxHash as any, CCTPIDV2[tx.ToChain])
          if(att) {
            resolve({
              att: att,
              toChain: tx.ToChain
            })
          } else {
            resolve(null)
          }
        })
      })
  
      const attestations = await Promise.all(attestationsPending)
  
      const mintUSDCPending = attestations.map((attt: any) => {
        return new Promise(async (resolve, reject) => {
          if(attt) {
            const CCTPHash = await mintUSDC({
              attestation: attt.att,
              chain: attt.toChain
            })
            resolve(CCTPHash)
          } else {
            resolve(null)
          }
        })
      })
  
      const mintUSDCs = await Promise.all(mintUSDCPending)
      return mintUSDCs  
    } catch {
      return []
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
}

export async function retrieveAttestation(transactionHash: Hex, toChainDomain: number) {
  console.log('Retrieving attestation...');
  const url = `https://iris-api-sandbox.circle.com/v2/messages/${toChainDomain}?transactionHash=${transactionHash}`;

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
      }

      console.log('Waiting for attestation...');
    }

  } catch (error: any) {
    console.error('Error fetching attestation:', error?.message || error);
  }
}

