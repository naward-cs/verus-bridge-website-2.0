import List from '@/data/exclude.json'
// import {isAddress} from '@ethersproject/address'
import {isAddress} from 'viem'

export const isRAddress = (address: string) =>
  /^R[1-9A-HJ-NP-Za-km-z]{33,34}$/.test(address)
export const isIAddress = (address: string) =>
  /^i[1-9A-HJ-NP-Za-km-z]{33,34}$/.test(address)
export const isETHAddress = (address: string) => {
  //TODO test how array is actually built
  let addressFound = false
  if (List.ETH.length > 0) {
    const list = List.ETH as string[]
    // List?.ETH.length ? List.ETH.indexOf(address) > -1 : false
    addressFound = list.indexOf(address) > -1
  }
  // return !addressFound && /^(0x)?[0-9a-fA-F]{40}$/.test(address)
  return !addressFound && isAddress(address.toLowerCase())
}

//This is to check if fromToken is the primary ETH address
export const isEth = (address: string) => /^(0x)?[0]{40}$/.test(address)

export const validateAddress = (address: string, sendOnly?: boolean) => {
  const isVerus = isIAddress(address) || address.slice(-1) === '@'
  if (sendOnly) {
    if (isVerus || isRAddress(address)) {
      return true
    } else {
      return 'Enter correct Verus address'
    }
  } else {
    if (isETHAddress(address) || isRAddress(address) || isVerus) {
      return true
    } else {
      return 'Address is not valid'
    }
  }
}

export const validateNFTAddress = (address: string) => {
  if (isIAddress(address) || isRAddress(address)) {
    return true
  } else {
    return 'Address is not valid'
  }
}

export const NFTAddressType = (address: string) => {
  if (isIAddress(address)) return '04'
  else if (isRAddress(address)) return '02'
  else return 'Address is not valid'
}

export const validateETHAddress = (address: string) => {
  if (isETHAddress(address)) {
    return true
  } else {
    return 'Address is not valid'
  }
}

export const validateClaimAddress = (address: string, usePublicKey: string) => {
  if (usePublicKey) {
    return true
  }
  if (isIAddress(address) || isRAddress(address)) {
    return true
  } else {
    return 'Address is not valid'
  }
}
