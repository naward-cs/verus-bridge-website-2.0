/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'

import React from 'react'
import * as dn from 'dnum'
import {useFormContext} from 'react-hook-form'
import {formatEther} from 'viem'
import {useAccount} from 'wagmi'

import {ETH_FEES, ETHaddress} from '@/config/constants'
import {useFormValues} from '@/lib/hooks/form'
import {useERC20Balances} from '@/lib/hooks/wagmi/useErc20Balance'
import {useGaseRate} from '@/lib/hooks/wagmi/useGaseRate'
import {isETHAddress} from '@/lib/utils'

const MaxButton = ({tokenList}: {tokenList: TokenList[]}) => {
  const {isConnected} = useAccount()
  const {setValue} = useFormContext()
  const {fromToken, toAddress} = useFormValues()
  const erc20Address = fromToken?.erc20address
    ? fromToken.erc20address
    : tokenList.find((t) => t.value === 'ETH')?.erc20address

  const balance = useERC20Balances(erc20Address)
  const gas = useGaseRate()
  const gasPrice = toAddress
    ? isETHAddress(toAddress)
      ? formatEther(BigInt(gas.WEICOST))
      : ETH_FEES.ETH
    : ETH_FEES.ETH
  let maxAmount = '0'
  if (balance && gasPrice) {
    if (erc20Address !== ETHaddress) {
      //@ts-ignore
      maxAmount = dn.format([balance.value, balance.decimals])
    } else {
      //@ts-ignore
      maxAmount = dn.format(dn.sub([balance.value, balance.decimals], gasPrice))
    }
  }
  if (!isConnected) return null
  return (
    <div className="flex items-center justify-end space-x-2">
      <p className="text-sm">
        Balance:{' '}
        {Intl.NumberFormat('en-US', {
          style: 'decimal',
          minimumFractionDigits: 2,
          maximumFractionDigits: 8,
        }).format(Number(maxAmount))}{' '}
        {fromToken?.value}
      </p>
      <button
        // eslint-disable-next-line no-console
        onClick={(e) => {
          e.preventDefault()
          setValue('fromAmount', parseFloat(maxAmount))
        }}
        className="rounded-md border border-black bg-[#CECECE] p-1 text-xs"
      >
        MAX
      </button>
    </div>
  )
}

export default MaxButton
