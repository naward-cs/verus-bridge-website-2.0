'use client'

import {Suspense} from 'react'
import {Skeleton} from '@nextui-org/react'

import {useBridgeInfo} from '@/lib/hooks/verus/useSelectBridgeInfo'

import Stat from './stat'

const StatSections = () => {
  const {list, isLoading} = useBridgeInfo()

  if (isLoading)
    return (
      <>
        <Skeleton className="h-2 rounded-lg" />
        <Skeleton className="h-2 rounded-lg" />
        <Skeleton className="h-2 rounded-lg" />
        <Skeleton className="h-2 rounded-lg" />
      </>
    )
  if (!list) return null
  return list.map((c) => (
    <Suspense key={c.name} fallback={<Skeleton className="h-2 rounded-lg" />}>
      <Stat {...c} />
    </Suspense>
  ))
}

export default StatSections
