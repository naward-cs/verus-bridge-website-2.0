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
