import { Address, Chain } from "viem";

export function USDCAddress(chain: Chain): Address {
    console.log(chain.id)
    switch(chain.id) { 
        case 84532: { 
            //baseSepolia
            return "0x036CbD53842c5426634e7929541eC2318f3dCF7e"
        } 
        case 43113: { 
            //avalancheFuji
            return "0x5425890298aed601595a70ab815c96711a31bc65"
        }
        case 421614: {
            //arbitrumSepolia
            return "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d"
        }
        case 11155111: {
            //sepolia
            return "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"
        }
        case 80002: {
            //amoy
            return "0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582"
        }
        default: { 
           return "0x"
        } 
    }
}