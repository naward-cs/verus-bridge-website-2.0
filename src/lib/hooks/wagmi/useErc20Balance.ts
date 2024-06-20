import {useQuery} from '@tanstack/react-query'
import {erc20Abi} from 'viem'
import {useAccount, useBalance} from 'wagmi'
import {readContractsQueryOptions} from 'wagmi/query'

import {ETHaddress} from '@/config/constants'
import {config} from '@/config/wagmi'

//erc20BalanceQuery works to pull one query return's options
//refer to prefetchConvertPage txheight
export const erc20BalanceQuery = (
  token: `0x${string}`,
  address?: `0x${string}`
) => {
  return readContractsQueryOptions(config, {
    allowFailure: false,
    contracts: [
      {
        address: token,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [address!],
      },
      {
        address: token,
        abi: erc20Abi,
        functionName: 'decimals',
      },
    ],
  })
}

export const useERC20Balance = (
  token?: `0x${string}`,
  address?: `0x${string}`
) => {
  const enabled = !!address && !!token && token !== ETHaddress
  return useQuery({
    ...erc20BalanceQuery(token!, address),
    gcTime: 60_000,
    staleTime: 5 * 60_000,
    refetchInterval: 10 * 60_000,
    select(data) {
      return {value: data[0], decimals: data[1]}
    },
    enabled,
  })
}

export const useERC20Balances = (token?: `0x${string}`) => {
  const {address} = useAccount()
  const {data: ethBalance} = useBalance({
    address,
    query: {
      refetchInterval: 5 * 60_000,
      gcTime: 2 * 60_000,
      staleTime: 4 * 60_000,
    },
  })
  const {data: ercBalance} = useERC20Balance(token, address)
  if (token) return token === ETHaddress ? ethBalance : ercBalance
  return undefined
}
