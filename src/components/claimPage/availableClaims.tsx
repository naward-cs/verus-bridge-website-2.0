'use client'

import React, {Suspense} from 'react'

import {useFormValues} from '@/lib/hooks/formValues'

import FeesAvailable from './feesAvailable'
import RefundsAvailable from './refundsAvailable'

const AvailableClaims = () => {
  //TODO: need to make this auto generate
  const {addressType} = useFormValues()
  if (addressType === 'pubkey') {
    //can only return fees and not refunds
    return <FeesAvailable />
  }
  return (
    <>
      <Suspense fallback="Checking for available refundable fees....">
        <FeesAvailable />
      </Suspense>
      <RefundsAvailable />
    </>
  )
}

export default AvailableClaims
