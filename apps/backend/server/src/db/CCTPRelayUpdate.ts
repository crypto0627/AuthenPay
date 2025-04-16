import pool from '../db';

export async function updateTransactionStatus(txHash: string, newStatus: number, cctpTxHash: string): Promise<void> {
  const query = `
    UPDATE transactions
    SET Status = $1,
        CCTPTxHash = $2,
        updated_at = CURRENT_TIMESTAMP
    WHERE TxHash = $3
  `;

  try {
    await pool.query(query, [newStatus, cctpTxHash, txHash]);
    console.log(`✅ Transaction ${txHash} updated.`);
  } catch (err) {
    console.error('❌ Failed to update transaction:', err);
    throw err;
  }
}
