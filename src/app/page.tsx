"use client"

import Image from "next/image";
import Link from 'next/link';
import RealTimePrice from "@/components/RealTimePrice";
import OrderBookComponent from "@/components/OrderBook";
import { useEffect, useState } from "react";

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
  const [cryptoData, setCryptoData] = useState<any>({
    bitcoin: null,
    ethereum: null,
    'binance-coin': null,
    cardano: null,
    solana: null,
    xrp: null,
    dogecoin: null,
    polkadot: null,
    uniswap: null,
    stellar: null,
    litecoin: null,
    chainlink: null,
    vechain: null,
    tron: null
  });

const [last24HoursChanges, setLast24HoursChanges] = useState<any>({
    'bitcoin': 0,
    'ethereum':0,
    'binance-coin': '0',
    'cardano': '0',
    'solana': '0',
    'xrp': '0',
    'dogecoin': '0',
    'polkadot': '0',
    'uniswap': '0',
    'stellar': '0',
    'litecoin': '0',
    'chainlink': '0',
    'vechain': '0',
    'tron': '0',
})
 
  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch(`https://api.coincap.io/v2/assets?ids=${symbolString}`);
        const data = await response.json();
        const updatedPrices = { ...cryptoData };
        const lastChanges = {...last24HoursChanges}
        data.data.forEach((asset: any) => {
          console.log("asset", asset);
          if (updatedPrices[asset.id] !== undefined) {
            updatedPrices[asset.id] = parseFloat(asset.priceUsd);
            lastChanges[asset.id] = Number(asset.changePercent24Hr).toFixed(2);   
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

console.log("cryptoData", cryptoData)
  return (
    <div>
    <RealTimePrice initialData={cryptoData} symbolString={symbolString} last24HoursChanges={last24HoursChanges} />
  </div>
  );
}
