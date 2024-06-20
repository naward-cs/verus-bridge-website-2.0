'use client'

import {useEffect, useRef, useState} from 'react'
import {computePublicKey} from '@ethersproject/signing-key'
import {toast} from 'sonner'
import {hashMessage, recoverPublicKey} from 'viem'
import {useAccount, useSignMessage} from 'wagmi'

import {ethToVerusAddress} from '@/lib/utils/converters/ethToVerusAddress'

const useEthers = () => {
  const [isLoading, setIsLoading] = useState(false)
  const {address} = useAccount()

  const {
    data: signData,
    error: signError,
    signMessageAsync: signMsg,
    signMessage: signMsgNonAsync,
  } = useSignMessage()

  const msg =
    'Agreeing to this will create a Verus refund address on the Verus blockchain.'

  const refundAddresses = useRef<Record<`0x${string}`, string>>()
  const refundcKey = useRef<Record<`0x${string}`, {x1: string; x2: string}>>()
  useEffect(() => {
    if (address) {
      let keys = localStorage.getItem('refundAddresses')
      if (keys) {
        refundAddresses.current = JSON.parse(keys)
      }
      keys = localStorage.getItem('refundcKeys')
      if (keys) {
        refundcKey.current = JSON.parse(keys)
      }
    }
  }, [address])

  useEffect(() => {
    async function getInfo() {
      setIsLoading(true)
      const pubKey = await recoverPublicKey({
        hash: hashMessage(msg),
        signature: signData as `0x${string}`,
      })
      const cKey = {
        x1: pubKey.slice(4, 68),
        x2: pubKey.slice(68, 132),
      }

      const compressed = computePublicKey(pubKey, true)
      const rAddress = ethToVerusAddress(compressed)
      localStorage.setItem(
        'refundcKeys',
        JSON.stringify({...refundcKey, [address!]: cKey})
      )
      localStorage.setItem(
        'refundAddresses',
        JSON.stringify({...refundAddresses, [address!]: rAddress})
      )
      refundAddresses.current = {
        ...refundAddresses.current,
        [address!]: rAddress,
      }
      refundcKey.current = {...refundcKey.current, [address!]: cKey}
      setIsLoading(false)
    }
    if (signError) {
      toast.error(
        'You must agree to create a public key address for Verus Refunds before sending or converting',
        {
          action: {label: 'Try Again', onClick: () => signMsg({message: msg})},
        }
      )
    } else {
      if (signData) {
        getInfo()
      }
    }
  }, [address, signData, signError, signMsg])

  return {
    refundAddresses,
    refundcKey,
    isLoading,
    signMsg,
    signMsgNonAsync,
    msg,
    signError
  }
}

export default useEthers
