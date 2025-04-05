import { Address, Chain } from "viem";

export function USDCAddress(chain: Chain): Address {
    switch(chain.id) { 
        case 84532: { 
            //baseSepolia
            return process.env.NEXP_PUBLIC_USDC_BASE as any
        } 
        case 43113: { 
            //avalancheFuji
            return process.env.NEXP_PUBLIC_USDC_AVA as any
        }
        case 421614: {
            //arbitrumSepolia
            return process.env.NEXP_PUBLIC_USDC_ARB as any
        }
        case 11155111: {
            //sepolia
            return process.env.NEXP_PUBLIC_USDC_SEPOLIA as any
        }
        case 80002: {
            //amoy
            return process.env.NEXP_PUBLIC_USDC_AMOY as any
        }
        default: { 
           return "0x"
        } 
    }
}