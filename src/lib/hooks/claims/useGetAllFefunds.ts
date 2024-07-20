import {delegatorAbi} from '@/generated'
import {useChainId, useReadContracts} from 'wagmi'

import FormatAddress from '@/lib/utils/formatAddress'

import {useDelegatorAddress} from '../delegator/useDelegatorAddress'

export const useGetAllRefunds = (address: string, tokenList: TokenList[]) => {
  const chainId = useChainId()
  const delegatorAddr = useDelegatorAddress()
  const formattedAddress = FormatAddress(address)
  const contracts = tokenList.map((t) => ({
    address: delegatorAddr,
    abi: delegatorAbi,
    functionName: 'refunds',
    chainId: chainId,
    args: [formattedAddress, t.iaddress],
  }))

  return useReadContracts({
    contracts,
    query: {enabled: !!tokenList && !!address},
  })
}
