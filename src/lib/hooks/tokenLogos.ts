'use client'

import {useQuery} from '@tanstack/react-query'

type CoinPaprikaCoin = {
  id: string
  name: string
  symbol: string
  rank: number
  is_new: boolean
  is_active: boolean
  type: string
}
export const useGetTokenRef = () => {
  return useQuery({
    queryKey: ['logos'],
    queryFn: async () =>
      await fetch('https://api.coinpaprika.com/v1/coins', {
        cache: 'no-cache',
      }).then((res) => res.json()),
    select(data) {
      return data.filter((t: CoinPaprikaCoin) => t.is_active)
    },
    cacheTime: 24 * 60 * 60 * 1000,
    refetchInterval: 24 * 60 * 60 * 1000,
  })
  // return useQuery({
  //   queryKey: ['coin', 'logo'],
  //   queryFn: async () =>
  //     await fetch('https://api.coingecko.com/api/v3/coins/list', {
  //       cache: 'no-cache',
  //     }).then((res) => res.json()),
  //   cacheTime: 24 * 60 * 60 * 1000,
  //   refetchInterval: 24 * 60 * 60 * 1000,
  //   retry: 10,
  //   retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  // })
}

export const useGetLogo = (coin?: string) => {
  return useQuery({
    queryKey: ['logos', coin],
    queryFn: async () =>
      await fetch(`https://api.coinpaprika.com/v1/coins/${coin}`, {
        cache: 'no-cache',
      }).then((res) => res.json()),
    select(data) {
      return data.logo
    },
    cacheTime: 24 * 60 * 60 * 1000,
    refetchInterval: 24 * 60 * 60 * 1000,
    enabled: !!coin,
  })

  // return useQuery({
  //   queryKey: ['coin', 'logo', coin],
  //   queryFn: async () =>
  //     await fetch(
  //       `https://api.coingecko.com/api/v3/coins/${coin}?tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`,
  //       {cache: 'no-cache'}
  //     ).then((res) => res.json()),
  //   select(data) {
  //     return data.image.small
  //   },
  //   retry: 10,
  //   retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

  //   enabled: !!coin,
  // })
}
