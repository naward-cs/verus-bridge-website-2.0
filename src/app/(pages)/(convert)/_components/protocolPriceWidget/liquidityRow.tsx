import React from 'react'
import {Skeleton} from '@nextui-org/react'

import {useBridgeInfo} from '@/lib/hooks/verus/useSelectBridgeInfo'

const LiquidityRow = () => {
  const {bridge, isLoading} = useBridgeInfo()

  return (
    <div className="px-2">
      <p className="text-xs text-[#858585]">Total value of liquidity</p>
      <Skeleton isLoaded={!isLoading} className="my-auto rounded-md">
        <p className="font-medium">
          {Intl.NumberFormat('en-US', {
            style: 'decimal',

            minimumFractionDigits: 2,
            maximumFractionDigits: 3,
          }).format((bridge.amount || 0) * (bridge.daiPrice || 0))}{' '}
          DAI
        </p>
      </Skeleton>
    </div>
  )
}

export default LiquidityRow
