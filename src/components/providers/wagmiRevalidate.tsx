'use client';

import type {ProviderProps} from '@/types/wagmi'
import {useEffect, useState} from 'react'
import {useChainId, useConfig} from 'wagmi'

/**
 *  WagmiRevalidate
 *  - Insures cookie and current chainId state match if
 *    user is not connected
 *  - otherwise if user is connected, disregard use wagmi's provider
 */
const WagmiRevalidate = (props: ProviderProps) => {
  const [init, setInit] = useState(true)
  const currentChainId = useChainId()
  const cookieChainid = props.initialState?.chainId
  const config = useConfig()

  if (init) {
    if (!config.state.current) {
      if (cookieChainid !== undefined) {
        if (currentChainId !== cookieChainid) {
          config.setState((x) => ({...x, chainId: cookieChainid!}))
        }
      }
    }
  }
  useEffect(() => {
    setInit(false)
  }, [])

  return <>{props.children}</>
}

export default WagmiRevalidate