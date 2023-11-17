import {Suspense} from 'react'

import PriceTable from '@/components/infoPage/priceTable'

export default function ClaimsPage() {
  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-4 pt-24 sm:p-24 md:pt-40">
    //   <div className="z-10  w-full max-w-5xl items-start justify-between gap-4 space-y-10 text-sm md:flex md:space-y-0 ">
    //     <Suspense>
    //       <PriceTable />
    //     </Suspense>
        <div className="flex flex-col pt-4 md:basis-1/3">
          <div className="flex w-full flex-col space-y-4 rounded-xl border-2 border-[#EFEFEF] p-8 ">
            <h2 className="text-2xl font-medium">
              Verus Internet
              <br />
              Protocol (VIP)
            </h2>
            <p className="text-[#9B9B9B]">
              Verus Internet Protocol (VIP). The Verus-Ethereum Bridge uses the
              Verus Internet Protocol (VIP) for cross-chain communication. It
              relies on cryptographic proofs, with notary witnesses validating
              notarizations created by network validators.
            </p>
            <p className="text-[#9B9B9B]">
              The bridge ensures non-custodial, decentralized, secure, and
              transparent cross-chain transactions between Verus and Ethereum.
            </p>
          </div>
        </div>
    //   </div>
    // </main>
  )
}
