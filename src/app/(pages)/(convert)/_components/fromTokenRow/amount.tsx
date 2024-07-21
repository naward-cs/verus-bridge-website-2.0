'use client'

import React from 'react'
import {Controller, useFormContext} from 'react-hook-form'
import {formatEther} from 'viem'

import {ETH_FEES} from '@/config/constants'
import {useFormValues} from '@/lib/hooks/form'
import {useERC20Balances} from '@/lib/hooks/wagmi/useErc20Balance'
import {useGaseRate} from '@/lib/hooks/wagmi/useGaseRate'
import {isETHAddress, validateAmount} from '@/lib/utils'
import {Input} from '@/components/form/input'

const Amount = ({tokenList}: {tokenList: TokenList[]}) => {
  const {control} = useFormContext()
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
  return (
    <div className="max-w-xs">
      <Controller
        control={control}
        name="fromAmount"
        rules={{
          required: 'Insert amount',
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          validate: (value) => validateAmount(value, balance, gasPrice),
        }}
        render={({field: {value, onChange}}) => (
          <Input
            aria-label="From Amount"
            type="number"
            lang="en-US"
            color="transparent"
            onValueChange={onChange}
            value={value}
            placeholder="0.00"
          />
        )}
      />
    </div>
  )
}

export default Amount
