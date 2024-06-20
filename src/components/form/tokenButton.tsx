import React from 'react'

import {CoinLogo} from '../shared/coinLogo'
import {Icons} from '../shared/icons'

const TokenButton = (info: {
  label?: string
  symbol?: string
  iAddr?: string
  currency?: string
}) => {
  if (info.label) {
    return (
      <span className="flex flex-row items-center justify-center">
        <CoinLogo symbol={info.symbol!} iAddr={info.iAddr!} />

        {info.label}

        <Icons.chevronDown className="ml-2 h-4" />
      </span>
    )
  }
  return (
    <span className="flex flex-row items-center justify-center">
      Select currency
      <Icons.chevronDown className="ml-2 h-4" />
    </span>
  )
}

export default TokenButton
