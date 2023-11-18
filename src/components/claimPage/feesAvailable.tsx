'use client';

import React from 'react';
import { useAccount } from 'wagmi';



// import { useFormValues } from '@/lib/hooks/formValues';
import { useClaimContext } from './claimForm';





const FeesAvailable = () => {
  //this section shows available fees pending if
  // public key (wallet connected)
  // verus address (wallet is/not connected)
  // NOTE: wallet must be connected to process
  //TODO: make this auto detect based on ether wallet connected or not
  // const {address, addressType} = useFormValues()
  const {address, addressType} = useClaimContext()
  const {isConnected} = useAccount()

  if (addressType === 'pubkey' && !isConnected) {
    return <p>Must connect Wallet first to check for available fee returns</p>
  } else if (
    (addressType === 'pubkey' && isConnected) ||
    (addressType === 'verus' && address) //TODO:make this conditional on valid address
  ) {
    return <p>available refundable fees</p>
  } else {
    return null
  }
}

export default FeesAvailable