import {queryOptions} from '@tanstack/react-query'

type CoinpaprikaUSD = {
  price: number
  [key: string]: string | number
}

export type CoinpaprikaData = {
  id: string
  name: string
  symbol: string
  rank: number
  circulating_supply: number
  total_supply: number
  max_supply: number
  beta_value: number
  first_data_at: string
  last_updated: string
  quotes: {USD: CoinpaprikaUSD}
}[]

const CoinpaprikaURL = 'https://api.coinpaprika.com/v1/tickers'

export const marketDataQuery = (select?: (data: CoinpaprikaData) => void) => {
  return queryOptions({
    queryKey: ['marketInfo'],
    queryFn: async () => {
      const response = await fetch(CoinpaprikaURL)
      if (!response.ok) {
        throw new Error('Issue fetching CoinPaprika market info')
      }
      return response.json()
    },
    notifyOnChangeProps: ['data'],
    gcTime: 15 * 60_000,
    refetchInterval: 15 * 60_000,
    staleTime: 15 * 60_000,
    select,
  })
}
