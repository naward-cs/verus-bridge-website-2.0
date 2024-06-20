import React, {Suspense} from 'react'

import WidgetTicker from './widgetTicker'

const DaiWidgetTicker = () => {
  return (
    <p className="flex items-center justify-end text-xs text-[#939393]">
      0.00%
    </p>
  )
}

const Stat = (coin: CoinList) => {
  return (
    <div className="grid grid-cols-3 font-medium ">
      <p>{coin.name}</p>
      <p className="text-right">
        {Intl.NumberFormat('en-US', {
          style: 'decimal',
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }).format(coin.daiPrice || 0)}
      </p>
      <Suspense>
        {coin.name === 'DAI.vETH' ? (
          <DaiWidgetTicker />
        ) : (
          <WidgetTicker {...coin} />
        )}
      </Suspense>
    </div>
  )
}

export default Stat
