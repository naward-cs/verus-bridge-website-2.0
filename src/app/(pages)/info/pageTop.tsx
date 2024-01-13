import React from 'react'
import Image from 'next/image'
import {Link} from '@nextui-org/react'

const List = ({text}: {text: string}) => (
  <div className="flex">
    <div className="relative float-left mr-4 mt-1 h-4 w-4 shrink-0">
      <Image src="/images/check-mark-button.png" fill alt="check mark" />
    </div>
    <p>{text}</p>
  </div>
)

const PageTop = () => {
  return (
    <>
      <div
        className="h-52 bg-white bg-[length:394px_131px] bg-right-bottom bg-no-repeat px-9 py-8 font-medium shadow-lg md:h-64 md:rounded-xl md:bg-auto md:px-[74px] md:py-16"
        style={{backgroundImage: `url('/images/bridge-img-v2-info.png')`}}
      >
        <p className="text-[10px] opacity-[37%] md:text-xs  ">
          FULLY OPERATIONAL SINCE OCT 20, 2023
        </p>
        <p className="max-w-[200px] text-xl tracking-tighter text-bluePrimary md:max-w-xs md:text-3xl">
          The non-custodial & trustless Verus-Ethereum Bridge.
        </p>
      </div>
      <div className="flex flex-col-reverse gap-20 border-[#d1d1d1] px-12 py-14 md:flex-row md:gap-10  md:rounded-xl md:border lg:gap-20 ">
        <div className="mx-auto max-w-sm md:mx-0">
          <p>
            The Verus-Ethereum Bridge allows for the secure transfer and
            conversion of cryptocurrencies between Verus and Ethereum.
          </p>
          <br />
          <p>
            It’s trustless and non-custodial, meaning it doesn’t require users
            to trust a third party with their funds, and no single entity has
            control over the assets being transferred.
          </p>
          <br />
          <Link href="https://docs.verus.io/eth-bridge" isExternal>
            Learn more on docs.verus.io/eth-bridge
          </Link>
        </div>
        <div className="mx-auto flex w-96 shrink-0 flex-col space-y-4  text-base font-medium md:mx-0">
          <List text="Fully trustless and non-custodial" />
          <List text="Verified by consensus (miners and stakers)" />
          <List text="Bridge currency (Bridge.vETH) is a liquidity pool & accrues fees" />
          <List
            text="Bridge to Verus to use native DeFi with low fees (min. 0.025%,
            max. 0.05%) & L1 security"
          />
        </div>
      </div>
    </>
  )
}

export default PageTop
