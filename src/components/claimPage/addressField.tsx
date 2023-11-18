import React from 'react'

import {InputField} from '../formFields/inputField'
import {useAddressContext} from './addressContext'

const AddressField = () => {
  const {addressInfo, setAddressInfo} = useAddressContext()
  const {address, addressType} = addressInfo
  return (
    <InputField
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
