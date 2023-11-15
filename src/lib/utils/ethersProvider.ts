import {useMemo} from 'react'
import {Web3Provider} from '@ethersproject/providers'
import {usePublicClient, useWalletClient} from 'wagmi'

import type {PublicClient, WalletClient} from 'wagmi'

const getSigner = (walletClient: WalletClient) => {
  const {account, chain, transport} = walletClient
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  }
  const provider = new Web3Provider(transport, network)
  const signer = provider.getSigner(account.address)
  return signer
}

const getProvider = (publicClient: PublicClient) => {
  const {chain, transport} = publicClient
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  }
  const provider = new Web3Provider(transport, network)
  return provider
}

export const useProviderOrSigner = ({chainId}: {chainId?: number} = {}) => {
  const {data: walletClient} = useWalletClient({chainId})
  const publicClient = usePublicClient({chainId})
  return useMemo(
    () => (walletClient ? getSigner(walletClient) : getProvider(publicClient)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [walletClient]
  )
}
