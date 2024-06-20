import { delegatorAbi } from '@/generated';
import { useChainId, useReadContracts } from 'wagmi';



import { formatHexAddress } from '@/lib/utils/converters/formatHexAddress';



import { useDelegatorAddress } from '../delegator/useDelegatorAddress';





export const useGetAllRefunds = (address: string, tokenList: TokenList[]) => {
  const chainId = useChainId()
  const delegatorAddr = useDelegatorAddress()
  const formattedAddress = formatHexAddress(
    address,
    'REFUND_CHECK'
  ) as `0x${string}`
  const contracts = tokenList.map((t) => ({
    address: delegatorAddr,
    abi: delegatorAbi,
    functionName: 'refunds',
    chainId: chainId,
    args: [formattedAddress, t.iaddress],
  }))

  return useReadContracts({
    contracts,
    query: {enabled: !!tokenList},
  })
}