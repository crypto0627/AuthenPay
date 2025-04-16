import {
  baseSepolia,
  avalancheFuji,
  arbitrumSepolia,
  sepolia,
  polygonAmoy,
  Chain,
} from 'viem/chains'

export const chainNameMap: Record<string, Chain> = {
  base: baseSepolia,
  ava: avalancheFuji,
  arb: arbitrumSepolia,
  eth: sepolia,
  polygon: polygonAmoy,
}
