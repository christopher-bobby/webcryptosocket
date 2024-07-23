import React, { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { ASSETS } from '@/constants';

interface OrderBookData {
  price: string;
  qty: string;
}

const OrderBook = ({symbol} : {symbol: string}) => {
  const [bids, setBids] = useState<OrderBookData[]>([]);
  const [asks, setAsks] = useState<OrderBookData[]>([]);
 
  useEffect(()=> {
    if(symbol !== ASSETS.BTCUSDT && symbol !== ASSETS.XRPUSDT && symbol !==  ASSETS.BNBUSDT &&
     symbol !== ASSETS.ADAUSDT &&
     symbol !== ASSETS.SOLUSDT &&
     symbol !== ASSETS.DOGEUSDT &&
     symbol !== ASSETS.AVAUSDT &&
     symbol !== ASSETS.DOTUSDT &&
     symbol !== ASSETS.UNIUSDT &&
     symbol !== ASSETS.XLMUSDT &&
     symbol !== ASSETS.LTCUSDT &&
     symbol !== ASSETS.LINKUSDT &&
     symbol !== ASSETS.VETUSDT) {
      redirect('/not-found')
     }
  },[])

  useEffect(() => {
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@depth`);

    ws.onopen = () => {
      console.log('Connected to WebSocket');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.b && data.a) {
        setBids(data.b.map(([price, qty]: [string, string]) => ({ price, qty })));
        setAsks(data.a.map(([price, qty]: [string, string]) => ({ price, qty })));
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error', error);
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket');
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="p-4 text-white h-full">
      <h2 className='font-semibold'>Order book</h2>
      <div className='md:flex md:flex-row md:justify-between'>
        <div className='md:w-1/3'>
          <h3>Bid</h3>

          <ul>
            {bids.slice(0,10).map(({ price, qty }, index) => (
              <li key={index} className='flex justify-between w-full'><span className='text-green-500'>{price}</span> <span>{qty}</span></li>
            ))}
          </ul>
        </div>
        <div className='md:w-1/3'>
          <h3 className='mt-4 md:mt-0'>Ask</h3>

          <ul>
            {asks.slice(0,10).map(({ price, qty }, index) => (
              <li key={index} className='flex justify-between w-full'><span className='text-red-500'>{price}</span> <span>{qty}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </div>

  );
};

export default OrderBook;
