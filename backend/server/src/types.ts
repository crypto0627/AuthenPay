export type TransactionRecord = {
    TxID: number;
    FromAddress: string;
    ToAddress: string;
    Amount: string;
    CCTP: boolean;
    FromChain: string;
    ToChain: string;
    TxHash: string;
    CCTPTxHash: string | null;
    Status: number;
    created_at: string;   // 可以改成 Date，如果你會用 `new Date(...)`
    updated_at: string;   // 同上
};
