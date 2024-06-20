import pkg from '@bitgo/utxo-lib'
import {primitives} from 'verusid-ts-client'

const {crypto} = pkg
export const ethToVerusAddress = (ethAddress: string) => {
  const raddress = crypto.hash160(Buffer.from(ethAddress.slice(2), 'hex'))
  return primitives.toBase58Check(raddress, 60)
}
