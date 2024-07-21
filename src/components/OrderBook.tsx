import React, { useEffect, useState } from 'react';

interface OrderBookData {
  price: string;
  qty: string;
}

const OrderBook: React.FC = () => {
  const [bids, setBids] = useState<OrderBookData[]>([]);
  const [asks, setAsks] = useState<OrderBookData[]>([]);

  useEffect(() => {
    const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@depth');

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
    <div className="p-4">
      <h2>Order book</h2>
      <div className='md:flex md:flex-row'>
        <div className='w-1/2'>
          <h3>Bid</h3>

          <ul>
            {bids.map(({ price, qty }, index) => (
              <li key={index}>{`Price: ${price}, Quantity: ${qty}`}</li>
            ))}
          </ul>
        </div>
        <div className='w-1/2'>
          <h3 className='mt-4 md:mt-0'>Ask</h3>

          <ul>
            {asks.map(({ price, qty }, index) => (
              <li key={index}>{`Price: ${price}, Quantity: ${qty}`}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>

  );
};

export default OrderBook;
