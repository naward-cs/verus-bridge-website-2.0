'use client'

import React, {useState} from 'react'
import {Controller, useForm} from 'react-hook-form'

import {Input} from '@/components/form/input'

import RefundAvailable from './refundAvailable'

type RefundForm = {
  address: string
}

const Refund = ({tokenList}: {tokenList: TokenList[]}) => {
  const [address, setAddress] = useState<string>('')
  const {control, handleSubmit} = useForm<RefundForm>({
    defaultValues: {
      address: '',
    },
    mode: 'onChange',
    reValidateMode: 'onSubmit',
  })

  const GetRefunds = async (values: RefundForm) => {
    setAddress(values.address)
  }

  return (
    <section className="w-full max-w-xl  px-1.5">
      <form
        onSubmit={handleSubmit(GetRefunds)}
        className="flex flex-col items-end gap-2 md:flex-row "
      >
        <Controller
          name="address"
          control={control}
          render={({field: {value, onChange}}) => (
            <Input
              aria-label="Refund Address"
              autoComplete="on"
              classNames={{
                label: 'font-normal',
                input:
                  'text-black/90 placeholder:text-default-700/50 text-base placeholder:font-medium py-5',
                inputWrapper:
                  'border-small rounded-lg border-[#BBB] data-[hover=true]:border-[#8B8B8B] group-data-[focus=true]:border-bluePrimary bg-[#F5F5F5] pl-4 h-unit-13',
                errorMessage: 'font-medium',
              }}
              isClearable
              onValueChange={onChange}
              value={value}
              labelPlacement="outside"
              label="Use Verus R- or i-address to check for available refunds"
              placeholder="Enter Verus Address"
            />
          )}
        />
        <button
          type="submit"
          className="h-fit rounded-lg bg-bluePrimary px-3 py-2 text-center font-medium text-white disabled:bg-[#969696]"
        >
          Check
        </button>
      </form>
      {address && <RefundAvailable address={address} tokenList={tokenList} />}
    </section>
  )
}

export default Refund
