import React, {useState} from 'react'
import {Tooltip} from '@nextui-org/react'
import {useWeb3Modal} from '@web3modal/wagmi/react'
import {useFormContext} from 'react-hook-form'
import {useAccount} from 'wagmi'

import {useFormValues} from '@/lib/hooks/formValues'
import {useIsMounted} from '@/lib/hooks/mounted'
import {Icons} from '@/components/shared/icons'

const WarnContent = () => {
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
const FormSubmitButton = ({pending}: {pending: boolean}) => {
  const {toToken, sendOnly, toAddress} = useFormValues()
  //if not connected to wallet, connect to wallet

  const {
    formState: {isSubmitting},
  } = useFormContext()
  return (
    <>
      <button
        className="flex w-full items-center justify-center rounded-lg bg-bluePrimary px-4 py-3 text-center font-geo text-base font-normal text-white disabled:bg-[#969696] md:text-lg"
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
  const {open} = useWeb3Modal()

  return (
    <button
      className="flex w-full items-center justify-center rounded-lg bg-bluePrimary px-4 py-3 text-center font-geo text-base font-normal text-white disabled:bg-[#969696] md:text-lg"
      type="button"
      disabled={isConnecting}
      onClick={() => open()}
    >
      Connect Wallet
    </button>
  )
}
const SubmitButton = ({pending}: {pending: boolean}) => {
  const {isConnected} = useAccount()
  const isMounted = useIsMounted()
  if (!isMounted) return null
  return isConnected ? (
    <FormSubmitButton pending={pending} />
  ) : (
    <ConnectSubmitButton />
  )
}

export default SubmitButton
