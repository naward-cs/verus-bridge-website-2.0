import React from 'react'
import {Skeleton} from '@nextui-org/react'

export const Web3Skeleton = () => {
  return (
    <button>
      <Skeleton className="h-[42px] w-[232px] rounded-xl" />
    </button>
  )
}

export const TextSkeleton = () => {
  return <Skeleton as="p" className="h-3 w-6 rounded-lg" />
}
