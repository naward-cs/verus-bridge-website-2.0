import {VerusIdInterface} from 'verusid-ts-client'

import {env} from '@/config/env.mjs'

import {getChainId} from './getChainId'

export const VerusMainnetRPC = new VerusIdInterface(
  'VRSC',
  env.VERUS_MAINNET_API
)
export const VerusTestRPC = new VerusIdInterface(
  'VRSCTEST',
  env.VERUS_TESTNET_API
)

export const VerusRPC = (): VerusIdInterface => {
  const chainId = getChainId()
  switch (chainId) {
    case 1:
      return VerusMainnetRPC
    case 11155111:
      return VerusTestRPC
    default:
      if (env.NEXT_PUBLIC_TESTNET_ONLY) {
        return VerusTestRPC
      } else {
        return VerusMainnetRPC
      }
  }
}
