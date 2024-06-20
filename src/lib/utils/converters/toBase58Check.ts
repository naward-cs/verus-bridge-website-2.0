import {primitives} from 'verusid-ts-client'

export const toBase58Check = (ethAddress: string) => {
  return primitives.toBase58Check(Buffer.from(ethAddress.slice(2), 'hex'), 102)
}
