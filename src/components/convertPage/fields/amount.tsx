import React from 'react'
import {Controller, useFormContext} from 'react-hook-form'

import {useBalances, ValidateAmount} from '@/lib/hooks/balance'
import {InputField} from '@/components/formFields/inputField'

const Amount = () => {
  const {control, setValue, clearErrors} = useFormContext()
  const {isEth, isConnected, EthBalance, ErcBalance} = useBalances()

  return (
    <div className="max-w-xs">
      <Controller
        control={control}
        name="fromAmount"
        rules={{
          required: 'Insert amount',
          validate: (value) =>
            ValidateAmount(value, isEth, isConnected, EthBalance, ErcBalance),
        }}
        render={({field: {value, onChange}}) => (
          <InputField
            aria-label="From Amount"
            color="transparent"
            isClearable
           onValueChange={onChange}
            onClear={() => {
              setValue('fromAmount', '')
              clearErrors('fromAmount')
            }}
            value={value}
            placeholder="0.00"
          />
        )}
      />
    </div>
  )
}

export default Amount
