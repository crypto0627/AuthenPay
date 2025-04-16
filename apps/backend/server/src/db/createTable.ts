// src/createTable.ts
import pool from '../db';

export async function createTransactionsTable(): Promise<void> {
  const query = `
    CREATE TABLE IF NOT EXISTS transactions (
      TxID SERIAL PRIMARY KEY,
      FromAddress TEXT NOT NULL,
      ToAddress TEXT NOT NULL,
      Amount TEXT NOT NULL,
      CCTP BOOLEAN NOT NULL,
      FromChain TEXT NOT NULL,
      ToChain TEXT NOT NULL,
      TxHash TEXT NOT NULL,
      CCTPTxHash TEXT,
      Status INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  await pool.query(query);
  console.log('✅ transactions table ensured.');
}