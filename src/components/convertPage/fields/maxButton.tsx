'use client'

import React from 'react'
import {useFormContext} from 'react-hook-form'
import {formatEther, parseEther} from 'viem'

import {ETH_FEES} from '@/config/constants'
import {useBalances} from '@/lib/hooks/balance'
import {useFormValues} from '@/lib/hooks/formValues'
import {useGasRate} from '@/lib/hooks/gasRate'
import {useIsMounted} from '@/lib/hooks/mounted'
import {isETHAddress} from '@/lib/utils/rules'

const MaxAmountButton = () => {
  const {setValue} = useFormContext()
  const isMounted = useIsMounted()
  const {isEth, isConnected, EthBalance, ErcBalance} = useBalances()
  const {toAddress} = useFormValues()
  const {data: txGas} = useGasRate()
  let maxEthValue = EthBalance?.value || 0n
  if (toAddress) {
    if (isETHAddress(toAddress)) {
      maxEthValue = maxEthValue - BigInt(txGas?.WEICOST || 0n)
    } else {
      maxEthValue = maxEthValue - parseEther(ETH_FEES.ETH)
    }
  }

  //trying to prevent NaN displays
  //FIXME: show after wallet is connected and has balance
  if (!isConnected || !isMounted || !EthBalance ) return null

  return (
    <div className="flex items-center justify-end space-x-2">
      <p className="text-sm">
        Balance:{' '}
        {Intl.NumberFormat('en-US', {
          style: 'decimal',
          minimumFractionDigits: 2,
          maximumFractionDigits: 8,
        }).format(
          isEth
            ? Number(formatEther(maxEthValue))
            : Number(ErcBalance?.formatted)
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
              ? parseFloat(Number(formatEther(maxEthValue)).toFixed(8)).toString()
              : parseFloat(Number(ErcBalance?.formatted).toFixed(8)).toString()
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
