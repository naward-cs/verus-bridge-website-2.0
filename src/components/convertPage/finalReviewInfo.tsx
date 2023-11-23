'use client'

import React from 'react'

import {useBridgeInfo} from '@/lib/hooks/verus'

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
  const {bridgeInfo} = useBridgeInfo()

  //two different ways to Bridge.vETH or from Bridge.vETH format
  if (formValues.fromToken.label.toLowerCase() === 'bridge.veth') {
    const tokenAmount = ConvertTokenToBridgeToken(
      formValues.toToken.currency.toLowerCase(),
      bridgeInfo?.list
    )?.amount
    return (
      <div className="flex-col space-y-2 rounded-lg bg-[#DDD] p-4">
        <div className="flex flex-col items-center justify-between gap-1 ">
          <p className="w-full text-[#808080] ">Current Bridge Information</p>
          <div className=" flex w-full items-center justify-between pr-3">
            <p>{formValues.toToken.currency} in reserves</p>
            <p>
              {(tokenAmount && (
                <>
                  {Intl.NumberFormat('en-US', {
                    style: 'decimal',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 3,
                  }).format(tokenAmount)}{' '}
                  {formValues.toToken.currency}
                </>
              )) ||
                'Loading...'}
            </p>
          </div>
          <div className=" flex w-full items-center justify-between pr-3">
            <p>Bridge.vETH supply</p>
            <p>
              {(bridgeInfo &&
                Intl.NumberFormat('en-US', {
                  style: 'decimal',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 3,
                }).format(bridgeInfo.bridge.amount)) ||
                'Error'}
            </p>
          </div>
        </div>
      </div>
    )
  } else if (formValues.toToken.value === 'bridgeBridge') {
    const tokenAmount = ConvertTokenToBridgeToken(
      formValues.fromToken.value.toLowerCase(),
      bridgeInfo?.list
    )?.amount
    return (
      <div className="flex-col space-y-2 rounded-lg bg-[#DDD] p-4">
        <div className="flex flex-col items-center justify-between gap-1 ">
          <p className="w-full text-[#808080] ">Current Bridge Information</p>
          <div className=" flex w-full items-center justify-between pr-3">
            <p>{formValues.fromToken.value} in reserves</p>
            <p>
              {(tokenAmount && (
                <>
                  {Intl.NumberFormat('en-US', {
                    style: 'decimal',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 3,
                  }).format(tokenAmount)}{' '}
                  {formValues.fromToken.value}
                </>
              )) ||
                'Loading...'}
            </p>
          </div>
          <div className=" flex w-full items-center justify-between pr-3">
            <p>Bridge.vETH supply</p>
            <p>
              {(bridgeInfo &&
                Intl.NumberFormat('en-US', {
                  style: 'decimal',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 3,
                }).format(bridgeInfo.bridge.amount)) ||
                'Loading...'}
            </p>
          </div>
        </div>
      </div>
    )
  } else {
    const fromTokenAmount = ConvertTokenToBridgeToken(
      formValues.fromToken.value.toLowerCase(),
      bridgeInfo?.list
    )?.amount
    const toTokenAmount = ConvertTokenToBridgeToken(
      formValues.toToken.currency.toLowerCase(),
      bridgeInfo?.list
    )?.amount
    return (
      <div className="flex-col space-y-2 rounded-lg bg-[#DDD] p-4">
        <div className="flex flex-col items-center justify-between gap-1 ">
          <p className="w-full text-[#808080] ">Current Bridge Information</p>
          <div className=" flex w-full items-center justify-between pr-3">
            <p>{formValues.fromToken.value} in reserves</p>
            <p>
              {(fromTokenAmount && (
                <>
                  {Intl.NumberFormat('en-US', {
                    style: 'decimal',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 3,
                  }).format(fromTokenAmount)}{' '}
                  {formValues.fromToken.value}
                </>
              )) ||
                'Loading...'}
            </p>
          </div>
          <div className=" flex w-full items-center justify-between pr-3">
            <p>{formValues.toToken.currency} in reserves</p>
            <p>
              {(toTokenAmount && (
                <>
                  {Intl.NumberFormat('en-US', {
                    style: 'decimal',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 3,
                  }).format(toTokenAmount)}{' '}
                  {formValues.toToken.currency}
                </>
              )) ||
                'Loading...'}
            </p>
          </div>
        </div>
      </div>
    )
  }
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
