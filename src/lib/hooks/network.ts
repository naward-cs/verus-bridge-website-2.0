'use client'

import {useMemo} from 'react'
import {useNetwork} from 'wagmi'

import {env} from '@/config/env.mjs'

export const NetworkChain = () => {
  const {chain} = useNetwork()
  return useMemo(() => {
    if (chain?.id) {
      if (chain.id === 1) {
        return 1
      } else {
        return 5
      }
    } else {
      if (env.NEXT_PUBLIC_TESTNET_ONLY) {
        return 5
      } else {
        return 1
      }
    }
  }, [chain])
}

const main = env.NEXT_PUBLIC_MAINNET_DELEGATOR as `0x${string}`
const testnet = env.NEXT_PUBLIC_TESTNET_DELEGATOR as `0x${string}`

export const DelegatorAddress = () => {
  const chain = NetworkChain()
  return useMemo(() => {
    if (chain) {
      if (chain === 1) {
        return main
      } else {
        return testnet
      }
    } else {
      if (env.NEXT_PUBLIC_TESTNET_ONLY) {
        return testnet
      } else {
        return main
      }
    }
  }, [chain])
}
