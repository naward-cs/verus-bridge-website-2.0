'use client';

import { delegatorABI } from '@/generated';
import { useQuery } from '@tanstack/react-query';
import { useContractRead, useContractReads } from 'wagmi';
import { readContract } from 'wagmi/actions';



// import { abi } from '@/config/abi/DelegatorAbi';
import DELEGATORABI from '@/config/abi/DelegatorAbiJson.json';
import { FLAGS } from '@/config/constants';
import { toBase58Check } from '@/lib/utils/convert';



import { formatHexAddress } from '../utils/claimUtil';
import { DelegatorAddress, NetworkChain } from './network';





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

export const useGetNFTfromList = () => {
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
        ercNum: e.flags & FLAGS.MAPPING_ERC721_NFT_DEFINITION ? 721 : 1155,
        ercString:
          e.flags & FLAGS.MAPPING_ERC721_NFT_DEFINITION
            ? '[ERC721]'
            : e.flags & FLAGS.MAPPING_ERC1155_NFT_DEFINITION
            ? '[ERC1155 Verus single NFT]'
            : '[ERC1155]',
        iaddress: e.iaddress,
        erc20address: e.erc20ContractAddress,
        value: e.tokenID,
        flags: e.flags,
      }))
      // const ercList = list.filter(
      //   (token) => token.flags & FLAGS.MAPPING_ERC20_DEFINITION && token.label
      // )
      // return ercList as TokenList[]
      return list.filter(
        (nft) =>
          nft.flags &
          (FLAGS.MAPPING_ERC1155_NFT_DEFINITION +
            FLAGS.MAPPING_ERC1155_ERC_DEFINITION +
            FLAGS.MAPPING_ERC721_NFT_DEFINITION)
      )
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

export const useGetAllRefunds = (address: string, tokenList: TokenList[]) => {
  const chainId = NetworkChain()
  const delegatorAddr = DelegatorAddress()
  const formattedAddress = formatHexAddress(
    address,
    'REFUND_CHECK'
  ) as `0x${string}`
  const contracts = tokenList.map((t) => ({
    address: delegatorAddr,
    abi: delegatorABI,
    functionName: 'refunds',
    chainId: chainId,
    args: [formattedAddress, t.iaddress],
  }))

  return useContractReads({
    contracts,
    enabled: !!tokenList,
  })
}