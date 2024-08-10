'use server'

//using widgetRPC as this is bound to chain 1 (mainnet)
import {WidgetRPC} from '../settings/widgetRPC'

export const getVerusBridgeInfo = async () => {
  try {
    const currencies = await WidgetRPC().interface.getCurrency('Bridge.vETH')
    return currencies
  } catch {
    throw new Error('Failed to fetch currency list')
  }
}
