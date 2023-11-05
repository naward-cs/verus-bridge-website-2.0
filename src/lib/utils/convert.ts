import pkg from '@bitgo/utxo-lib'
import BigNumber from 'bignumber.js'
import {primitives} from 'verusid-ts-client'

const {crypto} = pkg
export const toBase58Check = (ethAddress: string) => {
  return primitives.toBase58Check(Buffer.from(ethAddress.slice(2), 'hex'), 102)
}

export const convertVerustoEthAddress = (vAddress: string): `0x${string}` => {
  const address = primitives.fromBase58Check(vAddress).hash.toString('hex')
  return `0x${address}`
}

export const convertEthToVerusAddress = (ethAddress: string) => {
  const raddress = crypto.hash160(Buffer.from(ethAddress.slice(2), 'hex'))

  return primitives.toBase58Check(raddress, 60)
  // return ECPair.fromPublicKeyBuffer(
  //   Buffer.from(ethAddress.slice(2), 'hex'),
  //   networks.verustest
  // ).getAddress()
}

export const coinsToUnits = (coin: BigNumber, decimal: number) => {
  return coin.multipliedBy(BigNumber(10).pow(BigNumber(decimal)))
}

export const coinsToSats = (amount: string) => {
  BigNumber.set({EXPONENTIAL_AT: 1000000, ROUNDING_MODE: BigNumber.ROUND_FLOOR})
  const input = BigNumber(amount)
  return BigNumber(coinsToUnits(input, 8).toFixed(0)).toString()
}
