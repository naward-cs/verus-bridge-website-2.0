'use client';

import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { Toaster } from 'sonner';



import DevProvider from '../devUI/devUtils';
import ReactQueryProvider from './tanstackQueryProvider';
import Web3Provider from './web3Provider';





const Providers = ({children}: {children: React.ReactNode}) => {
  return (
    <ReactQueryProvider>
      <NextUIProvider>
        <Web3Provider>{children}</Web3Provider>
        <Toaster richColors closeButton />
        <DevProvider />
      </NextUIProvider>
    </ReactQueryProvider>
  )
}

export default Providers