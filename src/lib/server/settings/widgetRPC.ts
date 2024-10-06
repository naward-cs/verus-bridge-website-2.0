import {VerusIdInterface} from 'verusid-ts-client'

import {env} from '@/config/env.mjs'

const VerusMainnetRPC = new VerusIdInterface('VRSC', env.VERUS_MAINNET_API)

const VarrRPC = new VerusIdInterface('vARRR', 'https://rpc.varrr.komodefi.com')
const VdexRPC = new VerusIdInterface('vDEX', 'https://rpc.vdex.komodefi.com/')
export const WidgetRPC = (network?: string): VerusIdInterface => {
  switch (network) {
    case 'Bridge.vARRR':
      return VarrRPC
    case 'Bridge.vDEX':
      return VdexRPC
    default:
      return VerusMainnetRPC
  }

  // return network === 'vARRR' ? VarrRPC : VerusMainnetRPC
}