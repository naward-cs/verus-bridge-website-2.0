import {useMemo} from 'react'
import {Contract} from '@ethersproject/contracts'
import {useChainId} from 'wagmi'

import DelegatorAbi from '@/config/abi/DelegatorAbiJson.json'

import {useDelegatorAddress} from '../delegator/useDelegatorAddress'
import {useProviderOrSigner} from './useEthersProvider'

export const useDelegatorContract = () => {
  const delegatorAddr = useDelegatorAddress()
  const chainId = useChainId()
  const signerOrProvider = useProviderOrSigner({chainId})
  return useMemo(
    () => new Contract(delegatorAddr, DelegatorAbi, signerOrProvider),
    [delegatorAddr, signerOrProvider]
  )
}
