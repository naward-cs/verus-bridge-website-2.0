import {headers} from 'next/headers'
import {cookieToInitialState} from 'wagmi'

import {config} from '@/config/wagmi'

import type {WagmiStore} from '@/types/wagmi'

export const getWagmiCookie = (): WagmiStore => {
  return cookieToInitialState(config, headers().get('cookie'))
}
