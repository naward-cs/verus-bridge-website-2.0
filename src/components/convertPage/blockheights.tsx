'use client'

import React from 'react'

import {useGetTransactionHeight} from '@/lib/hooks/delegator'
import {NetworkChain} from '@/lib/hooks/network'
import {useGetBLockHeight} from '@/lib/hooks/verus'

//TODO: fix text input hydration

const Blockheights = () => {
  const chainID = NetworkChain()
  const {data: blockHeight} = useGetBLockHeight()
  const {data: txHeight} = useGetTransactionHeight()
  if (!blockHeight || !txHeight) return null
  return (
    <div className="mb-3 flex flex-col pl-1.5 md:pl-3">
      <p className="text-sm">
        {Intl.NumberFormat().format(blockHeight || 0)}{' '}
        {chainID !== 5 ? (
          <span className="text-[#828282]">Verus Blockheight</span>
        ) : (
          <span className="text-[#828282]">Verus Testnet Blockheight</span>
        )}
      </p>

      <p className="text-sm">
        {Intl.NumberFormat().format(txHeight!)}{' '}
        <span className="text-[#828282]">Confirmed Notarized Blockheight</span>
      </p>
    </div>
  )
}

export default Blockheights
