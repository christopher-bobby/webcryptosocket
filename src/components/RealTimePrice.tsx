// components/RealTimeDataComponent.tsx

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ic_btc from '../assets/icons/ic-bitcoin.svg';
import ic_xrp from '../assets/icons/ic-xrp.svg';
import ic_bnb from '../assets/icons/ic-bnb.svg';
import ic_ada from '../assets/icons/ic-ada.svg';
import ic_sol from '../assets/icons/ic-solana.svg';
import ic_doge from '../assets/icons/ic-dogecoin.svg';
import ic_dot from '../assets/icons/ic-polkadot.svg';
import ic_uni from '../assets/icons/ic-uniswap.svg';
import ic_lite from '../assets/icons/ic-litecoin.svg';
import ic_stellar from '../assets/icons/ic-stellar.svg';
import ic_link from '../assets/icons/ic-chainlink.svg';
import ic_vet from '../assets/icons/ic-vet.svg';
import ic_tron from '../assets/icons/ic-tron.svg';


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
  const listClass = " pb-2 flex justify-between mb-4 md:mb-8 flex-row";
  const cryptoList = [
    { name: 'Bitcoin', abbr:'BTC', key: 'bitcoin', link: '/detail/btc', src: ic_btc },
    { name: 'Ripple', abbr:'XRP', key: 'xrp', link: '/detail/xrp', src: ic_xrp },
    { name: 'Binance Coin', abbr:'BNB', key: 'binance-coin', link: '/detail/bnb', src: ic_bnb },
    { name: 'Cardano', abbr:'ADA', key: 'cardano', link: '/detail/ada', src: ic_ada },
    { name: 'Solana', abbr:'SOL', key: 'solana', link: '/detail/sol', src: ic_sol },
    { name: 'Dogecoin', abbr: 'DOGE',key: 'dogecoin', link: '/detail/doge', src: ic_doge },
    { name: 'Polkadot', abbr:'DOT', key: 'polkadot', link: '/detail/dot', src: ic_dot },
    { name: 'Uniswap',abbr:'UNI', key: 'uniswap', link: '/detail/uni', src: ic_uni },
    { name: 'Stellar',abbr: 'XLM', key: 'stellar', link: '/detail/stellar', src: ic_stellar },
    { name: 'Litecoin', abbr: 'LITE', key: 'litecoin', link: '/detail/lite', src: ic_lite },
    { name: 'Chainlink', abbr:'LINK', key: 'chainlink', link: '/detail/link', src: ic_link },
    { name: 'Vechain', abbr: 'VET', key: 'vechain', link: '/detail/vet', src: ic_vet },
    { name: 'Tron', abbr: 'TRON', key: 'tron', link: '/detail/tron', src: ic_tron },
  ];
  return (
    <div  className="bg-white text-black min-h-[100vh] p-5 md:w-1/2 m-auto">
      <div className="flex text-black mb-2 md:mb-8">
        <div className="w-1/2">Name</div>
        <div className="w-1/4">Last Price</div>
        <div className="w-1/4 text-right">24h chg%</div>
      </div>
      <ul>
      {cryptoList.map((crypto) => (
        <li key={crypto.key} className={listClass}>
          <Link href={crypto.link} className="flex w-full items-center">
            <div className="w-1/2 flex">
              <Image
                src={crypto.src}
                width={50}
                height={50}
                alt="Picture of the author"
              />
              <div className='ml-2'>
                <span className=' text-lg'>{crypto.abbr}</span>
                <span className='block text-sm opacity-75'>{crypto.name}</span>
              </div>

            </div>
            <div className="w-1/4">
              {cryptoPrices[crypto.key] && `$${Number(cryptoPrices[crypto.key]).toFixed(2)}`}
            </div>
            <div className="w-1/4 text-right text-white">
              {Number(last24HoursChanges[crypto.key]) > 0 ? (
                <span className="w-16 h-8 flex items-center justify-center bg-green-500 ml-auto rounded text-sm">{last24HoursChanges[crypto.key]}%</span>
              ) : (
                <span className="w-16 h-8 flex items-center justify-center bg-red-500 ml-auto rounded text-sm">{last24HoursChanges[crypto.key]}%</span>
              )}
            </div>
          </Link>
        </li>
      ))}
    </ul>
    </div>
  );
};

export default RealTimePrice;
