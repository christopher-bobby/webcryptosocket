"use client"

import { NextPage } from 'next';
import { useParams } from 'next/navigation';
import TradingViewWidget from '../../../components/TradingViewWidget';
import OrderBook from '../../../components/OrderBook';
import { ASSETS , SYMBOLS} from '../../../constants';

const symbolMap: { [key: string]: string } = {
  btc: SYMBOLS.BTCUSD,
  xrp: SYMBOLS.XRPUSD,
  bnb: SYMBOLS.BNBUSD,
  ada: SYMBOLS.ADAUSD,
  sol: SYMBOLS.SOLUSD,
  doge: SYMBOLS.DOGEUSD,
  ava: SYMBOLS.AVAXUSD,
  dot: SYMBOLS.DOTUSD,
  uni: SYMBOLS.UNIUSD,
  stellar: SYMBOLS.XLMUSD,
  lite: SYMBOLS.LTCUSD,
  link: SYMBOLS.LINKUSD,
  vet: SYMBOLS.VETUSD,
};

const symbolOrderbook: { [key: string]: string } = {
  btc: ASSETS.BTCUSDT,
  xrp: ASSETS.XRPUSDT,
  bnb: ASSETS.BNBUSDT,
  ada: ASSETS.ADAUSDT,
  sol: ASSETS.SOLUSDT,
  doge: ASSETS.DOGEUSDT,
  ava: ASSETS.AVAUSDT,
  dot: ASSETS.DOTUSDT,
  uni: ASSETS.UNIUSDT,
  stellar: ASSETS.XLMUSDT,
  lite: ASSETS.LTCUSDT,
  link: ASSETS.LINKUSDT,
  vet: ASSETS.VETUSDT,
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
