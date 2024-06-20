import React from 'react'
import Image from 'next/image'
import CoinLogoList from '@/data/coinLogoList.json'

import {useCoinLogo} from '@/lib/hooks/web/useCoinLogo'
import {cn} from '@/lib/utils'

const AltLogo = ({
  genLogoInfo,
  small = false,
}: {
  genLogoInfo: {
    bgColor: string
    intColors: string[]
  }
  small?: boolean
}) => {
  const {bgColor, intColors} = genLogoInfo
  return (
    <div
      className={cn(
        'flex size-9 flex-wrap items-center justify-center overflow-hidden rounded-full',
        small && 'mr-1.5 size-[26px]'
      )}
      style={{backgroundColor: bgColor}}
    >
      {intColors.map((interiorColor, i) => (
        <div
          key={`${i}-${interiorColor}`}
          className={small ? 'size-[6px]' : 'size-2'}
          style={{backgroundColor: interiorColor}}
        />
      ))}
    </div>
  )
}

const FetchLogo = (info: {symbol: string; iAddr: string}) => {
  const {coinLogo, genLogo} = useCoinLogo(info)
  if (coinLogo)
    return (
      <Image
        src={coinLogo}
        alt={info.symbol}
        height={26}
        width={26}
        className="mr-1.5 rounded-full bg-[#DCDEEA]"
      />
    )
  return <AltLogo genLogoInfo={genLogo} small />
}

export const CoinLogo = (info: {
  symbol: string
  iAddr: string
  size?: number
}) => {
  const isCommon =
    info.symbol &&
    CoinLogoList.filter((t) => t.symbol === info.symbol!.toLowerCase())[0]
      ?.image
  if (isCommon)
    return (
      <Image
        src={isCommon}
        alt={info.symbol}
        height={info.size || 26}
        width={info.size || 26}
        className="mr-1.5 rounded-full bg-[#DCDEEA]"
      />
    )
  return <FetchLogo {...info} />
}
