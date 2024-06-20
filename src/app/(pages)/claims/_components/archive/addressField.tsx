import React from 'react'

import {Input} from '@/components/form/input'

import {useAddressContext} from './addressContext'

const AddressField = () => {
  const {addressInfo, setAddressInfo} = useAddressContext()
  const {address, addressType} = addressInfo
  return (
    <Input
      aria-label="Send to Address"
      isDisabled={addressType !== 'verus'}
      autoComplete="on"
      color="background"
      isClearable
      onValueChange={(address) => setAddressInfo({address, addressType})}
      onClear={() => {
        setAddressInfo({addressType, address: ''})
      }}
      value={address}
      description="VerusID, I/R-Address"
      placeholder="Enter Destination Verus Address"
    />
  )
}

export default AddressField
