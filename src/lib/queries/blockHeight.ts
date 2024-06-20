import {queryOptions} from '@tanstack/react-query'

import {getBlockHeight} from '@/lib/server/actions'

//maintain queryKey consistancy
export const blockHeightQueryOptions = (chainId: number) => {
  return queryOptions({
    queryKey: ['blockHeight', chainId],
    queryFn: async () => await getBlockHeight(),
    gcTime: 30 * 1000,
    refetchInterval: 60 * 1000,
    enabled: !!chainId,
  })
}