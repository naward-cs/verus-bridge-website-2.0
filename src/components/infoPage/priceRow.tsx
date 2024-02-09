'use client' 

import React, { Suspense } from 'react' 
import Image from 'next/image'

import {useCaprikaMarketInfo} from '@/lib/hooks/marketInfo'
import {cn} from '@/lib/utils/tailwindUtil'

import {Icons} from '../shared/icons'

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
        'flex items-center justify-end text-xs text-[#939393] md:text-sm',
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
  return (
    <p className="flex items-center justify-end text-xs text-[#939393] md:text-sm">
      0.00%
    </p>
  )
}

const PriceRow = (coin: CoinList) => {
  let coinLogo
  let coinName

  switch (coin.name) {
    case 'VRSC':
      coinLogo = '/logos/vrsc.png'
      coinName = 'VRSC'
      break
    case 'DAI.vETH':
      coinLogo = '/logos/dai.png'
      coinName = 'DAI'
      break
    case 'MKR.vETH':
      coinLogo = '/logos/mkr.png'
      coinName = 'MKR'
      break
    case 'vETH':
      coinLogo = '/logos/eth.svg'
      coinName = 'ETH'
      break
    default:
      coinLogo = ''
      coinName = ''
  }

  return (
    <div className="grid grid-cols-4 rounded-lg border border-bluePrimary p-5 text-xs font-medium text-bluePrimary sm:text-base md:text-lg lg:text-xl">
      <p className="flex items-center text-left text-black text-sm">
        <Image
          src={coinLogo}
          alt="coin logo"
          height={26}
          width={26}
          className="mr-1.5 rounded-full"
        />
        
        {coinName} {coin.name !== "VRSC" &&<span className='text-[#8E8E8E] text-xs font-normal self-end pb-1 ml-1'>{coin.name}</span>}
        
      </p>
      <p className="text-right text-xs opacity-[.54] md:text-sm">
        {Intl.NumberFormat('en-US', {
          style: 'decimal',
          maximumFractionDigits: 3,
          minimumFractionDigits: 3,
        }).format(coin.amount || 0)}
      </p>

      <p className=" text-right ">
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