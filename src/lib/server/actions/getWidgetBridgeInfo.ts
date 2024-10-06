'use server'

//using widgetRPC as this is bound to chain 1 (mainnet)
import {WidgetRPC} from '../settings/widgetRPC'

export const getWidgetBridgeInfo = async (bridge: string) => {
  try {
    // const currencies = await WidgetRPC().interface.getCurrency('Bridge.vETH')
    const currencies = await WidgetRPC(bridge).interface.getCurrency(bridge)
    return currencies
  } catch {
    throw new Error('Failed to fetch currency list')
  }
}
