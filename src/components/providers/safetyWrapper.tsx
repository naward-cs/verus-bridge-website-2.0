'use client'

import React from 'react'
import {useNetwork} from 'wagmi'

//TODO: make this a withValidNetworkHOC
const SafetyWrapper = ({children}: {children: React.ReactNode}) => {
  const {chain} = useNetwork()
  if (chain?.unsupported) throw new Error('Unsupported Chain')
  return <>{children}</>
}

export default SafetyWrapper
