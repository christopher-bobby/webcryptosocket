// components/RealTimeDataComponent.tsx

import { useEffect, useState } from 'react';
import Link from 'next/link';

const RealTimePrice = ({ initialData, symbolString, last24HoursChanges } : { initialData: any, symbolString: string, last24HoursChanges: any}) => {
  const [cryptoPrices, setCryptoPrices] = useState({...initialData});

  useEffect(()=> {
    setCryptoPrices({...initialData})
  }, [initialData])

  useEffect(() => {
    const socket = new WebSocket(`wss://ws.coincap.io/prices?assets=${symbolString}`);

    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("all data", event)
      setCryptoPrices((prevPrices) => ({
        ...prevPrices,
        ...data,
      }));
      // Handle received data here, update state, etc.
    };

    socket.onclose = () => {
      console.log('WebSocket closed');
    };

    return () => {
      socket.close();
    };
  }, [symbolString]);
    console.log("cryptoPrices", cryptoPrices, initialData, last24HoursChanges)
    console.log("last24HoursChanges", last24HoursChanges)
  const listClass = "border-b pb-2 flex justify-between";

  return (
    <div>
      <ul>
        <li className={listClass}>
          <Link href="/detail/btc">Bitcoin: {cryptoPrices["bitcoin"] && `$${Number(cryptoPrices["bitcoin"]).toFixed(2)}`}</Link>
          {Number(last24HoursChanges['bitcoin']) > 0 ? <span className='text-green-500'>{last24HoursChanges['bitcoin']}%</span> : <span className="text-red-500">{last24HoursChanges['bitcoin']}%</span>}
        </li>
        <li className={listClass}>
          <Link href="/detail/xrp">Ripple: {cryptoPrices["xrp"] && `$${Number(cryptoPrices["xrp"]).toFixed(2)}`}</Link>
          {Number(last24HoursChanges['xrp']) > 0 ? <span className='text-green-500'>{last24HoursChanges['xrp']}%</span> : <span className="text-red-500">{last24HoursChanges['xrp']}%</span>}
        </li>
        <li className={listClass}>
          <Link href="/detail/bnb">Binance Coin: {cryptoPrices["binance-coin"] && `$${Number(cryptoPrices["binance-coin"]).toFixed(2)}`}</Link>
          {Number(last24HoursChanges['xrp']) > 0 ? <span className='text-green-500'>{last24HoursChanges['binance-coin']}%</span> : <span className="text-red-500">{last24HoursChanges['binance-coin']}%</span>}
        </li>
        <li className={listClass}>
          <Link href="/detail/ada">Cardano: {cryptoPrices["cardano"] && `$${Number(cryptoPrices["cardano"]).toFixed(2)}`}</Link>
          {Number(last24HoursChanges['cardano']) > 0 ? <span className='text-green-500'>{last24HoursChanges['cardano']}%</span> : <span className="text-red-500">{last24HoursChanges['cardano']}%</span>}
        </li>
        <li className={listClass}>
          <Link href="/detail/sol">Solana: {cryptoPrices["solana"] && `$${Number(cryptoPrices["solana"]).toFixed(2)}`}</Link>
          {Number(last24HoursChanges['solana']) > 0 ? <span className='text-green-500'>{last24HoursChanges['solana']}%</span> : <span className="text-red-500">{last24HoursChanges['solana']}%</span>}
        </li>
        <li className={listClass}>
          <Link href="/detail/doge">Dogecoin: {cryptoPrices["dogecoin"] && `$${Number(cryptoPrices["dogecoin"]).toFixed(2)}`}</Link>
          {Number(last24HoursChanges['dogecoin']) > 0 ? <span className='text-green-500'>{last24HoursChanges['dogecoin']}%</span> : <span className="text-red-500">{last24HoursChanges['dogecoin']}%</span>}
        </li>
        <li className={listClass}>
          <Link href="/detail/dot">Polkadot: {cryptoPrices["polkadot"] && `$${Number(cryptoPrices["polkadot"]).toFixed(2)}`}</Link>
          {Number(last24HoursChanges['polkadot']) > 0 ? <span className='text-green-500'>{last24HoursChanges['polkadot']}%</span> : <span className="text-red-500">{last24HoursChanges['polkadot']}%</span>}
        </li>
        <li className={listClass}>
          <Link href="/detail/uni">Uniswap: {cryptoPrices["uniswap"] && `$${Number(cryptoPrices["uniswap"]).toFixed(2)}`}</Link>
          {Number(last24HoursChanges['uniswap']) > 0 ? <span className='text-green-500'>{last24HoursChanges['uniswap']}%</span> : <span className="text-red-500">{last24HoursChanges['uniswap']}%</span>}
        </li>
        <li className={listClass}>
          <Link href="/detail/stellar">Stellar: {cryptoPrices["stellar"] && `$${Number(cryptoPrices["stellar"]).toFixed(2)}`}</Link>
          {Number(last24HoursChanges['stellar']) > 0 ? <span className='text-green-500'>{last24HoursChanges['stellar']}%</span> : <span className="text-red-500">{last24HoursChanges['stellar']}%</span>}
        </li>
        <li className={listClass}>
          <Link href="/detail/lite">Litecoin: {cryptoPrices["litecoin"] && `$${Number(cryptoPrices["litecoin"]).toFixed(2)}`}</Link>
          {Number(last24HoursChanges['litecoin']) > 0 ? <span className='text-green-500'>{last24HoursChanges['litecoin']}%</span> : <span className="text-red-500">{last24HoursChanges['litecoin']}%</span>}
        </li>
        <li className={listClass}>
          <Link href="/detail/link">Chainlink: {cryptoPrices["chainlink"] && `$${Number(cryptoPrices["chainlink"]).toFixed(2)}`}</Link>
          {Number(last24HoursChanges['chainlink']) > 0 ? <span className='text-green-500'>{last24HoursChanges['chainlink']}%</span> : <span className="text-red-500">{last24HoursChanges['chainlink']}%</span>}
        </li>
        <li className={listClass}>
          <Link href="/detail/vet">Vechain: {cryptoPrices["vechain"] && `$${Number(cryptoPrices["vechain"]).toFixed(2)}`}</Link>
          {Number(last24HoursChanges['vechain']) > 0 ? <span className='text-green-500'>{last24HoursChanges['vechain']}%</span> : <span className="text-red-500">{last24HoursChanges['vechain']}%</span>}
        </li>
        <li className={listClass}>
          <Link href="/detail/tron">Tron: {cryptoPrices["tron"] && `$${Number(cryptoPrices["tron"]).toFixed(2)}`}</Link>
          {Number(last24HoursChanges['tron']) > 0 ? <span className='text-green-500'>{last24HoursChanges['tron']}%</span> : <span className="text-red-500">{last24HoursChanges['tron']}%</span>}
        </li>
      </ul>
    </div>
  );
};

export default RealTimePrice;
