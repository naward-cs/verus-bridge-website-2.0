import React, {useEffect, useState} from 'react'
import BigNumber from 'bignumber.js'

import {useFormValues} from '@/lib/hooks/formValues'
import {useGetCurrencyRate} from '@/lib/hooks/verus'

const ConvertAmount = () => {
  const {fromToken, toToken, fromAmount} = useFormValues()

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

  return <p className="px-3 text-2xl">{conversion}</p>
}

export default ConvertAmount
