'use client'

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  sepolia,
  avalancheFuji,
  polygonAmoy,
  arbitrumSepolia,
  baseSepolia,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

// Make sure your projectId is valid and properly configured
// This should be from your WalletConnect Cloud dashboard
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'd958b2135ca20bf2285350e9336b22fc';

const config = getDefaultConfig({
    appName: 'AuthenPay',
    projectId: projectId,
    chains: [baseSepolia, sepolia, avalancheFuji, arbitrumSepolia, polygonAmoy],
    ssr: true,
});

const queryClient = new QueryClient();

export default function Web3Provider({ children }: { children: React.ReactNode }) {
    return (
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            {children}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    );
  };