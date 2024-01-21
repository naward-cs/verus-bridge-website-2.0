import {Link} from '@nextui-org/react'

import {Icons} from '@/components/shared/icons'

import AssetsSecuredSection from './assetsSecuredSection'

export default function ClaimsPage() {
  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-4 pt-24 sm:p-24 md:pt-40">
    //   <div className="z-10  w-full max-w-5xl items-start justify-between gap-4 space-y-10 text-sm md:flex md:space-y-0 ">
    //     <Suspense>
    //       <PriceTable />
    //     </Suspense>
    <>
      <div className="flex flex-col pt-4 md:basis-1/3">
        <div className="flex w-full flex-col space-y-4 rounded-xl border-[#d1d1d1] p-8 md:border ">
          <h2 className="text-2xl font-medium">Bridge.vETH currency</h2>
          <ol className="space-y-1.5 text-[10px] font-medium text-white md:text-xs">
            <li className="w-fit rounded-md bg-bluePrimary px-2 py-0.5 ">
              100% BACKED CURRENCY
            </li>
            <li className="w-fit rounded-md bg-[#454A75] px-2 py-0.5 ">
              LIQUIDITY POOL AMM
            </li>
            <li className="w-fit rounded-md bg-[#DE7800] px-2 py-0.5 ">
              VRSC - ETH - DAI - MKR
            </li>
            <li className="w-fit rounded-md bg-[#068006] px-2 py-0.5 ">
              ACCRUES FEES
            </li>
          </ol>
          <p className="text-[#444]">
            Bridge.vETH is a 100% backed currency with 4 currencies in its
            reserves (VRSC, ETH, DAI, MKR). It’s also an automated market maker
            (AMM) with which you can convert all four currencies in all
            directions, and also convert them into Bridge.vETH.
          </p>
          <p className="text-[#444]">
            The Bridge.vETH currency function is to make the bridging of assets
            simple. From wherever side on the bridge you send it converts the
            fees that you need seamlessly.
          </p>
          <p className="text-[#444]">
            The value of Bridge.vETH increases relative to its reserves when
            fees or interest (Dai Savings Rate) are added to the reserves
            without there being new Bridge.vETH minted.
          </p>
          <Link
            isExternal
            href="https://docs.verus.io/eth-bridge/#bridge-veth-currency"
            showAnchorIcon
            className="text-bluePrimary"
          >
            All Bridge.vETH fees
          </Link>
        </div>
        <div className="p-8 md:hidden">
          <AssetsSecuredSection />
        </div>
        <div className="mt-6 space-y-1.5 px-8 md:px-0">
          <Link
            isExternal
            showAnchorIcon
            className="w-full  justify-between rounded-lg border border-[#C9C9C9] p-5"
            href="https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63"
          >
            <div className="flex items-center space-x-2.5">
              <div className="rounded-md bg-bluePrimary p-2">
                <Icons.clipboard
                  className="text-white"
                  height={20.5}
                  width={20.5}
                />
              </div>
              <p className="text-black md:font-medium">Bridge contract</p>
            </div>
          </Link>
          <Link
            isExternal
            showAnchorIcon
            className="w-full  justify-between rounded-lg border border-[#C9C9C9] p-5"
            href="https://etherscan.io/token/0xbc2738ba63882891094c99e59a02141ca1a1c36a"
          >
            <div className="flex items-center space-x-2.5">
              <div className="rounded-md bg-bluePrimary p-2">
                <Icons.clipboard
                  className="text-white"
                  height={20.5}
                  width={20.5}
                />
              </div>
              <p className="text-black md:font-medium">VRSC token address</p>
            </div>
          </Link>
          <Link
            isExternal
            showAnchorIcon
            className="w-full  justify-between rounded-lg border border-[#C9C9C9] p-5"
            href="https://etherscan.io/token/0xE6052Dcc60573561ECef2D9A4C0FEA6d3aC5B9A2"
          >
            <div className="flex items-center space-x-2.5">
              <div className="rounded-md bg-bluePrimary p-2">
                <Icons.clipboard
                  className="text-white"
                  height={20.5}
                  width={20.5}
                />
              </div>
              <p className="text-black md:font-medium">
                Bridge.vETH token address
              </p>
            </div>
          </Link>
        </div>
      </div>
    </>
    //   </div>
    // </main>
  )
}