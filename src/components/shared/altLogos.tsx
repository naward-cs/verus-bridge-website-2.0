import React from 'react'

import {cn} from '@/lib/utils/tailwindUtil'

const RenderPbassCurrencyLogo = ({
  iAddr,
  small = false,
}: {
  iAddr: string
  small?: boolean
}) => {
  const hashCode = (str: string) => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }
    return hash
  }

  const intToRGB = (i: number) => {
    const c = (i & 0x00ffffff).toString(16)
    const sub = '00000'.substring(0, 6 - c.length) + c
    return `#${sub}`
  }

  const hashedNum = hashCode(iAddr)
  const _color = intToRGB(hashedNum)
  const interiorColors = []

  for (let i = 0; i < 16; i++) {
    const x = Math.sin(i + hashedNum) * (10000 + hashedNum)
    interiorColors.push(intToRGB(Math.floor(x)))
  }
  return (
    <div
      className={cn(
        'flex size-9 flex-wrap items-center justify-center overflow-hidden rounded-full',
        small && 'mr-1.5 size-[26px]'
      )}
      style={{backgroundColor: _color}}
    >
      {interiorColors.map((interiorColor, i) => (
        <div
          key={`${i}-${interiorColor}`}
          className={small ? 'h-[6px] w-[6px]' : 'h-2 w-2'}
          style={{backgroundColor: interiorColor}}
        />
      ))}
    </div>
  )
}

export default RenderPbassCurrencyLogo
