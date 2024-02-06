import React from 'react'

import CoinLogos from '@/components/shared/coinLogos'
import {Icons} from '@/components/shared/icons'

const ButtonText = (info: {
  label?: string
  symbol?: string
  iAddr?: string
  currency?: string
}) => {
  if (info.label) {
    return (
      <span className="flex flex-row items-center justify-center">
        <CoinLogos symbol={info.symbol!} iAddr={info.iAddr!} />

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

export default ButtonText
