'use client'

// import {useQuery} from '@tanstack/react-query'
import {useQuery} from 'wagmi/query'

import txHeightQueryOptions from '@/lib/queries/txHeight'

export const useTransactionHeight = (
  chainId: number,
  delegatorAddr: `0x${string}`
) => {
  const txHeightOptions = txHeightQueryOptions(chainId, delegatorAddr)
  return useQuery({
    ...txHeightOptions,
    gcTime: 30_000,
    refetchInterval: 60_000,
    select(data) {
      const heightPos = 194
      return (
        parseInt(
          `0x${(data as unknown as string).substring(heightPos, heightPos + 8)}`,
          16
        ) || 1
      )
    },
  })
}
