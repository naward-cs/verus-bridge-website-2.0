import * as React from 'react'
import {
  BrowserProvider,
  FallbackProvider,
  JsonRpcProvider,
  JsonRpcSigner,
} from 'ethers'
import {type HttpTransport} from 'viem'
import {usePublicClient, useWalletClient} from 'wagmi'

import type {PublicClient, WalletClient} from 'wagmi'

export function publicClientToProvider(publicClient: PublicClient) {
  const {chain, transport} = publicClient
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  }
  if (transport.type === 'fallback') {
    const providers = (transport.transports as ReturnType<HttpTransport>[]).map(
      ({value}) => new JsonRpcProvider(value?.url, network)
    )
    if (providers.length === 1) return providers[0]
    return new FallbackProvider(providers)
  }
  return new JsonRpcProvider(transport.url, network)
}

/** Hook to convert a viem Public Client to an ethers.js Provider. */
export function useEthersProvider({chainId}: {chainId?: number} = {}) {
  const publicClient = usePublicClient({chainId})
  return React.useMemo(
    () => publicClientToProvider(publicClient),
    [publicClient]
  )
}

const walletClientToSigner = (walletClient: WalletClient) => {
  const {account, chain, transport} = walletClient
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  }
  const provider = new BrowserProvider(transport, network)
  const signer = new JsonRpcSigner(provider, account.address)
  return signer
}

export const useEtherSigner = ({chainId}: {chainId?: number} = {}) => {
  const {data: walletClient} = useWalletClient({chainId})
  return React.useMemo(
    () => (walletClient ? walletClientToSigner(walletClient) : undefined),
    [walletClient]
  )
}
