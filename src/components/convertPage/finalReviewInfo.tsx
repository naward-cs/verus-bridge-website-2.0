'use client'

import React, {useState} from 'react'
import {Tooltip} from '@nextui-org/react'

import {useBridgeInfo} from '@/lib/hooks/verus'
import {isETHAddress} from '@/lib/utils/rules'

import {Icons} from '../shared/icons'
import {WarnContent} from './fields/submit'

const ConvertTokenToBridgeToken = (token: string, bridgeList?: CoinList[]) => {
  switch (token) {
    case 'vrsc':
      return bridgeList?.filter(
        (t) => t.value === 'vrsc' || t.value === 'vrsctest'
      )[0]
    case 'eth':
      return bridgeList?.filter((t) => t.value === 'veth')[0]
    case 'dai':
      return bridgeList?.filter((t) => t.value === 'dai')[0]
    case 'mkr':
      return bridgeList?.filter((t) => t.value === 'mkr')[0]
    default:
      return {name: token, amount: 0, daiPrice: 0, value: token}
  }
}

const FinalReviewInfo = (formValues: ConvertFormData) => {
  const [isOpen, setIsOpen] = useState(false)
  const {bridgeInfo} = useBridgeInfo()
  let fromTokenAmount: number | undefined
  let toTokenAmount: number | undefined
  let toFromBridge: 'to' | 'from' | 'neither' = 'neither'
  //two different ways to Bridge.vETH or from Bridge.vETH format
  if (formValues.fromToken.label.toLowerCase() === 'bridge.veth') {
    toFromBridge = 'from'
    toTokenAmount = ConvertTokenToBridgeToken(
      formValues.toToken.currency.toLowerCase(),
      bridgeInfo?.list
    )?.amount
  } else if (formValues.toToken.value === 'bridgeBridge') {
    toFromBridge = 'to'
    fromTokenAmount = ConvertTokenToBridgeToken(
      formValues.fromToken.value.toLowerCase(),
      bridgeInfo?.list
    )?.amount
  } else {
    fromTokenAmount = ConvertTokenToBridgeToken(
      formValues.fromToken.value.toLowerCase(),
      bridgeInfo?.list
    )?.amount
    toTokenAmount = ConvertTokenToBridgeToken(
      formValues.toToken.currency.toLowerCase(),
      bridgeInfo?.list
    )?.amount
  }

  return (
    <div className="rounded-lg border border-[#999] ">
      <div className="flex-col space-y-2 p-4">
        <p className="text-xs font-medium text-[#808080]">
          Current Bridge.vETH (liquidity pool) information
        </p>
        <div className="flex items-center justify-between">
          <p>
            <span className="font-medium">
              {toFromBridge === 'from'
                ? 'Bridge.vETH supply'
                : `${formValues.fromToken.value} in reserves`}
            </span>
          </p>
          <p className="font-medium">
            {toFromBridge === 'from'
              ? bridgeInfo?.bridge.amount
                ? Intl.NumberFormat('en-US', {
                    style: 'decimal',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 3,
                  }).format(bridgeInfo.bridge.amount)
                : 'Error'
              : fromTokenAmount
                ? Intl.NumberFormat('en-US', {
                    style: 'decimal',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 3,
                  }).format(fromTokenAmount)
                : 'Loading...'}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p>
            <span className="font-medium">
              {toFromBridge === 'to'
                ? 'Bridge.vETH supply'
                : `${formValues.toToken.currency} in reserves`}
            </span>
          </p>
          <p className="font-medium">
            {toFromBridge === 'to'
              ? bridgeInfo?.bridge.amount
                ? Intl.NumberFormat('en-US', {
                    style: 'decimal',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 3,
                  }).format(bridgeInfo.bridge.amount)
                : 'Error'
              : toTokenAmount
                ? Intl.NumberFormat('en-US', {
                    style: 'decimal',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 3,
                  }).format(toTokenAmount)
                : 'Loading...'}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between border-t-1 border-[#999] p-4 text-xs">
        <div className="flex items-center space-x-1 ">
          <Icons.clock height={24} opacity="37%" />
          <p>Ethereum</p>
          <Icons.rightArrow width={8} />
          <p>Verus</p>
          {isETHAddress(formValues.toAddress) && (
            <>
              <Icons.rightArrow width={8} />
              <p>Ethereum</p>
            </>
          )}
        </div>

        <p>
          <span className="font-medium">
            up to {isETHAddress(formValues.toAddress) ? ' 120 ' : ' 60 '} mins
          </span>{' '}
          <Tooltip
            showArrow
            placement="left"
            content={WarnContent()}
            isOpen={isOpen}
            onOpenChange={(open) => setIsOpen(open)}
            delay={1000}
            isDismissable={true}
          >
            <span
              onClick={() => setIsOpen(!isOpen)}
              className="font-medium text-bluePrimary cursor-help"
            >
              Why?
            </span>
          </Tooltip>
        </p>
      </div>
    </div>
  )
}

export default FinalReviewInfo

// — if to Verus network or back to ETH
// DAI -> VRSC (DAI in reserves, VRSC in reserves)
// DAI -> ETH (DAI in reserves, ETH in reserves)
// DAI -> MKR (DAI in reserves, MKR in reserves)
// DAI -> Bridge.vETH (DAI in reserves, Bridge.vETH supply)

// — if to Verus network or back to ETH
// ETH -> VRSC (ETH in reserves, VRSC in reserves)
// ETH -> DAI (ETH in reserves, DAI in reserves)
// ETH -> MKR (ETH in reserves, MKR in reserves)
// ETH -> Bridge.vETH (ETH in reserves, Bridge.vETH supply)

// — if to Verus network or back to ETH
// MKR -> VRSC (MKR in reserves, VRSC in reserves)
// MKR -> DAI (MKR in reserves, DAI in reserves)
// MKR -> ETH (MKR in reserves, ETH in reserves)
// MKR -> Bridge.vETH (MKR in reserves, Bridge.vETH supply)

// — if to Verus network or back to ETH
// VRSC -> ETH (VRSC in reserves, ETH in reserves)
// VRSC -> DAI (VRSC in reserves, DAI in reserves)
// VRSC -> MKR (VRSC in reserves, MKR in reserves)
// VRSC -> Bridge.vETH (VRSC in reserves, Bridge.vETH supply)

// — if to Verus network or back to ETH
// VBRID (=Bridge.vETH) -> ETH (ETH in reserves, Bridge.vETH supply)
// VBRID -> DAI (DAI in reserves, Bridge.vETH supply)
// VBRID -> MKR (MKR in reserves, Bridge.vETH supply)
// VBRID -> VRSC (VRSC in reserves, Bridge.vETH supply)

// — if to Verus network
// ETH -> ETH.vETH (no stats)
// DAI -> DAI.vETH (no stats)
// MKR -> MKR.vETH (no stats)
// VRSC -> VRSC (no stats)
// Bridge.vETH (VBRID) -> Bridge.vETH (no stats)
