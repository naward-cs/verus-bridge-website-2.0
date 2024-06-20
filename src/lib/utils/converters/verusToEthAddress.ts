import {primitives} from 'verusid-ts-client'

export const convertVerustoEthAddress = (vAddress: string): `0x${string}` => {
  const address = primitives.fromBase58Check(vAddress).hash.toString('hex')
  return `0x${address}`
}
