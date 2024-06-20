import {useMemo} from 'react'

import {env} from '@/config/env.mjs'

const main = env.NEXT_PUBLIC_MAINNET_DELEGATOR as `0x${string}`

const testnet = env.NEXT_PUBLIC_TESTNET_DELEGATOR as `0x${string}`

export const DelegatorAddress = (chain?: number) => {
  return useMemo(() => {
    switch (chain) {
      case 1:
        return main
      case 11155111:
        return testnet
      default:
        if (env.NEXT_PUBLIC_TESTNET_ONLY) {
          return main
        } else {
          return testnet
        }
    }
  }, [chain])
}
