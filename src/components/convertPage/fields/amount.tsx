import React from 'react'
import {Controller, useFormContext} from 'react-hook-form'

import {useBalances, ValidateAmount} from '@/lib/hooks/balance'
import {InputField} from '@/components/formFields/inputField'

const Amount = () => {
  const {control} = useFormContext()
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
            type="number"
            lang="en-US"
            color="transparent"
            onValueChange={onChange}
            value={value}
            placeholder="0.00"
          />
        )}
      />
    </div>
  )
}

export default Amount
