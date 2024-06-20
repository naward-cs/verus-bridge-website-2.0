import Image from 'next/image'

import {Icons} from '@/components/shared/icons'

const List = ({text}: {text: string}) => (
  <div className="flex">
    <div className="relative float-left mr-4 mt-1 size-4 shrink-0">
      <Image src="/images/check-mark-button.png" fill alt="check mark" />
    </div>
    <p className=" max-w-[456px]">{text}</p>
  </div>
)

const PageTop = () => {
  return (
    <>
      <div
        className="space-y-12 bg-white bg-[length:394px_131px] bg-right-bottom bg-no-repeat px-9 pb-28 pt-8 font-medium shadow-lg  md:rounded-xl md:bg-auto md:px-[74px] md:pb-36 md:pt-[47px]"
        style={{backgroundImage: `url('/images/bridge-img-v2-info.png')`}}
      >
        <div className="flex flex-col gap-4 md:flex-row md:justify-between">
          <p className="text-xl tracking-tighter text-bluePrimary  md:text-3xl">
            Verus-Ethereum Bridge
            <br />
            with liquidity pool currency.
          </p>
          <div className="flex  w-fit items-center justify-center gap-[7px] rounded-[10px] border border-[#E3E3E3] bg-[#F9F9F9] p-[10px]  md:gap-[10px]">
            <Icons.clockInverted
              height={'24px'}
              width={'24px'}
              className="shrink-0"
            />
            <p className=" text-[10px] font-medium  leading-3 opacity-[0.37] md:text-xs">
              FULLY OPERATIONAL
              <br />
              SINCE OCT 20, 2023
            </p>
          </div>
        </div>
        <div className="flexshrink-0 mx-auto flex-col space-y-4  text-base font-medium md:mx-0">
          <List text="Fully trustless, decentralized and non-custodial" />
          <List text="Bridge crossings are verified by consensus (miners and stakers)" />
          <List
            text="Bridge.vETH is a currency, a liquidity pool AMM & an asset that 
accrues fees"
          />
          <List
            text="Send Ethereum assets to the Verus network to use native DeFi 
with low fees (min. 0.025%, max. 0.05%) & L1 security (no smart 
contract risk)"
          />
        </div>
      </div>
    </>
  )
}

export default PageTop
