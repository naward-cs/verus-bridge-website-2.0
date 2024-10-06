import {useQuery} from '@tanstack/react-query'

// import {getWidgetBridgeInfo} from '@/lib/server/actions/getWidgetBridgeInfo'

import {getWidgetDestinationList} from '@/lib/server/actions/getWidgetDestinationList'

export const useWidgetData = (bridge: string) => {
  return useQuery({
    queryKey: ['widget', bridge],
    queryFn: async () => getWidgetDestinationList(bridge),
    staleTime: 5 * 60_000,
    refetchInterval: 5 * 60_000,
    enabled: !!bridge,
  })
}
