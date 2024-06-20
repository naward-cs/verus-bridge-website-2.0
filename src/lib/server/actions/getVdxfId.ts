'use server'

import {VerusRPC} from '../settings/verusRPC'

export const getVdxfId = async (vdxf: string) => {
  const result = await VerusRPC().interface.getVdxfId(vdxf)
  return result
}
