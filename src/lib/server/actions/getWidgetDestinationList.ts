'use server';

import { WidgetRPC } from '../settings/widgetRPC';
import { getTokenList } from './getTokenList';





export const getWidgetDestinationList = async (bridge: string) => {
  const tokenList = await getTokenList()
  let currencies
  try {
    let network = undefined
    if (bridge === 'Bridge.vARRR') {
      network = 'vARRR'
    }
    currencies = await WidgetRPC(network).interface.getCurrency(bridge)
  } catch {
    throw new Error('Failed to fetch currency list')
  }

  if (currencies.error) throw new Error('Invalid currency list')

  const list = Object.fromEntries(
    currencies.result.currencies.map((k) => {
      const token = tokenList.find((t) => t.id === k)
      return [k, token]
    })
  )
  return {list, currencyPrices: currencies.result.bestcurrencystate?.currencies}
}