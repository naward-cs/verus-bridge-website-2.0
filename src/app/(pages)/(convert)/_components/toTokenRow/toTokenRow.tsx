import React from 'react'

import {getDestinationList} from '@/lib/server/actions/getDestinationList'
import {getTokenList} from '@/lib/server/actions/getTokenList'

import ConvertAmount from './convertAmount'
import ToTokenModal from './toToken'

export const ToTokenRow = async () => {
  const destinationList = await getDestinationList()
  const tokenList = await getTokenList()
  return (
    <div className="flex min-h-[120px] flex-col justify-start rounded-lg border border-transparent bg-[#DDD] p-4 py-5 hover:border-[#b6b6b6]">
      <p className="text-sm">You receive</p>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <ConvertAmount />

        <ToTokenModal
          sendList={destinationList.tokenListFromDelegator}
          bridgeList={destinationList.verusList}
          tokenList={tokenList}
        />
      </div>
    </div>
  )
}
