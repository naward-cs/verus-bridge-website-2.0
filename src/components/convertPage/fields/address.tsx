;
// import React, {useState} from 'react'
import { Input } from '@nextui-org/react';
import { Controller, useFormContext } from 'react-hook-form';
import { useAccount } from 'wagmi';



// import {useAccount} from 'wagmi'

import { useFormValues } from '@/lib/hooks/formValues';
import { validateAddress } from '@/lib/utils/rules';
import { Icons } from '@/components/shared/icons';





const Address = () => {
  const {address} = useAccount()
  const {control, setValue, clearErrors} = useFormContext()
  const {sendOnly, toToken} = useFormValues()
  // const [isSelected, setIsSelected] = useState(false)

  if (!toToken) return null
  //TODO: add switch to use self address
  return (
    <div className="flex flex-col py-4 text-lg">
      <Controller
        control={control}
        name="toAddress"
        rules={{
          required: true,
          validate: (value) => validateAddress(value, sendOnly),
        }}
        render={({field: {value, onChange}, fieldState: {error}}) => (
          <Input
            aria-label="Send to Address"
            autoComplete="on"
            variant="bordered"
            classNames={{
              label: 'font-medium',
              input:
                'text-black/90 placeholder:text-default-700/50 text-base placeholder:font-medium',
              
              inputWrapper:
                'border-small rounded-lg border-[#BBB] data-[hover=true]:border-[#8B8B8B] group-data-[focus=true]:border-bluePrimary bg-[#F5F5F5]',
              errorMessage: 'font-medium',
            }}
            onChange={onChange}
            labelPlacement="outside"
            label="Use Verus (VerusID@, R-,i-address) or Ethereum address."
            value={value}
            placeholder="Enter receiving address"
            endContent={
              <div className="flex items-center space-x-1">
                {value && (
                  <button
                    className="text-[#BBB] hover:text-bluePrimary"
                    onClick={() => {
                      setValue('toAddress', '')
                      clearErrors('toAddress')
                    }}
                  >
                    <Icons.clear />
                  </button>
                )}
                <button
                  className="text-sm font-medium"
                  onClick={() => setValue('toAddress', address)}
                >
                  SELF
                </button>
              </div>
            }
            errorMessage={error?.message}
            isInvalid={error ? true : false}
          />
        )}
      />
    </div>
  )
}

export default Address