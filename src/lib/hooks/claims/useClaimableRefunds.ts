import {useReadDelegatorRefunds} from '@/generated'
import {useChainId} from 'wagmi'

import {formatHexAddress} from '@/lib/utils/converters/formatHexAddress'
import {unit64ToVerusFloat} from '@/lib/utils/converters/unit64ToVerusFloat'

export const useClaimableRefunds = (
  address: string,
  token: `0x${string}` //token iaddress
) => {
  let formattedAddress = formatHexAddress(
    address,
    'REFUND_CHECK'
  ) as `0x${string}`
  const chainId = useChainId()

  const {data: feeSats} = useReadDelegatorRefunds({
    chainId: chainId as 1 | 11155111,
    args: [formattedAddress, token],
  })

  formattedAddress = formatHexAddress(address, 'REFUND') as `0x${string}`
  return {
    refundAddr: formattedAddress,
    refund_avail: unit64ToVerusFloat(feeSats || 0n),
  }
}
