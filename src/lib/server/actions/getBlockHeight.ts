'use server'

import {VerusRPC} from '../settings/verusRPC'

export const getBlockHeight = async () => {
  try {
    const blockHeight = await VerusRPC().getCurrentHeight()
    return blockHeight
  } catch (e) {
    throw new Error('Failed to fetch current block height')
  }
}
