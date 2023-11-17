'use client';

import React from 'react';
import {FormProvider, useForm} from 'react-hook-form'

import AddressField from './addressField'
import AvailableClaims from './availableClaims'
import ClaimTypeField from './claimTypeField'

type ClaimFormTypes = {
  claimType: 'fees' | 'refund'
  token?: TokenList
  addressType: 'pubkey' | 'verus'
  address: string
}
//NOTE: Refunds can only be Verus address (Cannot use public Key)
//NOTE: Fees can be either public key or verus address
//NOTE: R-address priv key should be imported to be cheaper for fees
const ClaimForm = () => {
  const formMethods = useForm<ClaimFormTypes>({
    defaultValues: {
      claimType: 'fees',
      token: undefined,
      addressType: 'verus',
      address: '',
    },
    mode: 'onChange',
    reValidateMode: 'onSubmit',
  })

  const onSubmit = async () => {
    return
  }
  return (
    <>
      <FormProvider {...formMethods}>
        <form
          className="flex flex-col space-y-1"
          onSubmit={formMethods.handleSubmit(onSubmit)}
        >
          <AddressField />
          <ClaimTypeField />
          <AvailableClaims />
        </form>
      </FormProvider>
    </>
  )
}

export default ClaimForm