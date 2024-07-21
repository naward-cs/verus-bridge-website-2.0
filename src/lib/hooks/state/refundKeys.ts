'use client'

import {useQuery, useQueryClient} from '@tanstack/react-query'

type RefundAddress = Record<`0x${string}`, string>

type RefundCKeys = Record<`0x${string}`, {x1: string; x2: string}>

export const useRefundAddresses = () => {
  const queryClient = useQueryClient()
  const queryKey = 'refundKeys'
  const {data: refundAddresses} = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [queryKey],
    queryFn: () => {
      const keys = localStorage.getItem('refundAddresses')
      if (keys) {
        return JSON.parse(keys) as RefundAddress
      }
      return null
    },
    refetchInterval: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchIntervalInBackground: false,
  })

  const setRefundAddresses = (data: Partial<RefundAddress>) => {
    queryClient.setQueryData([queryKey], data)
  }

  const resetRefundAddresses = () => {
    queryClient.invalidateQueries({queryKey: [queryKey]})
    queryClient.refetchQueries({queryKey: [queryKey]})
  }

  return {refundAddresses, setRefundAddresses, resetRefundAddresses}
}

export const useRefundcKeys = () => {
  const queryClient = useQueryClient()
  const queryKey = 'refundcKeys'
  const {data: refundcKey} = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [queryKey],
    queryFn: () => {
      const keys = localStorage.getItem('refundcKeys')
      if (keys) {
        return JSON.parse(keys) as RefundCKeys
      }
      return null
    },
    refetchInterval: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchIntervalInBackground: false,
  })

  const setRefundcKeys = (data: Partial<RefundCKeys>) => {
    queryClient.setQueryData([queryKey], data)
  }

  const resetRefundcKeys = () => {
    queryClient.invalidateQueries({queryKey: [queryKey]})
    queryClient.refetchQueries({queryKey: [queryKey]})
  }

  return {refundcKey, setRefundcKeys, resetRefundcKeys}
}
