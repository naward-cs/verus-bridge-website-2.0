import React from 'react'
import Image from 'next/image'
import CoinLogoList from '@/data/coinLogoList.json'

import {useGetLogo, useGetTokenRef} from '@/lib/hooks/tokenLogos'
import RenderPbassCurrencyLogo from '@/components/shared/altLogos'

const CoinLogos = (info: {symbol: string; iAddr: string}) => {
  const {data: logoList} = useGetTokenRef()
  const logoRef =
    logoList?.filter(
      (t: {id: string; symbol: string; name: string}) =>
        t.symbol === info.symbol.toUpperCase()
    )[0]?.id || ''
  const {data: logo} = useGetLogo(logoRef)
  const isCommon =
    info.symbol &&
    CoinLogoList.filter((t) => t.symbol === info.symbol!.toLowerCase())[0]
      ?.image
  if (isCommon)
    return (
      <Image
        src={isCommon}
        alt={info.symbol}
        height={26}
        width={26}
        className="mr-1.5 rounded-full bg-[#DCDEEA]"
      />
    )
  if (logo)
    return (
      <Image
        src={logo}
        alt={info.symbol}
        height={26}
        width={26}
        className="mr-1.5 rounded-full bg-[#DCDEEA]"
      />
    )
  return <RenderPbassCurrencyLogo iAddr={info.iAddr} small />
}

export default CoinLogos
