import {VerusIdInterface} from 'verusid-ts-client'

import {env} from '@/config/env.mjs'

const VerusMainnetRPC = new VerusIdInterface('VRSC', env.VERUS_MAINNET_API)

const VarrRPC = new VerusIdInterface('vARR', 'https://rpc.varrr.komodefi.com')

export const WidgetRPC = (network?: string): VerusIdInterface => {
  return network === 'vARRR' ? VarrRPC : VerusMainnetRPC
}
