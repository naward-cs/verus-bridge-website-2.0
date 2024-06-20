import React from 'react'
import {Skeleton} from '@nextui-org/react'

import {Icons} from '../shared/icons'

const PriceRowSkeleton = () => {
  return (
    <Skeleton className="grid h-[68px] grid-cols-4 rounded-lg border border-bluePrimary bg-bluePrimary/5 p-5 text-base font-medium  text-bluePrimary md:h-[70px] md:text-xl">
      <p className="text-left">name</p>
      <p className="text-right opacity-[.54]">
        {Intl.NumberFormat('en-US', {
          style: 'decimal',
          maximumFractionDigits: 3,
          minimumFractionDigits: 3,
        }).format(0)}
      </p>

      <p className=" text-right">
        {Intl.NumberFormat('en-US', {
          style: 'decimal',
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }).format(0)}
      </p>
      <p>
        <Icons.ticker height={8} width={12} />
        0.00
      </p>
    </Skeleton>
  )
}

export default PriceRowSkeleton
