import {primitives} from 'verusid-ts-client'

export type CLAIM_TYPE = 'FEE' | 'REFUND' | 'REFUND_CHECK' | 'PUBLIC_KEY'

export const formatHexAddress = (address: string, type?: CLAIM_TYPE) => {
  try {
    const verusAddress = primitives.fromBase58Check(address)
    let return_value
    switch (verusAddress.version) {
      case 60: //R-address
        return_value = `0214${verusAddress.hash.toString('hex')}`
        break
      case 102: //I-address
        return_value = `0414${verusAddress.hash.toString('hex')}`
        break
      default:
        return null
    }

    if (type === 'REFUND_CHECK') {
      return_value = Buffer.from(return_value.padStart(64, '0'), 'hex')
      return_value[1] = 16
      return `0x${return_value.toString('hex')}`
    }
    if (type === 'FEE' || type === 'PUBLIC_KEY') {
      return_value = Buffer.from(return_value.padStart(64, '0'), 'hex')
      return `0x${return_value.toString('hex')}`
    }
    return `0x${return_value}`
  } catch (error) {}
  return {address, type}
}
