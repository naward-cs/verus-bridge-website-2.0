// import { useMemo } from 'react' 
import {VerusIdInterface} from 'verusid-ts-client'

import {env} from '@/config/env.mjs'

export const VerusMainnetRPC = new VerusIdInterface(
  'VRSC',
  env.VERUS_MAINNET_API
)
export const VerusTestRPC = new VerusIdInterface(
  'VRSCTEST',
  env.VERUS_TESTNET_API
)

export const VerusRPC = (chain?: number): VerusIdInterface => {
  switch (chain) {
    case 1:
      return VerusMainnetRPC
    case 5:
      return VerusTestRPC
    default:
      if (env.NEXT_PUBLIC_TESTNET_ONLY) {
        return VerusTestRPC
      } else {
        return VerusMainnetRPC
      }
  }
}
