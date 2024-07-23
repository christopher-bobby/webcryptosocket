import React, { useEffect, useRef, memo } from 'react';
import { redirect } from 'next/navigation';
import { SYMBOLS } from '@/constants';

function TradingViewWidget({ symbol }: { symbol?: string | string[] }) {
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (
      symbol !== SYMBOLS.BTCUSD &&
      symbol !== SYMBOLS.XRPUSD &&
      symbol !== SYMBOLS.BNBUSD &&
      symbol !== SYMBOLS.ADAUSD &&
      symbol !== SYMBOLS.SOLUSD &&
      symbol !== SYMBOLS.DOGEUSD &&
      symbol !== SYMBOLS.AVAXUSD &&
      symbol !== SYMBOLS.DOTUSD &&
      symbol !== SYMBOLS.UNIUSD &&
      symbol !== SYMBOLS.XLMUSD &&
      symbol !== SYMBOLS.LTCUSD &&
      symbol !== SYMBOLS.LINKUSD &&
      symbol !== SYMBOLS.VETUSD
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
