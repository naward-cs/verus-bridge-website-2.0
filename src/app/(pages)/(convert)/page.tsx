import {Suspense} from 'react'
import {dehydrate, HydrationBoundary, QueryClient} from '@tanstack/react-query'

import {prefetchConvertPage} from '@/lib/server/prefetch/prefetchConvertPage'
import {getDelegatorAddress} from '@/lib/server/settings'

import BlockHeight from './_components/blockHeight'
import ConvertForm from './_components/convertForm'
import PriceWidget from './_components/priceWidget'

export default async function Home() {
  const queryClient = new QueryClient()
  const delegatorAddr = getDelegatorAddress()
  try {
    //Should always work, however, pending blocking cookies or
    //init on private browswer mode, wagmiStore has trouble initializing

    await prefetchConvertPage(queryClient)
  } catch {}

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="justify-cente container mt-20 flex flex-col items-center ">
        <div className="flex flex-col">
          <BlockHeight delegatorAddr={delegatorAddr} />
          <div className="relative">
            <Suspense>
              <PriceWidget />
            </Suspense>
            <ConvertForm />
          </div>
        </div>
      </main>
    </HydrationBoundary>
  )
}
