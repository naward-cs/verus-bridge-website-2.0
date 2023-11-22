import {useDelegatorClaimableFees, useDelegatorRefunds} from '@/generated'

import {formatHexAddress} from '@/lib/utils/claimUtil'
import {unit64ToVerusFloat} from '@/lib/utils/convert'

import {NetworkChain} from './network'

export const useClaimableFees = (
  address: string,
  type: 'FEE' | 'PUBLIC_KEY'
) => {
  let formattedAddress
  if (address) {
    formattedAddress = formatHexAddress(address, type) as `0x${string}`
  }
  const chainId = NetworkChain()

  const {data: feeSats} = useDelegatorClaimableFees({
    chainId,
    args: [formattedAddress!],
    staleTime: 2_000,
    enabled: !!formattedAddress,
  })
  return {
    refundAddr: formattedAddress,
    fee_avail: unit64ToVerusFloat(feeSats || 0n),
  }
}

export const useClaimableRefunds = (
  address: string,
  token: `0x${string}` //token iaddress
) => {
  let formattedAddress = formatHexAddress(
    address,
    'REFUND_CHECK'
  ) as `0x${string}`
  const chainId = NetworkChain()

  const {data: feeSats} = useDelegatorRefunds({
    chainId,
    args: [formattedAddress, token],
  })

  formattedAddress = formatHexAddress(address, 'REFUND') as `0x${string}`
  return {
    refundAddr: formattedAddress,
    refund_avail: unit64ToVerusFloat(feeSats || 0n),
  }
}
