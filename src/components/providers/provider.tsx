'use client'

import React from 'react'
import {NextUIProvider} from '@nextui-org/react'
import {Toaster} from 'sonner'

import DevProvider from '../devUI/devUtils'
import ReactQueryProvider from './tanstackQueryProvider'
import Web3Provider from './web3Provider'

const Providers = ({children}: {children: React.ReactNode}) => {
  return (
    <ReactQueryProvider>
      <Web3Provider>
        <NextUIProvider>
          {children}
          <Toaster richColors closeButton />
          <DevProvider />
        </NextUIProvider>
      </Web3Provider>
    </ReactQueryProvider>
  )
}

export default Providers
