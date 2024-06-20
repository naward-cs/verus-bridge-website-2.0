import {useReadDelegatorClaimableFees} from '@/generated'
import {useChainId} from 'wagmi'

import {formatHexAddress} from '@/lib/utils/converters/formatHexAddress'
import {unit64ToVerusFloat} from '@/lib/utils/converters/unit64ToVerusFloat'

export const useClaimableFees = (
  address: string,
  type: 'FEE' | 'PUBLIC_KEY'
) => {
  let formattedAddress
  if (address) {
    formattedAddress = formatHexAddress(address, type) as `0x${string}`
  }
  const chainId = useChainId()

  const {data: feeSats} = useReadDelegatorClaimableFees({
    chainId: chainId as 1 | 11155111 | undefined,
    args: [formattedAddress!],
    query: {staleTime: 2_000, enabled: !!formattedAddress},
  })
  return {
    refundAddr: formattedAddress,
    fee_avail: unit64ToVerusFloat((feeSats as bigint) || 0n), //TODO: need to verify if the generated format will work
  }
}

export default useClaimableFees
