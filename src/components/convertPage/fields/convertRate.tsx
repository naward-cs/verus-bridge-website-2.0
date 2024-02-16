import React, {useEffect, useState} from 'react'
import {formatEther} from '@ethersproject/units'
import {Tooltip} from '@nextui-org/react'
import BigNumber from 'bignumber.js'
import {useFormContext} from 'react-hook-form'

import {ETH_FEES} from '@/config/constants'
import {useFormValues} from '@/lib/hooks/formValues'
import {useGasRate} from '@/lib/hooks/gasRate'
import {useMarketData} from '@/lib/hooks/marketInfo'
import {useGetCurrencyRate} from '@/lib/hooks/verus'
import {isETHAddress} from '@/lib/utils/rules'
import {Icons} from '@/components/shared/icons'

const ConvertRate = () => {
  const {setValue} = useFormContext()
  const {fromToken, toToken, toAddress} = useFormValues()
  const [gasPrice, setGasPrice] = useState<string>('0')
  const {data: conversionRate} = useGetCurrencyRate(fromToken, toToken)
  const {data: gas} = useGasRate()
  const {data: marketInfo} = useMarketData()
  const [reverse, setReverse] = useState(false)
  useEffect(() => {
    if (gas && marketInfo) {
      if (toAddress) {
        if (isETHAddress(toAddress)) {
          setGasPrice(
            new BigNumber(formatEther(gas.WEICOST))
              .times(new BigNumber(marketInfo.toString()))
              .decimalPlaces(2)
              .toString()
          )
        } else {
          setGasPrice(
            new BigNumber(ETH_FEES.ETH)
              .times(new BigNumber(marketInfo.toString()))
              .decimalPlaces(2)
              .toString()
          )
        }
      } else {
        setGasPrice(
          new BigNumber(ETH_FEES.ETH)
            .times(new BigNumber(marketInfo.toString()))
            .decimalPlaces(2)
            .toString()
        )
      }
    }
    if (gas) {
      setValue('gasPrice', gas)
    }
  }, [marketInfo, gas, setValue, toAddress])
  if (!toToken) return null
  return (
    <div className=" flex items-center justify-between rounded-lg border border-gray-600 px-5 py-4 text-sm md:text-base">
      <span onClick={() => setReverse(!reverse)} className="cursor-pointer">
        {conversionRate &&
          (reverse ? (
            <>
              1 {conversionRate?.destination} ≈{' '}
              {(1 / Number(conversionRate?.value)).toFixed(4)} {fromToken.value}
            </>
          ) : (
            <>
              1 {fromToken.value} ≈ {Number(conversionRate?.value).toFixed(4)}{' '}
              {conversionRate?.destination}
            </>
          ))}
      </span>
      <Tooltip
        placement="bottom-end"
        content={
          <div className="max-w-xs p-1.5">
            These are the gas fees: how much ETH it costs to interact with the
            Verus-Ethereum Bridge smart contract.
          </div>
        }
        delay={1000}
        isDismissable={true}
      >
        <span className="flex cursor-help">
          {gas && (
            <>
              <Icons.gas className="mr-1.5 h-5 text-[#A5A5A5]  md:h-6" />≈{' '}
              {Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(Number(gasPrice))}
            </>
          )}
        </span>
      </Tooltip>
    </div>
  )
}

export default ConvertRate
