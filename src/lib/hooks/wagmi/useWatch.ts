'use client'

import {useEffect} from 'react'
import {QueryKey, useQueryClient} from '@tanstack/react-query'
import {useBlockNumber} from 'wagmi'

//TODO: this has a potential bug
export const useWatch = (queryKey: QueryKey, period = 5) => {
  const queryClient = useQueryClient()
  const {data: blockNumber} = useBlockNumber({watch: true})
  useEffect(() => {
    if (Number(blockNumber?.toString()) % period === 0)
      queryClient.invalidateQueries({queryKey})
  }, [blockNumber, period, queryClient, queryKey])
}
