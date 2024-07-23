import { useEffect, useState } from 'react';
import { CryptoPrices, Last24HrChgs } from '@/types';
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
import SkeletonLoader from './SkeletonLoader';

type CryptoPriceKey = keyof CryptoPrices;

const RealTimePrice = ({ initialData, symbolString, last24HoursChanges } : { initialData: CryptoPrices, symbolString: string, last24HoursChanges: Last24HrChgs}) => {
  const [cryptoPrices, setCryptoPrices] = useState({...initialData});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=> {
    setCryptoPrices({...initialData})
  }, [initialData])

  useEffect(() => {
    const socket = new WebSocket(`wss://ws.coincap.io/prices?assets=${symbolString}`);

    socket.onopen = () => {
      setIsLoading(false)
      console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setCryptoPrices((prevPrices) => ({
        ...prevPrices,
        ...data,
      }));
    };

    socket.onclose = () => {
      console.log('WebSocket closed');
    };

    return () => {
      socket.close();
    };
  }, [symbolString]);

  const listClass = "pb-2 flex justify-between mb-4 md:mb-8 flex-row";
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
  ];

  if(isLoading) {
    return (
      <div className="min-h-[100vh]">
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
      </div>
    )
  }


  return (
    <div className="bg-white text-black min-h-[100vh] p-3 md:p-6 m-auto">
      <div className="flex text-black mb-6 md:mb-8 font-semibold">
        <div className="w-1/2 text-sm md:text-md">Name</div>
        <div className="w-1/4 text-sm md:text-md">Last Price</div>
        <div className="w-1/4 text-sm md:text-md text-right">24h chg%</div>
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
                <span className='text-lg'>{crypto.abbr}</span>
                <span className='block text-sm opacity-75'>{crypto.name}</span>
              </div>

            </div>
            <div className="w-1/4 text-sm md:text-md">
            {cryptoPrices[crypto.key as CryptoPriceKey] && `$${Number(cryptoPrices[crypto.key as CryptoPriceKey]).toFixed(2)}`}
            </div>
            {last24HoursChanges[crypto.key as CryptoPriceKey] && (<div className="w-1/4 text-right text-white">
              {Number(last24HoursChanges[crypto.key as CryptoPriceKey]) > 0 ? (
                <span className="w-16 h-8 flex items-center justify-center bg-green-500 ml-auto rounded text-sm">{last24HoursChanges[crypto.key as CryptoPriceKey]}%</span>
              ) : (
                <span className="w-16 h-8 flex items-center justify-center bg-red-500 ml-auto rounded text-sm">{last24HoursChanges[crypto.key as CryptoPriceKey]}%</span>
              )}
            </div>)}
          </Link>
        </li>
      ))}
    </ul>
    </div>
  );
};

export default RealTimePrice;
