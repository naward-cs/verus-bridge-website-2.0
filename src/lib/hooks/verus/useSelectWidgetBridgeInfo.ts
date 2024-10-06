'use client'

import {useQuery} from '@tanstack/react-query'

import {widgetBridgeInfoQuery} from '@/lib/queries/widgetBridgeInfo'

export const useWidgetBridgeInfo = (bridge: string, toToken: string) => {
  const {data, isLoading} = useQuery(widgetBridgeInfoQuery(bridge))
  try {
    const currencyNames = data?.currencynames
    const currencies = data?.bestcurrencystate?.reservecurrencies
    const supply = data?.bestcurrencystate?.supply
    const count = currencies?.length || 4

    const currency = (currencyNames && currencyNames[toToken]) || ''

    const tokenKeyAmount =
      currencies?.find((c) => c.currencyid === toToken)?.reserves || 0

    //get price of each reserve coin using below principle
    //(reserve DAI / reserve currency ) = price of reserve currency in DAI
    //(reserve DAI * count ) / supply = price of Bridge.vETH in DAI

    const list: WidgetCoinList[] | undefined =
      currencies?.map((token) => {
        const name = currencyNames![token.currencyid]

        return {
          name,
          amount: token.reserves,
          price: tokenKeyAmount / token.reserves,
          value: name.split('.')[0].toLowerCase(),
          currency,
        }
      }) || []

    const bridgeInfo: WidgetCoinList = {
      name: bridge,
      amount: supply!,
      price: (tokenKeyAmount * count) / supply!,
      currency,
    }

    return {list, bridgeInfo, isLoading}
  } catch {
    throw new Error('unable to get converstion list')
  }
}
