import {useMemo} from 'react'
import {erc1155ABI} from '@/generated'
import {Contract} from '@ethersproject/contracts'
import {erc721ABI} from 'wagmi'

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

export const useERC721contract = (address: string) => {
  const chainId = NetworkChain()
  const signerOrProvider = useProviderOrSigner({chainId})
  return useMemo(
    () => new Contract(address, erc721ABI, signerOrProvider),
    [address, signerOrProvider]
  )
}

export const useERC1155contract = (address: string) => {
  const chainId = NetworkChain()
  const signerOrProvider = useProviderOrSigner({chainId})
  return useMemo(
    () => new Contract(address, erc1155ABI, signerOrProvider),
    [address, signerOrProvider]
  )
}
