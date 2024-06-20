'use client'

import React, {Suspense} from 'react'
import {useAccount} from 'wagmi'

import {Web3Skeleton} from '@/components/skeletons/web3Skeleton'

import AccountButton from './accountButton'
import ConnectButton from './connectButton'

const Web3Button = () => {
  const {isConnected} = useAccount()
  // if (isReconnecting || isConnecting) return
  return isConnected ? (
    <Suspense fallback={<Web3Skeleton />}>
      <AccountButton />
    </Suspense>
  ) : (
    <ConnectButton />
  )
}

export default Web3Button
