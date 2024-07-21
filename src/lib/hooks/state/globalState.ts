'use client'

import {useQuery, useQueryClient} from '@tanstack/react-query'

export function createGlobalState<T>(
  queryKey: string,
  initialData: T | null = null
) {
  return function () {
    const queryClient = useQueryClient()

    const {data} = useQuery({
      // eslint-disable-next-line @tanstack/query/exhaustive-deps
      queryKey: [queryKey],
      queryFn: () => Promise.resolve(initialData),
      refetchInterval: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchIntervalInBackground: false,
    })

    const setData = (data: Partial<T>) => {
      queryClient.setQueryData([queryKey], data)
    }

    const resetData = () => {
      queryClient.invalidateQueries({queryKey: [queryKey]})
      queryClient.refetchQueries({queryKey: [queryKey]})
    }

    return {data, setData, resetData}
  }
}
