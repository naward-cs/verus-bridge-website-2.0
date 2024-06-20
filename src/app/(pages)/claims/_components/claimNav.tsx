import React from 'react'

import {cn} from '@/lib/utils'

import {useClaimContext} from './claimProvider'

const defaultCSS = 'w-36 cursor-pointer py-1.5 text-center text-[#444444]'
const selectedCSS =
  'rounded-t-lg border-2 border-b-0 border-bluePrimary text-black'
const ClaimNav = () => {
  const {claimType, setClaimType} = useClaimContext()
  return (
    <div className="flex w-full max-w-sm justify-center border-b-2 border-bluePrimary text-lg font-medium">
      <div
        className={cn(
          'w-36 cursor-pointer py-1.5 text-center text-[#444444]',
          claimType === 'refund' &&
            'rounded-t-lg border-2 border-b-0 border-bluePrimary  text-black'
        )}
        onClick={() => setClaimType('refund')}
      >
        Refunds
      </div>
      <div
        className={cn(defaultCSS, claimType === 'fees' && selectedCSS)}
        onClick={() => setClaimType('fees')}
      >
        Fee claims
      </div>
    </div>
  )
}

export default ClaimNav
