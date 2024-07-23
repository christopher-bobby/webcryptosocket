"use client"

import { NextPage } from 'next';
import { useParams } from 'next/navigation';
import TradingViewWidget from '../../../components/TradingViewWidget';
import OrderBook from '../../../components/OrderBook';
import {
  BTCUSDT,
  XRPUSDT,
  BNBUSDT,
  ADAUSDT,
  SOLUSDT,
  DOGEUSDT,
  AVAUSDT,
  DOTUSDT,
  UNIUSDT,
  XLMUSDT,
  LTCUSDT,
  LINKUSDT,
  VETUSDT
} from '../../../constants';

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
  btc: BTCUSDT,
  xrp: XRPUSDT,
  bnb: BNBUSDT,
  ada: ADAUSDT,
  sol: SOLUSDT,
  doge: DOGEUSDT,
  ava: AVAUSDT,
  dot: DOTUSDT,
  uni: UNIUSDT,
  stellar: XLMUSDT,
  lite: LTCUSDT,
  link: LINKUSDT,
  vet: VETUSDT,
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
