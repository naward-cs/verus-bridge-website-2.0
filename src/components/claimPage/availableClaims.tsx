'use client';

import React from 'react'

import {useAddressContext} from './addressContext'





// import { useFormValues } from '@/lib/hooks/formValues';

const AvailableClaims = () => {
  const {addressInfo} = useAddressContext()
  //TODO: need to make this auto generate

  return (
    <div>
      <p>{addressInfo.addressType}</p>
      <p>{addressInfo.address}</p>
    </div>
  )
}

export default AvailableClaims