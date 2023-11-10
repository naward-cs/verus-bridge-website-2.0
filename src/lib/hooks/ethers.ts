import {useEffect, useState} from 'react'
import {computePublicKey} from '@ethersproject/signing-key'
import {hashMessage, recoverPublicKey} from 'viem'
import {useAccount, useSignMessage} from 'wagmi'

import {convertEthToVerusAddress} from '@/lib/utils/convert'

export const useEthers = () => {
  const {address} = useAccount()
  const msg = 'Agreeing to this will create a public key for Verus Refunds'
  // const [sigMessage, setSigMessage] = useState<EtherType>()
  const [refundAddresses, setRefundAddresses] =
    useState<Record<`0x${string}`, string>>()
  const [error, setError] = useState<Error>()
  const {signMessageAsync: signMsg} = useSignMessage({
    message: msg,

    onSuccess(sigMessage) {
      //reset error if previous error
      if (error) setError(undefined)
      async function getInfo() {
        const pubKey = await recoverPublicKey({
          hash: hashMessage(msg),
          signature: sigMessage,
        })
        const compressed = computePublicKey(pubKey, true)
        const rAddress = convertEthToVerusAddress(compressed)
        localStorage.setItem(
          'refundAddresses',
          JSON.stringify({...refundAddresses, [address!]: rAddress})
        )
        setRefundAddresses({...refundAddresses, [address!]: rAddress})
      }
      getInfo()
      // For historical reasons, you must submit the message to sign in hex-encoded UTF-8.
      // This uses a Node.js-style buffer shim in the browser.

      // const publicKey = SigningKey.recoverPublicKey(id(msg), sigMessage)

      // Compress key
      // const compressed = SigningKey.computePublicKey(publicKey, true)

      // const rAddress = convertEthToVerusAddress(compressed)
      // localStorage.setItem(
      //   'refundAddresses',
      //   JSON.stringify({...refundAddresses, [address!]: rAddress})
      // )
      // setRefundAddresses({...refundAddresses, [address!]: rAddress})
    },
    onError(error) {
      setError(error)
    },
  })

  useEffect(() => {
    if (address) {
      const keys = localStorage.getItem('refundAddresses')
      if (keys) {
        const publicKeyList = JSON.parse(keys)
        setRefundAddresses(publicKeyList)
      }
    }
  }, [address])

  return {refundAddresses, error, signMsg}
}
