'use server'

import {VerusRPC} from '../settings/verusRPC'

export const getIdentityInfo = async (address: string) => {
  const result = await VerusRPC().interface.getIdentity(address)
  return result
}
