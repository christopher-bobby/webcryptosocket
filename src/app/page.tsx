"use client"

import RealTimePrice from "@/components/RealTimePrice";
import { useEffect, useState } from "react";
import { CryptoAsset, CryptoPrices, Last24HrChgs } from "@/types";


type CryptoPriceKey = keyof CryptoPrices;

export default function Home() {

  const symbols = [
    'bitcoin',
    'ethereum',
    'binance-coin',
    'cardano',
    'solana',
    'xrp',
    'dogecoin',
    'polkadot',
    'uniswap',
    'stellar',
    'litecoin',
    'chainlink',
    'vechain',
    'tron'
  ];
  const symbolString = symbols.join(',');
  const [cryptoData, setCryptoData] = useState<CryptoPrices>({
    'bitcoin': 0,
    'ethereum': 0,
    'binance-coin': 0,
    'cardano': 0,
    'solana': 0,
    'xrp': 0,
    'dogecoin': 0,
    'polkadot': 0,
    'uniswap': 0,
    'stellar': 0,
    'litecoin': 0,
    'chainlink': 0,
    'vechain': 0
  });

const [last24HoursChanges, setLast24HoursChanges] = useState<Last24HrChgs>({
    'bitcoin': null,
    'ethereum': null,
    'binance-coin': null,
    'cardano': null,
    'solana': null,
    'xrp': null,
    'dogecoin': null,
    'polkadot': null,
    'uniswap': null,
    'stellar': null,
    'litecoin': null,
    'chainlink': null,
    'vechain': null,
})
 
  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch(`https://api.coincap.io/v2/assets?ids=${symbolString}`);
        const data = await response.json();
        const updatedPrices:CryptoPrices = { ...cryptoData };
        const lastChanges = {...last24HoursChanges};
        data.data.forEach((asset: CryptoAsset) => {
          if (cryptoData[asset.id as CryptoPriceKey] !== undefined) {
            updatedPrices[asset.id as CryptoPriceKey] = parseFloat(asset.priceUsd);
            lastChanges[asset.id as CryptoPriceKey] = Number(asset.changePercent24Hr).toFixed(2);   
          }
        });
        setCryptoData(updatedPrices);
        setLast24HoursChanges(lastChanges);
      } catch (error) {
        console.error('Error fetching crypto data', error);
      }
    };

    fetchCryptoData();

}, []); 

  return (
    <div className="md:w-1/2 md:m-auto p-4 md:p-0">
      <h1 className="font-bold text-lg mb-8 mt-6 md:mt-10">Live update Crypto Market</h1>
      <RealTimePrice initialData={cryptoData} symbolString={symbolString} last24HoursChanges={last24HoursChanges} />
    </div>
  );
}
