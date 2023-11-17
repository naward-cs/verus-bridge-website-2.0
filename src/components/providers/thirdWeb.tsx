'use client'

import React from 'react'
import {Ethereum, Goerli} from '@thirdweb-dev/chains'
import {ThirdwebSDKProvider} from '@thirdweb-dev/react'
import {useQueryClient} from 'wagmi'

import {NetworkChain} from '@/lib/hooks/network'

const Chain = {
  1: Ethereum,
  5: Goerli,
}

const ThirdWeb = ({children}: {children: React.ReactNode}) => {
  const ChainID = NetworkChain()

  const queryClient = useQueryClient()
  return (
    <ThirdwebSDKProvider activeChain={Chain[ChainID]} queryClient={queryClient}>
      {children}
    </ThirdwebSDKProvider>
  )
}

export default ThirdWeb
