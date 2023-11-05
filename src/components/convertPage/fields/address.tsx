// import React, {useState} from 'react'
import {Controller, useFormContext} from 'react-hook-form'

// import {useAccount} from 'wagmi'

import {useFormValues} from '@/lib/hooks/formValues'
import {validateAddress} from '@/lib/utils/rules'
import {InputField} from '@/components/formFields/inputField'

const Address = () => {
  // const {address} = useAccount()
  const {control, setValue, clearErrors} = useFormContext()
  const {sendOnly, toToken} = useFormValues()
  // const [isSelected, setIsSelected] = useState(false)

  if (!toToken) return null
  //TODO: add switch to use self address
  return (
    <div className="flex flex-col rounded-lg bg-[#ddd] px-6 py-4 text-lg">
      <Controller
        control={control}
        name="toAddress"
        rules={{
          required: true,
          validate: (value) => validateAddress(value, sendOnly),
        }}
        render={({field: {value, onChange}, fieldState: {error}}) => (
          <InputField
            aria-label="Send to Address"
            autoComplete="on"
            color="transparent"
            isClearable
            onChange={onChange}
            value={value}
            placeholder={
              sendOnly
                ? 'Enter Destination Verus Address'
                : 'Enter Address or VerusID'
            }
            onClear={() => {
              setValue('toAddress', '')
              clearErrors('toAddress')
            }}
            description="VerusID, I/R-Address (Convert or Send) | Ethereum address (Convert Only)"
            errorMessage={error?.message}
            validationState={error ? 'invalid' : 'valid'}
          />
        )}
      />
    </div>
  )
}

export default Address
