import { estimateGasQueryOptions, hashFn } from 'wagmi/query';



import { config } from '@/config/wagmi';
import { blockHeightQueryOptions } from '@/lib/queries/blockHeight';
import { marketDataQuery } from '@/lib/queries/marketInfo';
import txHeightQueryOptions from '@/lib/queries/txHeight'

import {getChainId, getDelegatorAddress} from '../settings'

import type {QueryClient} from '@tanstack/react-query'

export const prefetchConvertPage = async (queryClient: QueryClient) => {
  const chainId = getChainId()
  const delegatorAddr = getDelegatorAddress()
  await queryClient.prefetchQuery(blockHeightQueryOptions(chainId))

  const txHeight = txHeightQueryOptions(chainId, delegatorAddr)
  await queryClient.prefetchQuery({
    ...txHeight,
    queryKeyHashFn: hashFn,
  })

  await queryClient.prefetchQuery(estimateGasQueryOptions(config, {chainId}))
  await queryClient.prefetchQuery(marketDataQuery())
}