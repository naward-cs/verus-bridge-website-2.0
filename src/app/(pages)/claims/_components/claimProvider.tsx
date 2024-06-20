'use client'

import {createContext, useContext} from 'react'

export type ClaimType = 'refund' | 'fees'

type ClaimContext = {
  claimType: ClaimType
  setClaimType: (type: ClaimType) => void
}

export const ClaimContext = createContext<ClaimContext>({} as ClaimContext)

export const useClaimContext = () => useContext(ClaimContext)
