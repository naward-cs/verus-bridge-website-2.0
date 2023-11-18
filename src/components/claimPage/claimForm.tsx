'use client';

import React, {createContext, useContext} from 'react'
import {FormProvider, useForm} from 'react-hook-form'

import AddressField from './addressField'
import AvailableClaims from './availableClaims'

// import ClaimTypeField from './claimTypeField'

type ClaimFormTypes = {
  claimType: 'fees' | 'refund'
  token?: TokenList
  addressType: 'pubkey' | 'verus'
  address: string
}

//NOTE: Refunds can only be Verus address (Cannot use public Key)
//NOTE: Fees can be either public key or verus address
//NOTE: R-address priv key should be imported to be cheaper for fees

const ClaimContext = createContext<Omit<ClaimFormTypes, 'claimType' | 'token'>>(
  {
    addressType: 'verus',
    address: '',
  }
)
export const useClaimContext = () => useContext(ClaimContext)
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
  const [claimValues, setClaimValues] = React.useState<
    Omit<ClaimFormTypes, 'claimType' | 'token'>
  >({
    addressType: 'verus',
    address: '',
  })

  const onSubmit = async (
    values: Omit<ClaimFormTypes, 'claimType' | 'token'>
  ) => {
    //TODO: check if verusid, get i-address
    setClaimValues(values)
  }
  return (
    <>
      <FormProvider {...formMethods}>
        <form
          className="flex flex-col space-y-1"
          onSubmit={formMethods.handleSubmit(onSubmit)}
        >
          <AddressField />
          {/* <ClaimTypeField />
          <AvailableClaims /> */}
        </form>
      </FormProvider>
      <ClaimContext.Provider value={claimValues}>
        <div className="flex flex-col space-y-1">
          <AvailableClaims />
        </div>
      </ClaimContext.Provider>
    </>
  )
}

export default ClaimForm