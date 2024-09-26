import { Suspense } from 'react';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';



import { prefetchConvertPage } from '@/lib/server/prefetch/prefetchConvertPage';
import { getDelegatorAddress } from '@/lib/server/settings';



import BlockHeight from './_components/blockHeight';
import ConvertForm from './_components/convertForm';
import Widget from './_components/protocolPriceWidget/widget'

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
      <main className="mt-20 flex grow flex-col items-center justify-center lg:container">
        <div className="flex flex-col gap-4 min-[850px]:gap-0 min-[850px]:max-lg:mr-[-34%] lg:max-xl:mr-[-25%]">
          <BlockHeight delegatorAddr={delegatorAddr} />
          <div className="relative">
            <div className="absolute right-0 top-[-30px] mr-[100%] hidden min-[850px]:block">
              <Suspense>
                {/* <PriceWidget /> */}
                <Widget />
              </Suspense>
            </div>
            <ConvertForm />
          </div>
          <div className="mx-auto flex w-fit flex-col min-[850px]:hidden">
            <Suspense>
              {/* <PriceWidget /> */}
              <Widget />
            </Suspense>
          </div>
        </div>
      </main>
    </HydrationBoundary>
  )
}