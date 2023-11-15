import React, {useEffect, useState} from 'react'
import {formatEther} from '@ethersproject/units'
import BigNumber from 'bignumber.js'
import {useFormContext} from 'react-hook-form'

import {useFormValues} from '@/lib/hooks/formValues'
import {useGasRate} from '@/lib/hooks/gasRate'
import {useMarketData} from '@/lib/hooks/marketInfo'
import {useGetCurrencyRate} from '@/lib/hooks/verus'
import {Icons} from '@/components/shared/icons'

const ConvertRate = () => {
  const {setValue} = useFormContext()
  const {fromToken, toToken} = useFormValues()
  const [gasPrice, setGasPrice] = useState<string>('0')
  const {data: conversionRate} = useGetCurrencyRate(fromToken, toToken)
  const {data: gas} = useGasRate()
  const {data: marketInfo} = useMarketData()

  useEffect(() => {
    if (gas && marketInfo) {
      setGasPrice(
        new BigNumber(formatEther(gas.WEICOST))
          .times(new BigNumber(marketInfo.toString()))
          .decimalPlaces(2)
          .toString()
      )
    }
    if (gas) {
      setValue('gasPrice', gas)
    }
  }, [marketInfo, gas, setValue])
  if (!toToken) return null
  return (
    <div className=" flex items-center justify-between rounded-lg border border-gray-600 px-5 py-4 text-sm md:text-base">
      <span>
        {conversionRate && (
          <>
            1 {conversionRate?.destination} ≈{' '}
            {Number(conversionRate?.value).toFixed(4)} {fromToken.value}
          </>
        )}
      </span>
      <span className="flex">
        {gas && (
          <>
            <Icons.gas className="mr-1.5 h-6 w-6 text-[#A5A5A5]" />≈{' '}
            {Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(Number(gasPrice))}
          </>
        )}
      </span>
    </div>
  )
}

export default ConvertRate
