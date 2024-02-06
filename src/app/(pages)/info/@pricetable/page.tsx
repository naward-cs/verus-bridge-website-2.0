import {Suspense} from 'react'

import PriceTable from '@/components/infoPage/priceTable'

import AssetsSecuredSection from '../assetsSecuredSection'

export default function PriceTableSection() {
  return (
    <div className="flex flex-col space-y-14 md:basis-7/12 ">
      <Suspense>
        <PriceTable />
      </Suspense>
      <div className="hidden rounded-xl border border-[#d1d1d1] p-8 md:block">
        <AssetsSecuredSection />
      </div>
    </div>
  )
}
