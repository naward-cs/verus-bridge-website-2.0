'use server'

import {VerusRPC} from '../settings/verusRPC'

export const getTestInfo = async () => {
  try {
    const currenciesQuery = await VerusRPC().interface.listCurrencies()
    if (currenciesQuery.error) throw new Error()
    const currencies = currenciesQuery.result
    const convertList = currencies.filter(
      (t) =>
        t.bestcurrencystate?.currencies !== undefined &&
        t.currencydefinition.currencies.length > 1
    )
    return convertList
  } catch {
    throw new Error('Failed to fetch currency list')
  }
}
