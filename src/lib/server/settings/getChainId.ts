import {getChainId as getWagmiChainId} from 'wagmi/actions'

import {env} from '@/config/env.mjs'
import {config} from '@/config/wagmi'

import {getWagmiCookie} from '../../actions/getWagmiCookie'

const ValidateChain = () => {
  const chainId = getWagmiCookie()?.chainId
  if (!config.state.current && config.state.chainId !== chainId) {
    config.setState((x) => ({
      ...x,
      chainId: chainId ? chainId : env.NEXT_PUBLIC_TESTNET_ONLY ? 11155111 : 1,
    }))
  }
}
export const getChainId = (): number => {
  ValidateChain()
  return getWagmiChainId(config)
}
