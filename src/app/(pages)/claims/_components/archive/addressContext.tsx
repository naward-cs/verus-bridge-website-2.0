'use client'

import {createContext, useContext} from 'react'

export type AddressTypes = {
  addressType: 'pubkey' | 'verus'
  address: string
}

type AddressContext = {
  addressInfo: AddressTypes
  setAddressInfo: (info: AddressTypes) => void
}
export const AddressContext = createContext<AddressContext>(
  {} as AddressContext
)
export const useAddressContext = () => useContext(AddressContext)
