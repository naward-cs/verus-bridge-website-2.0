import {Link} from '@nextui-org/react'

export default function ClaimsPage() {
  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-4 pt-24 sm:p-24 md:pt-40">
    //   <div className="z-10  w-full max-w-5xl items-start justify-between gap-4 space-y-10 text-sm md:flex md:space-y-0 ">
    //     <Suspense>
    //       <PriceTable />
    //     </Suspense>
    <div className="flex flex-col pt-4 md:basis-1/3">
      <div className="flex w-full flex-col space-y-4 rounded-xl border-[#EFEFEF] p-8 md:border-2 ">
        <h2 className="text-2xl font-medium">Bridge.vETH liquidity pool</h2>
        <p className="text-[#444]">
          Bridge.vETH is a 100% backed currency with 4 currencies in its
          reserves (VRSC, ETH, DAI, MKR).
        </p>
        <p className="text-[#444]">
          The Bridge.vETH currency function is to make the bridging of assets
          simple. From wherever side on the bridge you send it converts the fees
          that you need seamlessly.
        </p>
        <p className="text-[#444]">
          The value of Bridge.vETH increases relative to reserves when fees or
          interest (Dai Savings Rate) are added to the reserves without there
          being new Bridge.vETH minted.
        </p>
        <Link isExternal href="https://docs.verus.io/eth-bridge/#bridge-veth-currency">
          What are the fees Bridge.vETH accrues?
        </Link>
      </div>
    </div>
    //   </div>
    // </main>
  )
}
