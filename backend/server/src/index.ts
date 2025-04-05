import express, { Request, Response } from 'express';
import pool from './db';
import { TransactionRecord } from './types';
import cors from 'cors';
import { CCTPRelayer } from './CCTPRelayer/CCTPRelayer';

const app = express();
app.use(express.json());
app.use(cors()); // 👈 啟用 CORS 中介層

app.get('/', async (req: Request, res: Response) => {
  try {
    res.json({ message: "Damn" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

app.get('/address/record/:address', async (req, res) => {
    const { address } = req.params;

    try {
        const result = await pool.query(
            'SELECT * FROM transactions WHERE FromAddress = $1 OR ToAddress = $1 ORDER BY TxID DESC',
            [address]
        );
        res.json(result.rows);
    } catch (err) {
        console.error('❌ Error fetching transactions by address:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 建立一筆新交易紀錄
app.post('/address/record/add', async (req, res) => {
    const reqq = req.body as any
    const {
      FromAddress,
      ToAddress,
      Amount,
      CCTP,
      FromChain,
      ToChain,
      TxHash,
      CCTPTxHash,
      Status,
    } = reqq.record as Omit<TransactionRecord, 'TxID' | 'created_at' | 'updated_at'>;
    
    try {
      const result = await pool.query(
        `INSERT INTO transactions (
          FromAddress, ToAddress, Amount, CCTP, FromChain, ToChain,
          TxHash, CCTPTxHash, Status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *`,
        [
          FromAddress,
          ToAddress,
          Amount,
          CCTP,
          FromChain,
          ToChain,
          TxHash,
          CCTPTxHash,
          Status,
        ]
      );

      console.error(result)
  
      res.status(201).json(result.rows[0]); // 回傳剛建立的資料
    } catch (err) {
      console.error('❌ Error inserting transaction:', err);
      res.status(500).json({ error: 'Failed to insert transaction' });
    }
});

const port = 5001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
        // 啟動時就開始每 5 秒執行一次函式
    setInterval(() => {
        console.log('🔁 每 5 秒執行一次 syncTransactions()', new Date().toISOString());
        // 可以呼叫你真正要執行的 function
        CCTPRelayer()
    }, 15000);
});
