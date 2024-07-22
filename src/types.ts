export interface CryptoPrices {
    bitcoin: number | null;
    ethereum: number | null;
    "binance-coin": number | null;
    cardano: number | null;
    solana: number | null;
    xrp: number | null;
    dogecoin: number | null;
    polkadot: number | null;
    uniswap: number | null;
    stellar: number | null;
    litecoin: number | null;
    chainlink: number | null;
    vechain: number | null;
}

export interface Last24HrChgs {
    bitcoin: string | null;
    ethereum: string | null;
    "binance-coin": string | null;
    cardano: string | null;
    solana: string | null;
    xrp: string | null;
    dogecoin: string | null;
    polkadot: string | null;
    uniswap: string | null;
    stellar: string | null;
    litecoin: string | null;
    chainlink: string | null;
    vechain: string | null;
}

export interface CryptoAsset {
    changePercent24Hr: string,
    explorer: string,
    id: string,
    marketCapUsd: string,
    maxSupply: string | null,
    name: string,
    priceUsd: string,
    rank: string,
    supply: string,
    symbol: string,
    volumeUsd24Hr: string,
    vwap24Hr: string
}