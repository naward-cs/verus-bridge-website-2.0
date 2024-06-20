import {useMemo} from 'react'
import {providers} from 'ethers'
import {Config, useClient, useConnectorClient} from 'wagmi'

import type {Account, Chain, Client, Transport} from 'viem'

const clientToProvider = (client: Client<Transport, Chain>) => {
  const {chain, transport} = client
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  }
  if (transport.type === 'fallback') {
    return new providers.FallbackProvider(
      (transport.transports as ReturnType<Transport>[]).map(
        ({value}) => new providers.JsonRpcProvider(value?.url, network)
      )
    )
  }
  return new providers.JsonRpcProvider(transport.url, network)
}

const clientToSigner = (client: Client<Transport, Chain, Account>) => {
  const {account, chain, transport} = client
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  }
  const provider = new providers.Web3Provider(transport, network)
  const signer = provider.getSigner(account.address)
  return signer
}

export const useProviderOrSigner = ({chainId}: {chainId?: number}) => {
  const {data: walletClient} = useConnectorClient<Config>({chainId})
  const publicClient = useClient<Config>({chainId})
  return useMemo(
    () =>
      walletClient
        ? clientToSigner(walletClient)
        : clientToProvider(publicClient!),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [walletClient]
  )
}
