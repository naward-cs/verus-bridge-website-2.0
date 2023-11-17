import React from 'react'
import {Radio, RadioGroup} from '@nextui-org/react'
import {Controller, useFormContext} from 'react-hook-form'

const ClaimTypeField = () => {
  const {control} = useFormContext()

  return (
    <Controller
      control={control}
      name="claimType"
      render={({field: {value, onChange}}) => (
        <RadioGroup
          orientation="horizontal"
          value={value}
          onValueChange={onChange}
          label="Claim Type"
        >
          <Radio value="fees">Fees</Radio>

          <Radio value="refund">Refund</Radio>
        </RadioGroup>
      )}
    />
  )
}

export default ClaimTypeField
