'use client';

import {delegatorABI} from '@/generated'
import {useQuery} from '@tanstack/react-query'
import {useContractRead} from 'wagmi'
import {readContract} from 'wagmi/actions'

// import {abi} from '@/config/abi/DelegatorAbi'
import DELEGATORABI from '@/config/abi/DelegatorAbiJson.json'
import {FLAGS} from '@/config/constants'
import {toBase58Check} from '@/lib/utils/convert'

import {DelegatorAddress, NetworkChain} from './network'

// export const DelegatorAbi = abi
// import type { Abi } from 'viem';

export const useGetTransactionHeight = () => {
  const chainId = NetworkChain()
  const delegatorAddr = DelegatorAddress()
  return useQuery({
    queryKey: ['txHeight', chainId, delegatorAddr],
    queryFn: () =>
      readContract({
        address: delegatorAddr,
        abi: delegatorABI,
        functionName: 'bestForks',
        chainId: chainId,
        args: [0n],
      }),
    select(data) {
      const heightPos = 194
      return (
        parseInt(
          `0x${(data as string).substring(heightPos, heightPos + 8)}`,
          16
        ) || 1
      )
    },
    cacheTime: 30 * 1000,
    refetchInterval: 60 * 1000,
  })
}

export const useGetTokenFromList = () => {
  const chainId = NetworkChain()
  const delegatorAddr = DelegatorAddress()

  return useContractRead({
    address: delegatorAddr,
    abi: DELEGATORABI,
    functionName: 'getTokenList',
    chainId: chainId,
    args: [0n, 0n],
    staleTime: 60_000,
    select(data) {
      const list = (data as unknown as FromTokenList[]).map((e) => ({
        label: e.name,
        value: e.ticker,
        iaddress: e.iaddress,
        erc20address: e.erc20ContractAddress,
        id: toBase58Check(e.iaddress),
        flags: e.flags,
      }))
      const ercList = list.filter(
        (token) => token.flags & FLAGS.MAPPING_ERC20_DEFINITION && token.label
      )
      return ercList as TokenList[]
    },
  })
}

export const useIsPoolActive = () => {
  const chainId = NetworkChain()
  const delegatorAddr = DelegatorAddress()
  return useContractRead({
    address: delegatorAddr,
    abi: delegatorABI,
    functionName: 'bridgeConverterActive',
    chainId: chainId,
    watch: true,
    staleTime: 6_000,
  })
}