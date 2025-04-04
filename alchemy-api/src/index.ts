import { Hono } from 'hono'
import { AlchemyHistoryResponse, AlchemyResponse, BlockResponse, ChainResult, HistoryResult, Transfer } from './types'

const app = new Hono()

// Common constants
const DEFAULT_ADDRESS = "0x5C16e64Eac8bf0e8CE0d6f6eAb0b73918cfB0a96";
const URLS = {
  'base-sepolia': 'https://base-sepolia.g.alchemy.com/v2/hR5uamq-K43YZYAJldc7lpxZ2MOv0Qbk',
  'sepolia': 'https://eth-sepolia.g.alchemy.com/v2/hR5uamq-K43YZYAJldc7lpxZ2MOv0Qbk',
  'avalanche-fuji': 'https://avax-fuji.g.alchemy.com/v2/hR5uamq-K43YZYAJldc7lpxZ2MOv0Qbk',
  'arbitrum-sepolia': 'https://arb-sepolia.g.alchemy.com/v2/hR5uamq-K43YZYAJldc7lpxZ2MOv0Qbk',
  'polygon-amoy': 'https://polygon-amoy.g.alchemy.com/v2/hR5uamq-K43YZYAJldc7lpxZ2MOv0Qbk'
};

const HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

// Helper function to add delay between requests
const addDelay = async (chainName: string) => {
  if (chainName !== 'base-sepolia') {
    await new Promise(resolve => setTimeout(resolve, 1200));
  }
};

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post('/balance', async (c) => {
  const { address } = await c.req.json()
  const targetAddress = address || DEFAULT_ADDRESS;
  
  // Function to fetch balance from a specific chain
  const fetchChainBalance = async (chainName: string, url: string): Promise<ChainResult> => {
    const body = JSON.stringify({
      id: 1,
      jsonrpc: "2.0",
      method: "alchemy_getTokenBalances",
      params: [
        targetAddress,
        "erc20"
      ]
    });

    try {
      await addDelay(chainName);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: HEADERS,
        body: body
      });
      
      const data: AlchemyResponse = await response.json();
      return { chain: chainName, data };
    } catch (error) {
      console.error(`Error fetching from ${chainName}:`, error);
      return { chain: chainName, error: 'Failed to fetch token balances' };
    }
  };

  try {
    // Fetch balances from all chains
    const chainPromises = Object.entries(URLS).map(
      ([chainName, url]) => fetchChainBalance(chainName, url)
    );
    
    const results = await Promise.all(chainPromises);
    
    // Format the results according to the required structure
    const formattedResults = results.map(result => {
      if (result.error) {
        return {
          chain: result.chain,
          tokenBalances: []
        };
      }
      
      return {
        chain: result.chain,
        tokenBalances: result.data?.result?.tokenBalances || []
      };
    });
    
    return c.json(formattedResults);
  } catch (error) {
    console.error('Error:', error);
    return c.json({ error: 'Failed to fetch token balances' }, 500);
  }
})

app.post('/history', async (c) => {
  try {
    const { address } = await c.req.json();
    const targetAddress = address || DEFAULT_ADDRESS;
    
    // Function to fetch history from a specific chain
    const fetchChainHistory = async (chainName: string, url: string): Promise<HistoryResult> => {
      const body = JSON.stringify({
        id: 1,
        jsonrpc: "2.0",
        method: "alchemy_getAssetTransfers",
        params: [
          {
            fromBlock: "0x0",
            toBlock: "latest",
            toAddress: targetAddress,
            contractAddresses: [
              "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
              "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
              "0x5425890298aed601595a70ab815c96711a31bc65"
            ],
            category: [
              "erc20"
            ],
            order: "asc",
            withMetadata: false,
            excludeZeroValue: true,
            maxCount: "0x3e8"
          }
        ]
      });

      try {
        await addDelay(chainName);
        
        const response = await fetch(url, {
          method: 'POST',
          headers: HEADERS,
          body: body
        });
        
        const data: AlchemyHistoryResponse = await response.json();
        return { chain: chainName, data };
      } catch (error) {
        console.error(`Error fetching from ${chainName}:`, error);
        return { chain: chainName, error: 'Failed to fetch transfer history' };
      }
    };

    // Function to fetch block data
    const fetchBlockData = async (chainName: string, blockNum: string) => {
      try {
        const blockResponse = await fetch(URLS[chainName as keyof typeof URLS], {
          method: 'POST',
          headers: HEADERS,
          body: JSON.stringify({
            jsonrpc: "2.0",
            method: "eth_getBlockByNumber",
            params: [blockNum, true],
            id: 0
          })
        });
        
        const blockData: BlockResponse = await blockResponse.json();
        const hexTimestamp = blockData.result?.timestamp || null;
        return hexTimestamp 
          ? new Date(parseInt(hexTimestamp, 16) * 1000).toISOString() 
          : null;
      } catch (error) {
        console.error(`Error fetching block data for block ${blockNum}:`, error);
        return null;
      }
    };

    try {
      // Fetch history from all chains
      const chainPromises = Object.entries(URLS).map(
        ([chainName, url]) => fetchChainHistory(chainName, url)
      );
      
      const results: HistoryResult[] = await Promise.all(chainPromises);
      
      // Format the results according to the required structure
      const formattedResults = results.map(async (result) => {
        if (result.error) {
          return {
            chain: result.chain,
            transfers: []
          };
        }
        
        // Extract transfers from the result
        const transfers = result.data?.result?.transfers || [];

        // Map transfers to the required format
        const formattedTransfers = await Promise.all(transfers.map(async (transfer: Transfer) => {
          const timestamp = await fetchBlockData(result.chain, transfer.blockNum);
          
          return {
            blockNum: transfer.blockNum,
            hash: transfer.hash,
            from: transfer.from,
            to: transfer.to,
            value: transfer.value,
            asset: transfer.asset,
            timestamp: timestamp
          };
        }));
        
        return {
          chain: result.chain,
          transfers: formattedTransfers
        };
      });
      
      const resolvedResults = await Promise.all(formattedResults);
      return c.json(resolvedResults);
    } catch (error) {
      console.error('Error processing chain data:', error);
      return c.json({ error: 'Failed to process transfer history' }, 500);
    }
  } catch (error) {
    console.error('Error in /history endpoint:', error);
    return c.json({ error: 'Failed to fetch transfer history', message: (error as Error).message }, 500);
  }
})

export default app
