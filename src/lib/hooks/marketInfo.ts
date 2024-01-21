import {useQuery} from '@tanstack/react-query'

export const useMarketData = () => {
  return useQuery({
    queryKey: ['ETHmarket'],
    queryFn: async () =>
      await fetch('https://api.coingecko.com/api/v3/coins/ethereum', {
        cache: 'no-cache',
      }).then((res) => res.json()),

    select: (market) => market?.market_data?.current_price?.usd,
    cacheTime: 30 * 1000,
    refetchInterval: 60 * 1000,
  })
}

//TODO create a call to get full coin list to dynamically support additional coins
//`https://api.coinpaprika.com/v1/coins/${
//MarketNameList[coin.name]
//}/ohlcv/latest`
type TickerInfo = {
  id: string
  [key: string]: any
}
export const useCaprikaMarketInfo = (coin: string) => {
  const {data: marketInfo} = useQuery({
    queryKey: ['caprika'],
    queryFn: async () =>
      await fetch(' https://api.coinpaprika.com/v1/tickers', {
        cache: 'no-cache',
      }).then((res) => res.json()),

    // select: (market) => market?.quotes,
    cacheTime: 5 * 60 * 1000,
    refetchInterval: 10 * 60 * 1000,
  })
  if (marketInfo) {
    return marketInfo.filter((c: TickerInfo) => c.id === coin)[0]
  }
  return marketInfo
}
