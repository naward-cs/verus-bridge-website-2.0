'use client'

import {useQuery} from '@tanstack/react-query'
import {useContractRead} from 'wagmi'
import {readContract} from 'wagmi/actions'

import DELEGATORABI from '@/config/abi/DelegatorAbi.json'
import {FLAGS} from '@/config/constants'
import {toBase58Check} from '@/lib/utils/convert'

import {DelegatorAddress, NetworkChain} from './network'

import type {Abi} from 'viem'

export const DelegatorAbi = DELEGATORABI as Abi

export const useGetTransactionHeight = () => {
  const chainId = NetworkChain()
  const delegatorAddr = DelegatorAddress()
  return useQuery({
    queryKey: ['txHeight', chainId, delegatorAddr],
    queryFn: () =>
      readContract({
        address: delegatorAddr,
        abi: DelegatorAbi,
        functionName: 'bestForks',
        chainId: chainId,
        args: ['0'],
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
    abi: DelegatorAbi,
    functionName: 'getTokenList',
    chainId: chainId,
    args: ['0', '0'],
    staleTime: 60_000,
    select(data) {
      const list = (data as FromTokenList[]).map((e) => ({
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
    abi: DelegatorAbi,
    functionName: 'bridgeConverterActive',
    chainId: chainId,
    watch: true,
    staleTime: 6_000,
  })
}
