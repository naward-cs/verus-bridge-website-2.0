'use client' 

import React, { Suspense } from 'react' 
import Image from 'next/image'
import { Tooltip } from '@nextui-org/tooltip' 



import { useBridgeInfo } from '@/lib/hooks/verus' 

import {Icons} from '../shared/icons'
import PriceRow from './priceRow'
import PriceRowSkeleton from './priceRowSkeleton'

const DaiTooltip = () => {
  return (
    <div className="max-w-sm">
      <p>This is the last protocol price for the Bridge.vETH currency.</p>
    </div>
  )
}

const SupplyToolTip = () => {
  return (
    <div className="max-w-sm space-y-2">
      <p>
        During the preconversion timeframe there is a fixed initial supply. This
        initial supply will be distributed by the protocol once the currency is
        launched.
      </p>

      <p>
        After the launch the supply is dynamic since people can convert to it,
        and out of it.
      </p>
    </div>
  )
}

const ReserveDaiTip = () => {
  return (
    <div className="max-w-sm space-y-2">
      <p>The protocol price of the reserves in DAI.</p>
    </div>
  )
}

const MarketTip = () => {
  return (
    <div>
      <p>
        The protocol price compared to CoinGecko market price (source:
        coinpaprika.com).
      </p>
    </div>
  )
}

const PriceTable = () => {
  const {bridgeInfo} = useBridgeInfo(true)

  return (
    <div className="flex flex-col space-y-14 md:basis-7/12">
      <div className="space-y-1">
        <div className="grid grid-cols-4 px-2 text-[10px] font-medium text-[#595959] sm:text-xs">
          <p className="col-span-2">Liquidity pool</p>
          <p className="flex items-center justify-end">
            Supply
            <Tooltip content={SupplyToolTip()}>
              <span>
                <Icons.info className="ml-1 text-[#81A0E2]" height={12} />
              </span>
            </Tooltip>
          </p>
          <p className="flex items-center justify-end ">
            Price in DAI
            <Tooltip radius="sm" content={DaiTooltip()}>
              <span>
                <Icons.info className="ml-1 text-[#81A0E2]" height={12} />
              </span>
            </Tooltip>
          </p>
        </div>
        <div className="grid grid-cols-4 rounded-lg border border-bluePrimary bg-bluePrimary bg-opacity-[0.08] p-5 text-xs font-medium text-bluePrimary sm:text-base md:text-lg lg:text-xl">
          <p className="col-span-2 flex items-center text-left text-black">
            <Image
              src="/logos/bridge-logo.svg"
              alt="bridge logo"
              height={26}
              width={26}
              className="mr-1.5 rounded-full"
            />
            Bridge.vETH
          </p>
          <p className="text-right text-xs opacity-[.54] md:text-sm">
            {Intl.NumberFormat('en-US', {
              style: 'decimal',
              maximumFractionDigits: 0,
            }).format(bridgeInfo?.bridge.amount || 0)}
          </p>
          <p className=" text-right">
            {Intl.NumberFormat('en-US', {
              style: 'decimal',
              maximumFractionDigits: 3,
              minimumFractionDigits: 3,
            }).format(bridgeInfo?.bridge.daiPrice || 0)}
          </p>
        </div>
      </div>
      <div className="space-y-1">
        <div className="grid grid-cols-4 items-end px-2 text-[10px] font-medium leading-normal text-[#595959] sm:text-xs">
          <p>
            Bridge.vETH
            <br />
            reserve currencies
          </p>
          <p className="self-end text-right">In reserves</p>
          <p className="flex items-center justify-end self-end">
            Price in DAI
            <Tooltip content={ReserveDaiTip()}>
              <span>
                <Icons.info className="ml-1 text-[#81A0E2]" height={12} />
              </span>
            </Tooltip>
          </p>
          <p className=" flex items-end justify-end ">
            Compared to
            <br />
            Coinpaprika
            <Tooltip radius="sm" size="sm" content={MarketTip()}>
              <span>
                <Icons.info className="mb-0.5 text-[#81A0E2]" height={12} />
              </span>
            </Tooltip>
          </p>
        </div>

        {bridgeInfo?.list &&
          bridgeInfo?.list.map((c) => (
            <Suspense key={c.name} fallback={<PriceRowSkeleton />}>
              <PriceRow {...c} />
            </Suspense>
          ))}
      </div>
      <div className="grid grid-cols-4 items-center rounded-lg border border-bluePrimary bg-bluePrimary/5 p-5  text-base  font-medium text-bluePrimary md:text-xl">
        <p className="col-span-2 text-left ">Total value of liquidity</p>
        <p className="col-span-2 text-right ">
          {Intl.NumberFormat('en-US', {
            style: 'decimal',

            minimumFractionDigits: 2,
            maximumFractionDigits: 3,
          }).format(
            (bridgeInfo?.bridge.amount || 0) *
              (bridgeInfo?.bridge.daiPrice || 0)
          )}{' '}
          DAI
        </p>
      </div>
    </div>
  )
}

export default PriceTable