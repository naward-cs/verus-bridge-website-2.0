import React from 'react';
import {delegatorABI} from '@/generated'
import {Contract} from 'ethers'

import {useEtherSigner} from '../utils/ethersProvider'
import {DelegatorAddress} from './network'

export const useContract = () => {
  const delegatorAddr = DelegatorAddress()
  const signer = useEtherSigner()
  return React.useMemo(
    () => new Contract(delegatorAddr, delegatorABI, signer),
    [delegatorAddr, signer]
  )
}