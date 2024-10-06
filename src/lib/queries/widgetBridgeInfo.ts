import {queryOptions} from '@tanstack/react-query'

import {getWidgetBridgeInfo} from '../server/actions/getWidgetBridgeInfo'

export const widgetBridgeInfoQuery = (bridge: string) => {
  return queryOptions({
    queryKey: ['widgetBridgeInfo', bridge],
    queryFn: async () => {
      const response = await getWidgetBridgeInfo(bridge)
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
