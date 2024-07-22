import React, { useEffect, useRef, memo } from 'react';
import { redirect } from 'next/navigation';

function TradingViewWidget({ symbol }: { symbol?: string | string[] }) {
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (
      symbol !== "BITSTAMP:BTCUSD" &&
      symbol !== "COINBASE:XRPUSD" &&
      symbol !== "BINANCE:BNBUSD" &&
      symbol !== "COINBASE:ADAUSD" &&
      symbol !== "COINBASE:SOLUSD" &&
      symbol !== "COINBASE:DOGEUSD" &&
      symbol !== "COINBASE:AVAXUSD" &&
      symbol !== "COINBASE:DOTUSD" &&
      symbol !== "COINBASE:UNIUSD" &&
      symbol !== "COINBASE:XLMUSD" &&
      symbol !== "COINBASE:LTCUSD" &&
      symbol !== "COINBASE:LINKUSD" &&
      symbol !== "COINBASE:VETUSD"
    ) {
      redirect('/not-found');
    }
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: symbol,
      interval: "D",
      timezone: "Etc/UTC",
      theme: "light",
      style: "1",
      locale: "en",
      allow_symbol_change: true,
      calendar: false,
      support_host: "https://www.tradingview.com"
    });
    if (container.current) {
      container.current.appendChild(script);
    }
  }, []);

  return (
    <div className="tradingview-widget-container !h-[500px]" ref={container}></div>
  );
}

export default memo(TradingViewWidget);
