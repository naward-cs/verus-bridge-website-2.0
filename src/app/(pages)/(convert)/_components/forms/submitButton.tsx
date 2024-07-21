'use client'

import {useEffect, useState} from 'react'
import {useDisclosure} from '@nextui-org/react'
import {useFormContext} from 'react-hook-form'
import {useAccount} from 'wagmi'

import {useFormValues} from '@/lib/hooks/form'
import {useRefundAddresses} from '@/lib/hooks/state/refundKeys'
import ConnectButton from '@/components/navbar/web3Button/connectButton'

import RefundAddress from './refundAddress'

const SubmitButton = () => {
  const {address, isConnected} = useAccount()
  const [isReady, setIsReady] = useState(false)
  const {isOpen, onOpen, onOpenChange} = useDisclosure()
  const {toToken, sendOnly, toAddress, fromAmount, rAddress} = useFormValues()
  const {
    formState: {errors},
    setValue,
  } = useFormContext()
  const {refundAddresses} = useRefundAddresses()
  useEffect(() => {
    if (!isReady) {
      if (refundAddresses && address && refundAddresses[address]) {
        setValue('rAddress', refundAddresses[address])
        setIsReady(true)
      }
      if (!!rAddress) {
        setIsReady(true)
      }
    }
  }, [address, isReady, rAddress, refundAddresses, setValue])

  return isConnected ? (
    <>
      <button
        disabled={
          !toAddress ||
          Object.keys(errors).length > 0 ||
          fromAmount === '' ||
          parseFloat(fromAmount) === 0
        }
        className="flex h-[60px] w-full items-center justify-center rounded-lg bg-bluePrimary text-center text-base leading-none text-white hover:bg-[#417DFF] disabled:bg-[#969696] md:text-[1.375rem]"
        type={isReady ? 'submit' : 'button'}
        onClick={() => !isReady && onOpen()}
      >
        {!Object.entries(errors).length ? (
          fromAmount === '' || parseFloat(fromAmount) === 0 ? (
            'Insert amount'
          ) : toToken ? (
            toAddress ? (
              <>Confirm {sendOnly ? 'send' : 'conversion'}</>
            ) : (
              'Fill in receiving address'
            )
          ) : (
            'Select a currency to receive'
          )
        ) : (
          (Object.entries(errors)?.[0]?.[1]?.message as string)
        )}
      </button>
      <RefundAddress
        address={address!}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </>
  ) : (
    <ConnectButton />
  )
}

export default SubmitButton
