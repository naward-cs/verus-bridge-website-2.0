'use client'

import React from 'react'
import {Skeleton} from '@nextui-org/react'
import {useQuery} from '@tanstack/react-query'
import {useChainId} from 'wagmi'

import {useTransactionHeight} from '@/lib/hooks/delegator/useTransactionHeight'
import {blockHeightQueryOptions} from '@/lib/queries/blockHeight'

const BlockHeight = ({delegatorAddr}: {delegatorAddr: `0x${string}`}) => {
  const chainId = useChainId()

  const {data: blockHeight, isLoading: blockIsLoading} = useQuery(
    blockHeightQueryOptions(chainId)
  )

  const {data: txHeight, isLoading: heightIsLoading} = useTransactionHeight(
    chainId,
    delegatorAddr
  )

  return (
    <div className="mb-3 flex flex-col pl-1.5 md:pl-3">
      <Skeleton isLoaded={!blockIsLoading} className="rounded-lg">
        <p className="text-sm">
          {Intl.NumberFormat().format(blockHeight!)}{' '}
          {chainId === 1 ? (
            <span className="text-[#828282]">Verus Blockheight</span>
          ) : (
            <span className="text-[#828282]">Verus Testnet Blockheight</span>
          )}
        </p>
      </Skeleton>
      <Skeleton isLoaded={!heightIsLoading} className="rounded-lg">
        <p className="text-sm">
          {Intl.NumberFormat().format(txHeight!)}{' '}
          <span className="text-[#828282]">
            Confirmed Notarized Blockheight
          </span>
        </p>
      </Skeleton>
    </div>
  )
}

export default BlockHeight
