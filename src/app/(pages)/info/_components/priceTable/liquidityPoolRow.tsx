'use client'

import Image from 'next/image'
import {Skeleton, Tooltip} from '@nextui-org/react'

import {useBridgeInfo} from '@/lib/hooks/verus/useSelectBridgeInfo'
import {Icons} from '@/components/shared/icons'

import {DaiTooltip, SupplyToolTip} from '../tooltips'

const LiquidityPoolRow = () => {
  const {bridge, isLoading} = useBridgeInfo()

  return (
    <div className="space-y-1">
      <div className="grid grid-cols-4 px-2 text-[10px] font-medium text-[#595959] sm:text-xs">
        <p className="col-span-2">Liquidity pool</p>
        <p className="flex items-center justify-end">
          Supply
          <Tooltip content={SupplyToolTip()} delay={1000} isDismissable={true}>
            <span className="cursor-help">
              <Icons.info className="ml-1 text-[#81A0E2]" height={12} />
            </span>
          </Tooltip>
        </p>
        <p className="flex items-center justify-end ">
          Price in DAI
          <Tooltip
            radius="sm"
            content={DaiTooltip()}
            delay={1000}
            isDismissable={true}
          >
            <span className="cursor-help">
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
        <Skeleton isLoaded={!isLoading} className="my-auto rounded-md">
          <p className="text-right text-xs opacity-[.54] md:text-sm">
            {Intl.NumberFormat('en-US', {
              style: 'decimal',
              maximumFractionDigits: 0,
            }).format(bridge?.amount || 0)}
          </p>
        </Skeleton>
        <Skeleton isLoaded={!isLoading} className="my-auto rounded-md">
          <p className=" text-right">
            {Intl.NumberFormat('en-US', {
              style: 'decimal',
              maximumFractionDigits: 3,
              minimumFractionDigits: 3,
            }).format(bridge?.daiPrice || 0)}
          </p>
        </Skeleton>
      </div>
    </div>
  )
}

export default LiquidityPoolRow
