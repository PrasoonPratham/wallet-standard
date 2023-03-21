import type { SolanaChain } from '@solana/wallet-standard-chains';
import {
    SOLANA_DEVNET_CHAIN,
    SOLANA_LOCALNET_CHAIN,
    SOLANA_MAINNET_CHAIN,
    SOLANA_TESTNET_CHAIN,
    SOLANA_CUSTOM_CHAIN,
} from '@solana/wallet-standard-chains';

export const MAINNET_ENDPOINT = 'https://api.mainnet-beta.solana.com';
export const DEVNET_ENDPOINT = 'https://api.devnet.solana.com';
export const TESTNET_ENDPOINT = 'https://api.testnet.solana.com';
export const LOCALNET_ENDPOINT = 'http://localhost:8899';
export const CUSTOM_ENDPOINT = 'https://custom-rpc-url.com';

// A dummy list for white-listed custom RPCs
const whiteListedRPCs = ['https://custom-rpc-url.com', 'https://custom-rpc-url2.com'];

// Function that checks if the custom RPC is white-listed from the Solana team
export function checkRPC(endpoint: string): boolean {
    if (whiteListedRPCs.includes(endpoint)) {
        return true;
    } else {
        console.log('Custom RPC is not white-listed');
        return false;
    }
}

export function getChainForEndpoint(endpoint: string): SolanaChain {
    if (endpoint.includes(MAINNET_ENDPOINT)) return SOLANA_MAINNET_CHAIN;
    if (/\bdevnet\b/i.test(endpoint)) return SOLANA_DEVNET_CHAIN;
    if (/\btestnet\b/i.test(endpoint)) return SOLANA_TESTNET_CHAIN;
    if (/\blocalhost\b/i.test(endpoint) || /\b127\.0\.0\.1\b/.test(endpoint)) return SOLANA_LOCALNET_CHAIN;
    if (/^https?:\/\/custom-rpc-url\.com(:\d+)?$/i.test(endpoint) && checkRPC(endpoint)) return SOLANA_CUSTOM_CHAIN; // We're checking if a custom RPC with Regex for some dummy data and if it's white-listed from the dummy list above.
    return SOLANA_MAINNET_CHAIN;
}

export function getEndpointForChain(chain: SolanaChain, endpoint?: string): string {
    if (endpoint) return endpoint;
    if (chain === SOLANA_MAINNET_CHAIN) return MAINNET_ENDPOINT;
    if (chain === SOLANA_DEVNET_CHAIN) return DEVNET_ENDPOINT;
    if (chain === SOLANA_TESTNET_CHAIN) return TESTNET_ENDPOINT;
    if (chain === SOLANA_LOCALNET_CHAIN) return LOCALNET_ENDPOINT;
    if (chain === SOLANA_CUSTOM_CHAIN) return CUSTOM_ENDPOINT;
    return MAINNET_ENDPOINT;
}
