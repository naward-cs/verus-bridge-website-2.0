import React from 'react'
import {Skeleton} from '@nextui-org/react'

import {useWidgetBridgeInfo} from '@/lib/hooks/verus/useSelectWidgetBridgeInfo'

import {useWidgetContext} from './widgetProvider'

const FormatCurrencyLabel = (txt: string) => {
  if (txt == 'vETH') {
    return <span className="ml-2">ETH</span>
  }
  if (txt.endsWith('vETH')) {
    return <span className="ml-2">{txt.split('.')[0]}</span>
  }
  return <span className="ml-2">{txt}</span>
}
const LiquidityRow = () => {
  const {fromValue, toValue} = useWidgetContext()
  const fromValueId = new Set(fromValue).values().next().value?.toString()
  const toToken = new Set(toValue).values().next().value?.toString()
  const {bridgeInfo, isLoading} = useWidgetBridgeInfo(
    fromValueId || 'Bridge.vETH',
    toToken!
  )

  return (
    <div className="px-2">
      <p className="text-xs text-[#858585]">Total value of liquidity</p>
      <Skeleton isLoaded={!isLoading} className="my-auto rounded-md">
        <p className="flex justify-between font-medium">
          <span>
            {Intl.NumberFormat('en-US', {
              style: 'decimal',

              minimumFractionDigits: 2,
              maximumFractionDigits: 6,
            }).format((bridgeInfo.amount || 0) * (bridgeInfo.price || 0))}
          </span>
          <span>{FormatCurrencyLabel(bridgeInfo.currency)}</span>
        </p>
      </Skeleton>
    </div>
  )
}

export default LiquidityRow
