import {env} from '@/config/env.mjs'

const mainnet = 'vrsc'
const testnet = 'vrsctest'

export const BLOCKCHAIN_NAME = (chain?: number): string => {
  switch (chain) {
    case 1:
      return mainnet.toUpperCase()
    case 11155111:
      return testnet.toUpperCase()
    default:
      if (env.NEXT_PUBLIC_TESTNET_ONLY) {
        return testnet.toUpperCase()
      } else {
        return mainnet.toUpperCase()
      }
  }
}
