'use client'

import React from 'react'
import {NextUIProvider} from '@nextui-org/react'
import {AppProgressBar as ProgressBar, useRouter} from 'next-nprogress-bar'
import {Toaster} from 'sonner'
import {WagmiProvider} from 'wagmi'

import {config} from '@/config/wagmi'

import DevUIProvider from './devUI'
import ReactQueryProvider from './tanstackQuery'
import WagmiRevalidate from './wagmiRevalidate'

import type {ProviderProps} from '@/types/wagmi'

export const Provider = (props: ProviderProps) => {
  const router = useRouter()

  return (
    <WagmiProvider config={config} initialState={props.initialState}>
      <ReactQueryProvider>
        <WagmiRevalidate initialState={props.initialState}>
          <NextUIProvider navigate={router.push}>
            {props.children}
            <ProgressBar />
            <Toaster richColors closeButton />
            <DevUIProvider />
          </NextUIProvider>
        </WagmiRevalidate>
      </ReactQueryProvider>
    </WagmiProvider>
  )
}
