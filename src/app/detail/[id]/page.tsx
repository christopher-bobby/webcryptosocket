// app/detail/[id]/page.tsx
"use client"

import { useRouter } from 'next/navigation';
import { NextPage } from 'next';
import { useParams } from 'next/navigation'
import TradingViewWidget from '@/components/CandlestickChart';


const symbolMap: { [key: string]: string } = {
    xrp: "COINBASE:XRPUSD",
    bnb: "BINANCE:BNBUSD",
    ada: "COINBASE:ADAUSD",
    sol: "COINBASE:SOLUSD",
    doge: "COINBASE:DOGEUSD",
    ava: "COINBASE:AVAXUSD",
    dot: "COINBASE:DOTUSD",
    uni: "COINBASE:UNIUSD",
    stellar: "COINBASE:XLMUSD",
    lite: "COINBASE:LTCUSD",
    link: "COINBASE:LINKUSD",
    vet: "COINBASE:VETUSD",
    tron: "BINANCE:TRXUSDT",
  };

const DetailPage: NextPage = () => {
    const { id } = useParams<{ id: string }>();
    const symbol = symbolMap[id] || "BITSTAMP:BTCUSD";
  
    console.log("searchParams")
  return (
    <div>
      <TradingViewWidget symbol={symbol}/>

    </div>
  );
};

export default DetailPage;
