'use server'

import {VerusRPC} from '../settings/verusRPC'

export const getVerusBridgeList = async (bridge: string) => {
  try {
    const currencies = await VerusRPC().interface.getCurrency(bridge)
    return currencies
  } catch (e) {
    throw new Error('Failed to fetch currency list')
  }
}
