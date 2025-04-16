import { Address, Chain } from 'viem'
import {
  baseSepolia,
  avalancheFuji,
  arbitrumSepolia,
  sepolia,
  polygonAmoy,
} from 'viem/chains'

const validChains = ['base', 'eth', 'ava', 'polygon', 'arb'] as const
export const chainDisplayNameMap: Record<string, string> = {
  base: 'Base',
  eth: 'Ethereum',
  ava: 'Avalanche',
  polygon: 'Polygon',
  arb: 'Arbitrum',
}

export const chainNameMap: Record<string, Chain> = {
  base: baseSepolia,
  ava: avalancheFuji,
  arb: arbitrumSepolia,
  eth: sepolia,
  polygon: polygonAmoy,
}

export const chainNameMapAPI: Record<string, string> = {
  'base-sepolia': 'base',
  'avalanche-fuji': 'ava',
  'arbitrum-sepolia': 'arb',
  sepolia: 'eth',
  'polygon-amoy': 'polygon',
}

export const isValidChain = (value: string | null): boolean => {
  return validChains.includes(value as any)
}

export function formatAddress(address: string) {
  if (!address) {
    return '' // If the address is undefined, return an empty string
  }
  if (address.length <= 12) {
    return address // If the address is shorter than 12 characters, return it as is
  } else {
    const prefix = address.slice(0, 7) // Get the first six characters
    const suffix = address.slice(-8) // Get the last six characters
    return `${prefix}...${suffix}` // Combine the first six, ..., and last six characters
  }
}

export function tapToCopy(value: any) {
  navigator.clipboard.writeText(value)
  console.log('Copied the text: ' + value)
}

function addOneUpToN(arr: number[], n: number): number[] {
  for (let i = 0; i <= n; i++) {
    // If it's already 3, keep it at 3;
    // otherwise increment by 1.
    if (arr[i] < 3) {
      arr[i] += 1
    }
  }

  return arr
}

export function formatTimestamp(isoString: string): string {
  const date = new Date(isoString)

  const now = new Date()
  const isToday =
    date.getUTCFullYear() === now.getUTCFullYear() &&
    date.getUTCMonth() === now.getUTCMonth() &&
    date.getUTCDate() === now.getUTCDate()

  const hours = date.getUTCHours().toString().padStart(2, '0')
  const minutes = date.getUTCMinutes().toString().padStart(2, '0')

  const time = `${hours}:${minutes}`

  if (isToday) {
    return `Today, ${time}`
  }

  const monthShort = date.toLocaleString('en-US', {
    month: 'short',
    timeZone: 'UTC',
  })
  const day = date.getUTCDate()

  return `${monthShort} ${day}, ${time}`
}
