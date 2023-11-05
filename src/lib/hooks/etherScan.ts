'use client'

import {useMemo} from 'react'

import {NetworkChain} from './network'

const etherScanGoerli = 'https://goerli.etherscan.io/'
const etherScanMainnet = 'https://etherscan.io/'

export const EtherScan = () => {
  const chain = NetworkChain()
  return useMemo(() => {
    if (chain === 1) {
      return etherScanMainnet
    } else {
      return etherScanGoerli
    }
  }, [chain])
}
