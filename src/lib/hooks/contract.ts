import {useMemo} from 'react'
import {Contract} from '@ethersproject/contracts'

import DelegatorAbi from '@/config/abi/DelegatorAbiJson.json'
import {useProviderOrSigner} from '@/lib/utils/ethersProvider'

import {DelegatorAddress, NetworkChain} from './network'

export const useDelgatorContract = () => {
  const delegatorAddr = DelegatorAddress()
  const chainId = NetworkChain()
  const signerOrProvider = useProviderOrSigner({chainId})
  return useMemo(
    () => new Contract(delegatorAddr, DelegatorAbi, signerOrProvider),
    [delegatorAddr, signerOrProvider]
  )
}
