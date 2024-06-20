'use client'

import {useQuery} from '@tanstack/react-query'

import {bridgeInfoQuery} from '@/lib/queries/bridgeInfo'

export const useBridgeInfo = () => {
  const {data, isLoading} = useQuery(bridgeInfoQuery())
  try {
    const currencyNames = data?.currencynames
    const currencies = data?.bestcurrencystate?.reservecurrencies
    const supply = data?.bestcurrencystate?.supply
    const count = currencies?.length || 4
    const daiKey = Object.keys(currencyNames || {}).find(
      (key) => currencyNames !== undefined && currencyNames[key] === 'DAI.vETH'
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

    return {list, bridge, isLoading}
  } catch {
    throw new Error('unable to get converstion list')
  }
}
