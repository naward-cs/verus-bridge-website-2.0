'use client'

import React from 'react'

import {AddressContext} from './addressContext'
import AddressField from './addressField'
import AddressTypeField from './addressType'
import AvailableClaims from './availableClaims'

import type {AddressTypes} from './addressContext'

// const PubkeyFees = dynamic(() => import('./pubkeyFees'), {ssr: false})
// import ClaimTypeField from './claimTypeField'

//NOTE: Refunds can only be Verus address (Cannot use public Key)
//NOTE: Fees can be either public key or verus address
//NOTE: R-address priv key should be imported to be cheaper for fees

const ClaimForm = () => {
  const [addressInfo, setAddressInfo] = React.useState<AddressTypes>({
    addressType: 'verus',
    address: '',
  })

  return (
    <AddressContext.Provider value={{addressInfo, setAddressInfo}}>
      <div className="flex flex-col space-y-1">
        <AddressTypeField />
        <AddressField />
        <AvailableClaims />
      </div>
    </AddressContext.Provider>
  )
}

export default ClaimForm
