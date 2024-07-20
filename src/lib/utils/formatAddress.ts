import {formatHexAddress} from './converters/formatHexAddress'

const FormatAddress = (address: string) => {
  return formatHexAddress(address, 'REFUND_CHECK') as `0x${string}`
}

export default FormatAddress
