'use server'

import {env} from '@/config/env.mjs'

import {getChainId} from './getChainId'

const etherScanSepolia = 'https://sepolia.etherscan.io'

// const etherScanGoerli = 'https://goerli.etherscan.io/'
const etherScanMainnet = 'https://etherscan.io/'

export const EtherScan = () => {
  const chainId = getChainId()
  switch (chainId) {
    case 1:
      return etherScanMainnet
    case 11155111:
      return etherScanSepolia
    default:
      if (env.NEXT_PUBLIC_TESTNET_ONLY) {
        return etherScanMainnet
      } else {
        return etherScanSepolia
      }
  }
}
