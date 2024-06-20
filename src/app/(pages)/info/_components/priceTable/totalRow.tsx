'use client'

import {Skeleton} from '@nextui-org/react'

import {useBridgeInfo} from '@/lib/hooks/verus/useSelectBridgeInfo'

const TotalRow = () => {
  const {bridge, isLoading} = useBridgeInfo()
  return (
    <div className="grid grid-cols-4 items-center rounded-lg border border-bluePrimary bg-bluePrimary/5 p-5  text-base  font-medium text-bluePrimary md:text-xl">
      <p className="col-span-2 text-left ">Total value of liquidity</p>
      <Skeleton isLoaded={!isLoading} className="col-span-2 my-auto rounded-md">
        <p className=" text-right ">
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

export default TotalRow
