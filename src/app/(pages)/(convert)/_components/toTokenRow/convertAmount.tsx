'use client'

import BigNumber from 'bignumber.js'

import {useFormValues} from '@/lib/hooks/form'
import {useConvesionRate} from '@/lib/hooks/verus/useConvesionRate'
import {cn} from '@/lib/utils'

const ConvertAmount = () => {
  const {fromToken, toToken, fromAmount, sendOnly} = useFormValues()

  const {data} = useConvesionRate({fromToken, toToken})

  const conversion =
    data?.value && fromAmount
      ? new BigNumber(data.value)
          .times(new BigNumber(fromAmount))
          .decimalPlaces(5)
          .toString()
      : '0.00'
  return (
    <p
      className={cn(
        'pr-3 text-[2rem] font-medium leading-none',
        conversion === '0.00' && 'text-default-700/50'
      )}
    >
      {sendOnly ? (fromAmount ? fromAmount : '0.00') : conversion}
    </p>
  )
}

export default ConvertAmount
