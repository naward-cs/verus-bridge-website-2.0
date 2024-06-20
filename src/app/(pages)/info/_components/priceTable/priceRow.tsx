import React, {Suspense} from 'react'

import {CoinLogo} from '@/components/shared/coinLogo'

import DaiTicker from './daiTicker'
import Ticker from './ticker'

const PriceRow = (coin: CoinList) => {
  let coinLogo
  switch (coin.name) {
    case 'VRSC':
      coinLogo = 'VRSC'
      break
    case 'DAI.vETH':
      coinLogo = 'DAI'
      break
    case 'MKR.vETH':
      coinLogo = 'MKR'
      break
    case 'vETH':
      coinLogo = 'ETH'
      break
    default:
      coinLogo = ''
  }
  return (
    <div className="grid grid-cols-4 rounded-lg border border-bluePrimary p-5 text-xs font-medium text-bluePrimary sm:text-base md:text-lg lg:text-xl">
      <div className="flex items-center text-left text-sm text-black">
        <CoinLogo symbol={coinLogo} iAddr="0x1234" />
        <div className="flex flex-col md:flex-row">
          <p>{coinLogo} </p>
          {coin.name !== 'VRSC' && (
            <p className="self-end text-xs font-normal text-[#8E8E8E] md:ml-1">
              {coin.name}
            </p>
          )}
        </div>
      </div>
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
