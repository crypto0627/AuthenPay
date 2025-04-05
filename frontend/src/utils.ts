import { Address, Chain } from "viem";
import { baseSepolia, avalancheFuji, arbitrumSepolia, sepolia, polygonAmoy } from "viem/chains"

const validChains = ['base', 'eth', 'ava', 'polygon', 'arb'] as const;
export const chainDisplayNameMap: Record<string, string> = {
    base: 'Base',
    eth: 'Ethereum',
    ava: 'Avalanche',
    polygon: 'Polygon',
    arb: 'Arbitrum',
};

export const chainNameMap: Record<string, Chain> = {
    base: baseSepolia,
    ava: avalancheFuji,
    arb: arbitrumSepolia,
    eth: sepolia,
    polygon: polygonAmoy,
};

export const chainNameMapAPI: Record<string, string> = {
    "base-sepolia": "base",
    'avalanche-fuji': "ava",
    'arbitrum-sepolia': "arb",
    "sepolia": "eth",
    'polygon-amoy': "polygon",
  };

export const isValidChain = (value: string | null): boolean => {
    return validChains.includes(value as any);
};

export function formatAddress(address: string) {
    if (!address) {
      return ""; // If the address is undefined, return an empty string
    }
    if (address.length <= 12) {
      return address; // If the address is shorter than 12 characters, return it as is
    } else {
      const prefix = address.slice(0, 7); // Get the first six characters
      const suffix = address.slice(-8); // Get the last six characters
      return `${prefix}...${suffix}`; // Combine the first six, ..., and last six characters
    }
  }

  export function tapToCopy(value: any) {
    navigator.clipboard.writeText(value);
    console.log("Copied the text: " + value);
}