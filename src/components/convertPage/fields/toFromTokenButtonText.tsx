import React from 'react'

import CoinLogos from '@/components/shared/coinLogos'
import {Icons} from '@/components/shared/icons'

const ButtonText = (info: {
  label?: string
  symbol?: string
  iAddr?: string
}) => {
  if (info.label) {
    return (
      <>
        <CoinLogos symbol={info.symbol!} iAddr={info.iAddr!} />

        {info.label}
        <Icons.chevronDown className="ml-2 h-4" />
      </>
    )
  }
  return (
    <>
      Select currency
      <Icons.chevronDown className="ml-2 h-4" />
    </>
  )
}

export default ButtonText
