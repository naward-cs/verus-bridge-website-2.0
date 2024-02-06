'use client'

import {useQuery} from '@tanstack/react-query'
import {useFormContext} from 'react-hook-form'

import {
  getBlockHeight,
  getConversionRate,
  getDestinationList,
} from '@/lib/server/verusQueries'

import {isETHAddress} from '../utils/rules'
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
      const label = `${token.value}`
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
    label: 'Bridge.vETH',
    iaddress: bridgeToken.iaddress,
    currency: 'VBRID',
  }

  return list
}

export const useGetCurrencyRate = (
  fromToken: FromList,
  toToken: DestinationOption,
  fromAmount?: number
) => {
  const chainId = NetworkChain()
  const {bridge, bridgeList} = useGetTokens()
  const {setValue, getValues} = useFormContext()

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
      //TODO: figure a way to remove this and support the dynamics
      if (data?.value) {
        setValue('sendOnly', false)
      } else {
        setValue('sendOnly', true)
        const toAddress = getValues('toAddress')
        if (isETHAddress(toAddress)) {
          setValue('toAddress', '')
        }
      }
    },
  })
}

export const useBridgeInfo = (MarketInfo = false) => {
  const chainID = NetworkChain()
  const {bridge} = useGetTokens()
  const chain = MarketInfo ? 1 : chainID
  //TODO determine if there is a way to get bridge from useGetTokens forcing chain 1 to make this dynamic
  const bridgeAddress = MarketInfo
    ? 'i3f7tSctFkiPpiedY8QR5Tep9p4qDVebDx'
    : bridge
  const {data: bridgeInfo} = useQuery({
    queryKey: ['mainBridgeInfo', chain, bridgeAddress],
    queryFn: () => getDestinationList(chain, bridgeAddress!),
    staleTime: 60_000, //stale for a minute
    refetchInterval: 300_000, //every 5 minutes
    select(data) {
      try {
        const currencyNames = data?.result?.currencynames
        const currencies = data?.result?.bestcurrencystate?.reservecurrencies
        const supply = data?.result?.bestcurrencystate?.supply
        const count = currencies?.length || 4
        const daiKey = Object.keys(currencyNames || {}).find(
          (key) =>
            currencyNames !== undefined && currencyNames[key] === 'DAI.vETH'
        )

        const daiAmount =
          currencies?.find((c) => c.currencyid === daiKey)?.reserves || 0
        //get price of each reserve coin
        //(reserve DAI / reserve currency ) = price of reserve currency in DAI
        //(reserve DAI * count ) / supply = price of Bridge.vETH in DAI
        const list: CoinList[] | undefined = currencies?.map((token) => {
          const name = currencyNames![token.currencyid]
          return {
            name,
            amount: token.reserves,
            daiPrice: daiAmount / token.reserves,
            value: name.split('.')[0].toLowerCase(),
          }
        })
        const bridge: CoinList = {
          name: 'Bridge.vEth',
          amount: supply!,
          daiPrice: (daiAmount * count) / supply!,
        }

        return {list, bridge}
      } catch {
        throw new Error('unable to get converstion list')
      }
    },
  })
  return {bridgeInfo}
}
