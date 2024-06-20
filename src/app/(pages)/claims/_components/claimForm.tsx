'use client';

import React, {useState} from 'react'

import ClaimInfo from './claimInfo'
import ClaimNav from './claimNav'
import {ClaimContext} from './claimProvider'
import ClaimSection from './claimSection'

import type {ClaimType} from './claimProvider'

const ClaimForm = ({tokenList}: {tokenList: TokenList[]}) => {
  const [claimType, setClaimType] = useState<ClaimType>('refund')
  return (
    <ClaimContext.Provider value={{claimType, setClaimType}}>
      <div className="flex w-full flex-col items-center gap-16">
        <ClaimNav />
        <ClaimSection tokenList={tokenList} />
        <ClaimInfo />
      </div>
    </ClaimContext.Provider>
  )
}

export default ClaimForm