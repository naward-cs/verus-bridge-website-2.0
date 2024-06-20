import React from 'react'
import {dehydrate, HydrationBoundary, QueryClient} from '@tanstack/react-query'

import {getTokenList} from '@/lib/server/actions/getTokenList'
import {prefetchERC20Balances} from '@/lib/server/prefetch/prefetchERC20Balance'

import Amount from './amount'
import {FromTokenModal} from './fromToken'
import MaxButton from './maxButton'

export const revalidate = 3600 // revalidate at most every hour

export const FromTokenRow = async () => {
  const queryClient = new QueryClient()
  const tokenList = await getTokenList()
  try {
    //Should always work, however, pending blocking cookies or
    //init on private browswer mode, wagmiStore has trouble initializing

    await prefetchERC20Balances(queryClient, tokenList)
  } catch {}

  return (
    <div className="flex min-h-[120px] flex-col justify-start rounded-lg border border-transparent bg-[#DDD] p-4 py-5 hover:border-[#b6b6b6]">
      <p className="text-sm">You send</p>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <Amount tokenList={tokenList} />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <FromTokenModal tokenList={tokenList} />
        </HydrationBoundary>
      </div>
      <MaxButton tokenList={tokenList} />
    </div>
  )
}
