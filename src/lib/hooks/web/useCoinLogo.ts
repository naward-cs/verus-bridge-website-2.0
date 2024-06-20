import {queryOptions, useQuery} from '@tanstack/react-query'

import {CoinLogoGenerator} from '@/lib/utils/coinLogoGenerator'

type CoinPaprikaCoin = {
  id: string
  name: string
  symbol: string
  rank: number
  is_new: boolean
  is_active: boolean
  type: string
}

const coinDataQuery = () => {
  return queryOptions({
    queryKey: ['logos'],
    queryFn: async () => {
      const response = await fetch('https://api.coinpaprika.com/v1/coins')
      if (!response.ok) {
        throw new Error('Issue fetching CoinPaprika coin logo info')
      }
      return response.json()
    },
    gcTime: 24 * 60 * 60 * 1000,
    staleTime: 24 * 60 * 60 * 1000,
  })
}

const coinLogoQuery = (coin: string) => {
  return queryOptions({
    queryKey: ['logos', coin],
    queryFn: async () => {
      const response = await fetch(
        `https://api.coinpaprika.com/v1/coins/${coin}`
      )
      if (!response.ok) {
        throw new Error('Issue fetching CoinPaprika coin logo info')
      }
      return response.json()
    },
    select(data) {
      return data.logo
    },
    gcTime: 24 * 60 * 60 * 1000,
    staleTime: 24 * 60 * 60 * 1000,
    enabled: !!coin,
  })
}

export const useCoinLogo = (token: {symbol: string; iAddr: string}) => {
  const {data: coinList} = useQuery(coinDataQuery())

  const coin = coinList?.find(
    (c: CoinPaprikaCoin) => c.symbol === token.symbol.toUpperCase()
  )
  const {data: coinLogo} = useQuery(coinLogoQuery(coin?.id))

  const genLogo = CoinLogoGenerator(token.iAddr)
  return {coinLogo, genLogo}
}
