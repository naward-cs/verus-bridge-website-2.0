import React from 'react'
import {Radio, RadioGroup} from '@nextui-org/react'
import {Controller, useFormContext} from 'react-hook-form'

const RadioField = () => {
  const {control} = useFormContext()
  return (
    <Controller
      control={control}
      name="claimMethod"
      render={({field: {value, onChange}}) => (
        <RadioGroup
          orientation="horizontal"
          value={value}
          onValueChange={onChange}
        >
          <Radio value="publicKey">Use your Public Key to claim</Radio>
          <Radio value="claimType">Fees/Refund (Claim Type)</Radio>
        </RadioGroup>
      )}
    />
  )
}

export default RadioField
