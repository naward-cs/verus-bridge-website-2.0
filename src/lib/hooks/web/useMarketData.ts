'use client'

import {useQuery} from '@tanstack/react-query'

import {marketDataQuery} from '@/lib/queries/marketInfo'

import type {CoinpaprikaData} from '@/lib/queries/marketInfo'

export const useMarketData = (select?: (data: CoinpaprikaData) => void) => {
  return useQuery(marketDataQuery(select))
}

export const useMarket = (coin: string) => {
  let filteredId
  switch (coin) {
    case 'vrsc':
    case 'VRSC':
      filteredId = 'vrsc-verus-coin'
      break
    case 'eth':
    case 'vETH':
    case 'veth':
      filteredId = 'eth-ethereum'
      break
    case 'dai':
    case 'DAI.vETH':
      filteredId = 'dai-dai'
      break
    case 'mkr':
    case 'MKR.vETH':
      filteredId = 'mkr-maker'
      break
    default:
      filteredId = coin
  }
  return useMarketData(
    (data) => data.find((t) => t.id === filteredId)?.quotes.USD.price || '0'
  )
}
