'use client'

import React, {useState} from 'react'
import {Skeleton, Tooltip} from '@nextui-org/react'
import BigNumber from 'bignumber.js'
import {formatEther} from 'viem'

import {ETH_FEES} from '@/config/constants'
import {useConvesionRate} from '@/lib/hooks/verus/useConvesionRate'
import {useGaseRate} from '@/lib/hooks/wagmi/useGaseRate'
import {useMarket} from '@/lib/hooks/web/useMarketData'
import {isETHAddress} from '@/lib/utils'
import {Icons} from '@/components/shared/icons'

export const FinalConvertRate = ({
  fromToken,
  toToken,
  toAddress,
}: {
  fromToken: FromList
  toToken: DestinationOption
  toAddress: string
}) => {
  const {data: conversionRate, isLoading} = useConvesionRate({
    fromToken,
    toToken,
  })
  const [reverse, setReverse] = useState(false)
  const {data: marketInfo} = useMarket('eth')
  const gas = useGaseRate()

  const EthGasPrice = new BigNumber(formatEther(BigInt(gas.WEICOST)))
    .times(new BigNumber(marketInfo || 0))
    .decimalPlaces(2)
    .toString()
  const VerusGasPrice = new BigNumber(ETH_FEES.ETH)
    .times(new BigNumber(marketInfo || 0))
    .decimalPlaces(2)
    .toString()

  const gasPrice = toAddress
    ? isETHAddress(toAddress)
      ? EthGasPrice
      : VerusGasPrice
    : VerusGasPrice

  if (!fromToken && !toToken) return null
  return (
    <div className=" flex items-center justify-between rounded-lg border border-gray-600 px-5 py-4 text-sm md:text-base">
      <span onClick={() => setReverse(!reverse)} className="cursor-pointer">
        {isLoading && <Skeleton className="w-48 rounded-lg">0.00</Skeleton>}
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
              <Icons.gas className="mx-1.5 h-5 text-[#A5A5A5]  md:h-6" />≈{' '}
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
