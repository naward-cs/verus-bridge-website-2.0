import React from 'react'
import Image from 'next/image'
import CoinLogoList from '@/data/coinLogoList.json'

import {useGetLogo} from '@/lib/hooks/tokenLogos'
import RenderPbassCurrencyLogo from '@/components/shared/altLogos'
import {Icons} from '@/components/shared/icons'

const ButtonText = (info: {
  label?: string
  logoRef?: string
  symbol?: string
  iAddr?: string
}) => {
  const {data: logo} = useGetLogo(info?.logoRef)
  const isCommon =
    info.symbol &&
    CoinLogoList.filter((t) => t.symbol === info.symbol!.toLowerCase())[0]
      ?.image
  if (info.label) {
    return (
      <>
        {isCommon ? (
          <Image
            src={isCommon}
            alt={info.label}
            height={26}
            width={26}
            className="mr-1.5 rounded-full bg-[#DCDEEA]"
          />
        ) : logo ? (
          <Image
            src={logo}
            alt={info.label}
            height={26}
            width={26}
            className="mr-1.5 rounded-full bg-[#DCDEEA]"
          />
        ) : (
          <RenderPbassCurrencyLogo iAddr={info.iAddr!} small />
        )}
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
