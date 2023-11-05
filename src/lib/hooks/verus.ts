'use client'

import {useQuery} from '@tanstack/react-query'
import {useFormContext} from 'react-hook-form'

import {getBlockHeight, getConversionRate} from '@/lib/server/verusQueries'

import {NetworkChain} from './network'
import {useGetTokens} from './tokens'

import type {primitives} from 'verusid-ts-client'

export const useGetBLockHeight = () => {
  const chainId = NetworkChain()
  return useQuery({
    queryKey: ['blockHeight', chainId],
    queryFn: () => getBlockHeight(chainId),
    cacheTime: 30 * 1000,
    refetchInterval: 60 * 1000,
  })
}

export const createConvertOptionsList = (
  tokenList: TokenList[],
  currencyList: primitives.CurrencyDefinition
) => {
  const list = Object.fromEntries(
    currencyList.currencies.map((k) => {
      const token = tokenList.filter((t) => t.id === k)[0]
      const value = `bridge${token.value}`
      const label = `Convert to ${token.value}`
      const currency = token.value
      return [k, {id: k, value, label, iaddress: token.iaddress, currency}]
    })
  )
  const bridgeToken = tokenList.filter(
    (t) => t.id === currencyList.currencyid
  )[0]

  list[currencyList.currencyid] = {
    id: currencyList.currencyid,
    value: 'bridgeBridge',
    label: 'Convert to Bridge.vETH',
    iaddress: bridgeToken.iaddress,
    currency: 'BETH',
  }

  return list
}

export const useGetCurrencyRate = (
  fromToken: TokenList,
  toToken: DestinationOption,
  fromAmount?: number
) => {
  const chainId = NetworkChain()
  const {bridge, bridgeList} = useGetTokens()
  const {setValue} = useFormContext()
  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [
      'convertRate',
      fromToken?.value,
      toToken?.value,
      chainId,
      fromAmount,
    ],
    queryFn: () =>
      getConversionRate(
        chainId,
        bridge!,
        bridgeList!,
        fromToken,
        toToken,
        fromAmount
      ),
    cacheTime: 30 * 1000,
    refetchInterval: 60 * 1000,
    enabled: !!fromToken && !!toToken,
    onSuccess(data) {
      if (data?.value) {
        setValue('sendOnly', false)
      } else {
        setValue('sendOnly', true)
      }
    },
  })
}
