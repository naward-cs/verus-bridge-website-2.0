'use client'

import React, {Suspense} from 'react'

import {Icons} from '../shared/icons'
import {useAddressContext} from './addressContext'
import PubkeyFees from './pubkeyFees'
import RefundsAvailable from './refundsAvailable'
import VerusFees from './verusFees'

const AvailableClaims = () => {
  const {addressInfo} = useAddressContext()
  //TODO: need to make this auto generate

  return (
    <>
      <div className="flex flex-col space-y-1">
        <p className="text-center text-[#686868]">Claimable Fees</p>
        <div className="flex items-center justify-between rounded-lg border p-2 shadow-md">
          {addressInfo.addressType === 'pubkey' ? (
            <Suspense>
              <PubkeyFees />
            </Suspense>
          ) : addressInfo.address ? (
            <>
              <Suspense>
                <VerusFees />
              </Suspense>
            </>
          ) : (
            <p>Enter Address to check available</p>
          )}
        </div>
        <div className="flex items-center space-x-2.5 text-[#686868] ">
          <Icons.alertTriangle className="h-full w-4" />
          <p className=" text-xs ">
            Minimum amount claimable is 0.006 ETH to cover import cost.
          </p>
        </div>
        {addressInfo.addressType === 'verus' && (
          <>
            <p className="text-center text-[#686868]">Available Refunds</p>
            <div className="flex items-center justify-between rounded-lg border p-2 shadow-md">
              <RefundsAvailable />
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default AvailableClaims
