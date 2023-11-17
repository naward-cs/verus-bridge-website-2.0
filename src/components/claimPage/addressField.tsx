import React from 'react'
import {Radio, RadioGroup} from '@nextui-org/react'
import {Controller, useFormContext} from 'react-hook-form'

import {useFormValues} from '@/lib/hooks/formValues'

import {InputField} from '../formFields/inputField'

const AddressField = () => {
  const {control, setValue} = useFormContext()
  const {addressType} = useFormValues()

  return (
    <>
      <Controller
        control={control}
        name="addressType"
        render={({field: {value, onChange}}) => (
          <RadioGroup
            orientation="horizontal"
            value={value}
            onValueChange={onChange}
            onChange={() => setValue('address', '')}
            label="Address Type"
          >
            <Radio value="pubkey">Public Key</Radio>

            <Radio value="verus">VerusID or Verus I/R address</Radio>
          </RadioGroup>
        )}
      />

      <Controller
        control={control}
        name="address"
        render={({field: {value, onChange}, fieldState: {error}}) => (
          <InputField
            aria-label="Send to Address"
            isDisabled={addressType !== 'verus'}
            autoComplete="on"
            color="background"
            isClearable
            onChange={onChange}
            onClear={() => {
              setValue('address', '')
            }}
            value={value}
            description="VerusID, I/R-Address"
            placeholder="Enter Destination Verus Address"
            errorMessage={error?.message}
            validationState={error ? 'invalid' : 'valid'}
          />
        )}
      />
    </>
  )
}

export default AddressField
