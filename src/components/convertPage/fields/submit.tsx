import React, {useState} from 'react'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from '@nextui-org/react'
import {useFormContext} from 'react-hook-form'
// import {useWeb3Modal} from '@web3modal/wagmi/react'
// import { useFormContext } from 'react-hook-form'
import {useAccount, useConnect} from 'wagmi'

import {useFormValues} from '@/lib/hooks/formValues'
import {useIsMounted} from '@/lib/hooks/mounted'
import {isETHAddress} from '@/lib/utils/rules'
import {Icons} from '@/components/shared/icons'

export const WarnContent = () => {
  return (
    <div className="max-w-[280px] space-y-3 py-2 text-xs">
      <p>
        The Verus-Ethereum Bridge is truly trustless, non-custodial and proven
        by consensus. The Ethereum smart contract and Verus blockchain need to
        be sure that the transactions are safe to complete.
      </p>

      {/* <Link className="text-xs" isExternal underline="always" href="/">
        Learn more
      </Link> */}
    </div>
  )
}

const SubmitWarn = () => {
  const [isOpen, setIsOpen] = useState(false)

  const {toAddress} = useFormValues()

  return (
    <div className="flex w-fit items-center space-x-2.5 rounded-2xl bg-[#F4EEEE] px-2 py-1 text-[#C58484]">
      <Icons.iInfo className="h-full w-4 text-[#D95757] " />
      <p className=" text-xs">
        It can take up to
        {toAddress && isETHAddress(toAddress) ? ' 2 hours ' : ' 60 mins '}
        before you receive the currency.{' '}
        <Tooltip
          showArrow
          placement="bottom"
          content={WarnContent()}
          isOpen={isOpen}
          onOpenChange={(open) => setIsOpen(open)}
          delay={1000}
        >
          <span
            onClick={() => setIsOpen(!isOpen)}
            className="font-medium text-bluePrimary"
          >
            Why?
          </span>
        </Tooltip>
      </p>
    </div>
  )
}
const FormSubmitButton = () => {
  const {toToken, sendOnly, toAddress, fromAmount} = useFormValues()
  const {
    formState: {errors},
  } = useFormContext()
  //if not connected to wallet, connect to wallet

  return (
    <>
      <button
        disabled={
          !toAddress ||
          Object.keys(errors).length > 0 ||
          fromAmount === '' ||
          parseFloat(fromAmount) === 0
        }
        className="flex h-[60px] w-full items-center justify-center rounded-lg bg-bluePrimary text-center text-base font-medium  leading-none text-white hover:bg-[#417DFF] disabled:bg-[#969696] md:text-[1.375rem]"
        type="submit"
        // disabled={(!toToken && !toAddress) || isSubmitting || pending}
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
      <SubmitWarn />
    </>
  )
}
const ConnectSubmitButton = () => {
  const {isConnecting} = useAccount()
  // const {open} = useWeb3Modal()

  // return (
  //   <button
  //     className="flex w-full items-center justify-center rounded-lg bg-bluePrimary px-4 py-3 text-center font-geo text-base font-normal text-white disabled:bg-[#969696] md:text-lg"
  //     type="button"
  //     disabled={isConnecting}
  //     onClick={() => open()}
  //   >
  //     Connect Wallet
  //   </button>
  // )
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure()

  const {connect, connectors} = useConnect()

  return (
    <>
      <button
        onClick={onOpen}
        disabled={isConnecting}
        type="button"
        className="flex w-full items-center justify-center rounded-lg bg-bluePrimary px-4 py-3 text-center text-base font-medium text-white hover:bg-[#417DFF] disabled:bg-[#969696] md:text-lg"
      >
        Connect wallet
      </button>
      <Modal
        isOpen={isOpen}
        backdrop="opaque"
        size="md"
        placement="center"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader className="font-normal">Connect a Wallet</ModalHeader>
          <ModalBody>
            {connectors.map((connector) => (
              <button
                disabled={!connector.ready}
                key={connector.id}
                onClick={() => {
                  connect({connector})
                  onClose()
                }}
                className="min-h-[42px] min-w-[232px] rounded-xl bg-bluePrimary p-2.5 text-center text-white "
              >
                {connector.name}
              </button>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
const SubmitButton = () => {
  const {isConnected} = useAccount()
  const isMounted = useIsMounted()
  if (!isMounted) return null
  return isConnected ? <FormSubmitButton /> : <ConnectSubmitButton />
}

export default SubmitButton
