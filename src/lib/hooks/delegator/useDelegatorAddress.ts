'use client'

import {useChainId} from 'wagmi'

import {env} from '@/config/env.mjs'

const main = env.NEXT_PUBLIC_MAINNET_DELEGATOR as `0x${string}`

const testnet = env.NEXT_PUBLIC_TESTNET_DELEGATOR as `0x${string}`

export const useDelegatorAddress = () => {
  const chainId = useChainId()

  switch (chainId) {
    case 1:
      return main
    case 111551115:
      return testnet
    default:
      if (env.NEXT_PUBLIC_TESTNET_ONLY) {
        return main
      } else {
        return testnet
      }
  }
}
