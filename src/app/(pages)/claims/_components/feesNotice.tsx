import React from 'react'
import {useDisclosure} from '@nextui-org/react'
import {useAccount} from 'wagmi'

import useEthers from '@/lib/hooks/web/useEthers'

import RefundAddress from './refundAddress'

const NoRefundAddresses = ({address}: {address: `0x${string}`}) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure()
  return (
    <>
      <hr className="my-2 border-black" />
      <button
        // disabled={parseFloat(fees) < 0.006} //disable only if less than 0.006
        className="m-0 mx-auto flex items-center justify-center rounded-lg bg-bluePrimary px-2 py-1 text-center font-geo text-sm font-normal text-white disabled:bg-[#969696] md:text-base"
        onClick={onOpen}
      >
        Create Refund Address
      </button>
      <RefundAddress
        address={address}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </>
  )
}

export const FeesNotice = ({address}: {address: string}) => {
  const {address: account, isConnected, addresses} = useAccount()
  const {refundAddresses} = useEthers()

  if (!isConnected) return null
  //if we are all good using current address don't show this
  if (refundAddresses.current && refundAddresses.current[account!] == address)
    return null

  //if we are logged in
  if (refundAddresses.current && !refundAddresses.current[account!]) {
    return (
      <div className="rounded-lg border-2 border-red-700 bg-red-400 p-2 shadow-lg">
        <p className="font-medium">
          You do not have a refund address for {account} ETH address
        </p>
        <NoRefundAddresses address={account!} />
      </div>
    )
  }

  if (refundAddresses.current) {
    const values = Object.values(refundAddresses.current).slice(1) //remove what is called current
    const keys = Object.keys(refundAddresses.current).slice(1) //remove what is called current
    const noRefund = addresses?.filter((o) => !keys.includes(o))
    const numOfAccounts = addresses?.length || values.length

    if (values.find((t) => t == address)) {
      const value = keys[values.indexOf(address)]
      return (
        <div className="rounded-lg border-2 border-red-700 bg-red-400 p-2 shadow-lg">
          <p className="font-medium">
            Please switch to your ETH account {value} to claim fees
          </p>
        </div>
      )
    }
    if (values.length < numOfAccounts) {
      return (
        <div className="rounded-lg border-2 border-red-700 bg-red-400 p-2 font-medium shadow-lg">
          <p>
            We show {numOfAccounts} accounts in your wallet and {values.length}{' '}
            refund address(es) registered. Please switch to another account,
            create refund address before attempting to claim fees.
          </p>
          <p>Accounts listed without refund address created:</p>
          <ul>{noRefund?.map((a) => <li key={a}>{a}</li>)}</ul>
        </div>
      )
    }
  }

  return (
    <div className="rounded-lg border-2 border-red-700 bg-red-400 p-2 shadow-lg">
      <p className="font-medium">
        Please import the private key for {address} into metamask, and create a
        refund address to be paid directly to that ETH address.
      </p>
    </div>
  )
}

export default FeesNotice
