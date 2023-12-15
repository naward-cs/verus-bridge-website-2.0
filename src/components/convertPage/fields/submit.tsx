import React, { useState } from 'react';
import { Modal, ModalBody, ModalContent, ModalHeader, Tooltip, useDisclosure } from '@nextui-org/react';
// import {useWeb3Modal} from '@web3modal/wagmi/react'
// import { useFormContext } from 'react-hook-form';
import { useAccount, useConnect } from 'wagmi';



import { useFormValues } from '@/lib/hooks/formValues';
import { useIsMounted } from '@/lib/hooks/mounted';
import {Icons} from '@/components/shared/icons'





export const WarnContent = () => {
  return (
    <div className="max-w-xs space-y-3 py-2 text-xs">
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
  if (!toAddress) return null
  return (
    <div className="flex items-center justify-center space-x-2.5 pt-2.5">
      <Icons.alertTriangle className="h-full w-6" />
      <p className=" text-xs text-[#686868]">
        This conversion can take up to 45 minutes.{' '}
        <Tooltip
          showArrow
          content={WarnContent()}
          isOpen={isOpen}
          onOpenChange={(open) => setIsOpen(open)}
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
  const {toToken, sendOnly, toAddress} = useFormValues()
  //if not connected to wallet, connect to wallet

  return (
    <>
      <button
        disabled={!toAddress}
        className="flex w-full items-center justify-center rounded-lg bg-bluePrimary px-4 py-3 text-center font-geo text-base font-normal text-white hover:bg-[#417DFF] disabled:bg-[#969696] md:text-lg"
        type="submit"
        // disabled={(!toToken && !toAddress) || isSubmitting || pending}
      >
        {toToken ? (
          toAddress ? (
            <>
              {sendOnly ? 'Send' : 'Convert'}
              <span className="ml-2 text-xs md:text-sm">
                (Can take up to 45 mins to complete)
              </span>
            </>
          ) : (
            'Enter Destination Address'
          )
        ) : (
          'Select to convert or send currency'
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
        className="flex w-full items-center hover:bg-[#417DFF] justify-center rounded-lg bg-bluePrimary px-4 py-3 text-center font-geo text-base font-normal text-white disabled:bg-[#969696] md:text-lg"
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