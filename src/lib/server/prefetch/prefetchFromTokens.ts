import {hashFn, readContractQueryOptions} from 'wagmi/query'

import delegatorAbi from '@/config/abi/DelegatorAbiJson.json'
import {DelegatorAddress} from '@/config/delegator'
import {config} from '@/config/wagmi'

import type {WagmiStore} from '@/types/wagmi'
import type {QueryClient} from '@tanstack/react-query'

export const prefetchFromTokens = async (
  queryClient: QueryClient,
  wagmiStore: WagmiStore
) => {
  const delegatorAddr = DelegatorAddress(wagmiStore!.chainId)

  const options = readContractQueryOptions(config, {
    address: delegatorAddr,
    abi: delegatorAbi,
    functionName: 'getTokenList',
    args: [0n, 0n],
    chainId: wagmiStore?.chainId,
  })
  await queryClient.prefetchQuery({
    ...options,
    queryKeyHashFn: hashFn,
  })
}

export default prefetchFromTokens
