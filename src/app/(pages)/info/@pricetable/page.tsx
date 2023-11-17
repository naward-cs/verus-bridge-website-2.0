import {Suspense} from 'react'

import PriceTable from '@/components/infoPage/priceTable'

export default function PriceTableSection() {
  return (
    <div className="flex flex-col space-y-14 md:basis-7/12">
      <Suspense>
        <PriceTable />
      </Suspense>
    </div>
  )
}
