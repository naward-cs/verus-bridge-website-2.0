import React, { useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';



import { useFormValues } from '@/lib/hooks/formValues';
import { useGetCurrencyRate } from '@/lib/hooks/verus';
import {cn} from '@/lib/utils/tailwindUtil'

const ConvertAmount = () => {
  const {fromToken, toToken, fromAmount, sendOnly} = useFormValues()

  const [conversion, setConversion] = useState('0.00')
  const {data} = useGetCurrencyRate(fromToken, toToken)
  useEffect(() => {
    if (fromAmount && fromAmount > 0 && fromAmount && toToken && data) {
      const rate = new BigNumber(data.value)
        .times(new BigNumber(fromAmount))
        .decimalPlaces(5)
      setConversion(rate.toString())
    } else {
      setConversion('0.00')
    }
  }, [data, fromAmount, toToken])

  return (
    <p
      className={cn(
        'pr-3 text-[2rem] font-medium leading-none',
        conversion === '0.00' && 'text-default-700/50'
      )}
    >
      {sendOnly ? fromAmount : conversion}
    </p>
  )
}

export default ConvertAmount