'use client'

import {Suspense} from 'react'

import {useBridgeInfo} from '@/lib/hooks/verus/useSelectBridgeInfo'
import PriceRowSkeleton from '@/components/skeletons/priceRowSkeleton'

import PriceRow from './priceRow'

const PriceRows = () => {
  const {list, isLoading} = useBridgeInfo()
  if (isLoading)
    return (
      <>
        <PriceRowSkeleton />
        <PriceRowSkeleton />
        <PriceRowSkeleton />
        <PriceRowSkeleton />
      </>
    )
  if (!list) return null
  return list.map((c) => (
    <Suspense key={c.name} fallback={<PriceRowSkeleton />}>
      <PriceRow {...c} />
    </Suspense>
  ))
}

export default PriceRows
