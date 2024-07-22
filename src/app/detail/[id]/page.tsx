"use client"

import { useRouter } from 'next/navigation';
import { NextPage } from 'next';
import { useParams } from 'next/navigation'
import TradingViewWidget from '@/components/CandlestickChart';
import OrderBook from '@/components/OrderBook';

const symbolMap: { [key: string]: string } = {
    btc: "BITSTAMP:BTCUSD",
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
};

const symbolOrderbook: { [key: string]: string } = {
    btc: "btcusdt",
    xrp: "xrpusdt", 
    bnb: "bnbusdt",
    ada: "adausdt",
    sol: "solusdt",
    doge: "dogeusdt",
    ava: "avausdt",
    dot: "dotusdt",
    uni: "uniusdt",
    stellar: "xlmusdt",
    lite: "ltcusdt",
    link: "linkusdt",
    vet: "vetusdt",
};


const DetailPage: NextPage = () => {
    const { id } = useParams<{ id: string }>();
    const symbol = symbolMap[id];
    const symbolAssetOrderBook = symbolOrderbook[id];
  return (
    <div className='min-h-[100vh] bg-black'>
        <TradingViewWidget symbol={symbol}/>
        <OrderBook symbol={symbolAssetOrderBook} />
    </div>
  );
};

export default DetailPage;
