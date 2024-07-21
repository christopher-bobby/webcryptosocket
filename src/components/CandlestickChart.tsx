// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from 'react';
import OrderBook from './OrderBook';
function TradingViewWidget({symbol} : {symbol?: string | string []}) {
  const container = useRef();

  useEffect( () => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        autosize: true,
        symbol: symbol || "BITSTAMP:BTCUSD",
        interval: "D",
        timezone: "Etc/UTC",
        theme: "light",
        style: "1",
        locale: "en",
        allow_symbol_change: true,
        calendar: false,
        support_host: "https://www.tradingview.com"
      });
      container?.current?.appendChild(script);
    },
  ), [];


  return (
    <>
        <div className="tradingview-widget-container !h-[500px]" ref={container}>
        </div>
        <OrderBook />
    </>
   
  );
}

export default memo(TradingViewWidget);