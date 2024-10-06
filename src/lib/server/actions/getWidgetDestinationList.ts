'use server'

import {WidgetRPC} from '../settings/widgetRPC'
import {getWidgetTokenList} from './getWidgetTokenList'

export const getWidgetDestinationList = async (bridge: string) => {
  const tokenList = await getWidgetTokenList()

  const currencies = await WidgetRPC(bridge).interface.getCurrency(bridge)

  if (currencies.error) throw new Error('Invalid currency list')

  const list = Object.fromEntries(
    currencies.result.currencies.map((k) => {
      const token = tokenList.find((t) => t.id === k)
      return [k, token]
    })
  )
  return {list, currencyPrices: currencies.result.bestcurrencystate?.currencies}
}
