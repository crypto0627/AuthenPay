// Type the response according to the expected interface
export interface TokenBalance {
    contractAddress: string;
    tokenBalance: string;
  }
  
export interface AlchemyResponse {
    jsonrpc: string;
    id: number;
    result: {
      address: string;
      tokenBalances: TokenBalance[];
    }
  }
  
 export interface ChainResult {
    chain: string;
    data?: AlchemyResponse;
    error?: string;
  }

export interface Transfer {
  blockNum: string;
  uniqueId: string;
  hash: string;
  from: string;
  to: string;
  value: number;
  erc721TokenId: string | null;
  erc1155Metadata: any | null;
  tokenId: string | null;
  asset: string;
  category: string;
  rawContract: {
    value: string;
    address: string;
    decimal: string;
  };
}

export interface AlchemyHistoryResponse {
  jsonrpc: string;
  id: number;
  result: {
    transfers: Transfer[];
  };
}

export interface HistoryResult {
  chain: string;
  data?: AlchemyHistoryResponse;
  error?: string;
}

export interface BlockResponse {
  jsonrpc: string;
  id: number;
  result: {
    hash: string;
    parentHash: string;
    sha3Uncles: string;
    miner: string;
    stateRoot: string;
    transactionsRoot: string;
    receiptsRoot: string;
    logsBloom: string;
    difficulty: string;
    number: string;
    gasLimit: string;
    gasUsed: string;
    timestamp: string;
    extraData: string;
    mixHash: string;
    nonce: string;
    baseFeePerGas: string;
    size: string;
    uncles: string[];
    transactions: any[];
  };
}
