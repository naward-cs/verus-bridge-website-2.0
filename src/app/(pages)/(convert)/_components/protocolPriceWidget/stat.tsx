import React, {Suspense} from 'react'

import WidgetTicker from './widgetTicker'

const DaiWidgetTicker = () => {
  return (
    <p className="flex items-center justify-end text-xs text-[#939393]">
      0.00%
    </p>
  )
}

const FormatCoinLabel = (txt: string) => {
  if (txt == 'vETH') {
    return (
      <p className="col-span-2">
        ETH <span className="text-xs text-[#858585]">{txt}</span>
      </p>
    )
  }

  if (txt.endsWith('vETH')) {
    return (
      <p className="col-span-2">
        {txt.split('.')[0]}{' '}
        <span className="text-xs text-[#858585]">{txt}</span>
      </p>
    )
  }
  return <p className="col-span-2">{txt}</p>
}

const Stat = (coin: CoinList) => {
  return (
    <div className="grid grid-cols-4 font-medium">
      {FormatCoinLabel(coin.name)}
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
