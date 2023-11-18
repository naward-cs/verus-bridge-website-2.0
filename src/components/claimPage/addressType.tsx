import React from 'react'
import {Radio, RadioGroup} from '@nextui-org/react'

import {useAddressContext} from './addressContext'

const AddressTypeField = () => {
  const {addressInfo, setAddressInfo} = useAddressContext()
  return (
    <RadioGroup
      orientation="horizontal"
      value={addressInfo.addressType}
      onValueChange={(v: any) => setAddressInfo({address: '', addressType: v})}
      label="Address Type"
    >
      <Radio value="pubkey">Public Key</Radio>

      <Radio value="verus">VerusID or Verus I/R address</Radio>
    </RadioGroup>
  )
}

export default AddressTypeField
