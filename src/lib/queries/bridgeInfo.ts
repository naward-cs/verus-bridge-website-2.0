import {queryOptions} from '@tanstack/react-query'

import {getVerusBridgeInfo} from '../server/actions/getVerusBridgeInfo'

export const bridgeInfoQuery = () => {
  return queryOptions({
    queryKey: ['bridgeInfo'],
    queryFn: async () => {
      const response = await getVerusBridgeInfo()
      if (response.error) {
        throw new Error('Issue fetching Bridge Currencies from Verus API')
      }
      return response.result
    },
    notifyOnChangeProps: ['data'],
    gcTime: 3 * 60_000,
    refetchInterval: 60_000,
    staleTime: 60_000,
  })
}
