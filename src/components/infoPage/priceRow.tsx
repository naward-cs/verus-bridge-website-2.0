'use client';

import React, { Suspense } from 'react';



import { useCaprikaMarketInfo } from '@/lib/hooks/marketInfo';
import { cn } from '@/lib/utils/tailwindUtil';



import { Icons } from '../shared/icons';





type Mlist = {
  [key: string]: string
}

const MarketNameList: Mlist = {
  VRSC: 'vrsc-verus-coin',
  'MKR.vETH': 'mkr-maker',
  'DAI.vETH': 'dai-dai',
  vETH: 'eth-ethereum',
}

const Ticker = (coin: CoinList) => {
  const marketInfo = useCaprikaMarketInfo(MarketNameList[coin.name])

  const price = marketInfo?.quotes.USD.price
  const rate =
    coin.daiPrice < price ? 'less' : coin.daiPrice > price ? 'greater' : 'equal'
  const percent = Math.abs(coin.daiPrice / price) - 1
  return (
    <p
      className={cn(
        'flex items-center justify-end text-[#939393]',
        rate === 'less' && 'text-red-600',
        rate === 'greater' && 'text-green-600'
      )}
    >
      <Icons.ticker
        height={8}
        width={12}
        className={cn(
          'mr-2',
          rate === 'greater' && 'rotate-180',
          rate === 'equal' && 'hidden'
        )}
      />
      {Intl.NumberFormat('en-US', {
        style: 'percent',
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      }).format(Math.abs(percent))}
    </p>
  )
}

const DaiTicker = () => {
  return <p className="flex items-center justify-end text-[#939393]">0.00%</p>
}

const PriceRow = (coin: CoinList) => {
  
  return (
    <div className="grid grid-cols-4 rounded-lg border border-bluePrimary p-5 text-xs font-medium text-bluePrimary sm:text-base md:text-lg lg:text-xl">
      <p className="text-left">{coin.name}</p>
      <p className="text-right opacity-[.54]">
        {Intl.NumberFormat('en-US', {
          style: 'decimal',
          maximumFractionDigits: 3,
          minimumFractionDigits: 3,
        }).format(coin.amount || 0)}
      </p>

      <p className=" text-right">
        {Intl.NumberFormat('en-US', {
          style: 'decimal',
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }).format(coin.daiPrice || 0)}
      </p>
      <Suspense fallback={<DaiTicker />}>
        {coin.name === 'DAI.vETH' ? <DaiTicker /> : <Ticker {...coin} />}
      </Suspense>
    </div>
  )
}

export default PriceRow