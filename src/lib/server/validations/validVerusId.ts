'use server'

import {VerusRPC} from '../settings/verusRPC'

export const isValidVerusID = async (chain: number, address: string) => {
  //NOTE: This is only works as long as the address being sent is not of ETH or R-Address, ensure safeties, before using

  const result = await VerusRPC().interface.getIdentity(address)

  return {result: result.result?.identity, error: result.error}
}
