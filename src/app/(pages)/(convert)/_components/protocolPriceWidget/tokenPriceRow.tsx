import React from 'react'

import {cn} from '@/lib/utils'

const FormatCoinLabel = (txt: string) => {
  if (txt == 'vETH') {
    return (
      <p>
        ETH <span className="text-xs text-[#858585]">{txt}</span>
      </p>
    )
  }
  if (txt.endsWith('vETH')) {
    return (
      <p>
        {txt.split('.')[0]}{' '}
        <span className="text-xs text-[#858585]">{txt}</span>
      </p>
    )
  }
  return <p>{txt}</p>
}

const FormatCurrencyLabel = (txt: string) => {
  if (txt == 'vETH') {
    return 'ETH'
  }
  if (txt.endsWith('vETH')) {
    return txt.split('.')[0]
  }
  return txt
}

const TokenPriceRow = (coin: WidgetCoinList) => {
  if (!coin) return null

  return (
    <div className="grid grid-cols-2 font-medium">
      {FormatCoinLabel(coin.name)}

      <p className={cn('text-right', coin.price === 1 && 'text-[#939393]')}>
        {Intl.NumberFormat('en-US', {
          style: 'decimal',
          maximumFractionDigits: 5,
          minimumFractionDigits: 2,
        }).format(coin.price || 0)}
        <span className="ml-1 text-xs">
          {FormatCurrencyLabel(coin.currency)}
        </span>
      </p>
    </div>
  )
}

export default TokenPriceRow
