'use client'

import React from 'react'
import {useFormContext} from 'react-hook-form'

import {useBalances} from '@/lib/hooks/balance'
import {useIsMounted} from '@/lib/hooks/mounted'

const MaxAmountButton = () => {
  const {setValue} = useFormContext()
  const isMounted = useIsMounted()
  const {isEth, isConnected, EthBalance, ErcBalance} = useBalances()

  //trying to prevent NaN displays
  if (!isConnected || !isMounted || !EthBalance) return null

  return (
    <div className="flex items-center justify-end space-x-2">
      <p className="text-sm">
        Balance:{' '}
        {Intl.NumberFormat('en-US', {
          style: 'decimal',
          minimumFractionDigits: 2,
          maximumFractionDigits: 8,
        }).format(
          isEth ? Number(EthBalance?.formatted) : Number(ErcBalance?.formatted)
        )}{' '}
        {isEth ? EthBalance?.symbol : ErcBalance?.symbol}
      </p>
      <button
        // eslint-disable-next-line no-console
        onClick={(e) => {
          e.preventDefault()
          setValue(
            'fromAmount',
            isEth
              ? Number(EthBalance?.formatted)
                  .toFixed(8)
                  .toString()
              : Number(ErcBalance?.formatted)
                  .toFixed(8)
                  .toString()
          )
        }}
        className="rounded-md border border-black bg-[#CECECE] p-1 text-xs"
      >
        MAX
      </button>
    </div>
  )
}

export default MaxAmountButton
