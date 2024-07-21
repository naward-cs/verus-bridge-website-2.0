'use client'

import {useDisclosure} from '@nextui-org/react'
import {useAccount} from 'wagmi'

import {useRefundAddresses} from '@/lib/hooks/state/refundKeys'

import RefundAddress from './refundAddress'

export const FeesNotice = ({address}: {address: string}) => {
  const {address: account, isConnected, addresses} = useAccount()
  const {isOpen, onOpen, onOpenChange} = useDisclosure()
  const {refundAddresses} = useRefundAddresses()
  const isRefundAddress =
    refundAddresses && refundAddresses[account!] == address
  const noRefundAddress = !refundAddresses || !refundAddresses[account!]
  const rAddressess = Object.values(refundAddresses || [])
  const eAddresses = Object.keys(refundAddresses || [])
  const noRefund = addresses?.filter((o) => !eAddresses.includes(o))
  const missingRaddressess =
    rAddressess.length < (addresses?.length || rAddressess.length)
  const hasRaddress = eAddresses[rAddressess.indexOf(address)]
  if (!isConnected) return null

  return (
    <>
      {isRefundAddress ? null : (
        <div className="rounded-lg border-2 border-red-700 bg-red-400 p-2 font-medium shadow-lg">
          {hasRaddress ? (
            <p>Please switch to your ETH account {hasRaddress} to claim fees</p>
          ) : noRefundAddress ? (
            <>
              <p className="text-sm">
                You do not have a refund address for ETH address:
              </p>
              <p>{account}</p>
              <hr className="my-2 border-black" />
              <button
                // disabled={parseFloat(fees) < 0.006} //disable only if less than 0.006
                className="m-0 mx-auto flex items-center justify-center rounded-lg bg-bluePrimary px-2 py-1 text-center font-geo text-sm font-normal text-white disabled:bg-[#969696] md:text-base"
                onClick={onOpen}
              >
                Create Refund Address
              </button>
            </>
          ) : missingRaddressess ? (
            <>
              <p>
                We show {addresses?.length} accounts in your wallet and{' '}
                {rAddressess.length} refund address(es) registered. Please
                switch to another account, create refund address before
                attempting to claim fees.
              </p>
              <hr className="my-2" />
              <p>Accounts listed without refund address:</p>
              <ul>{noRefund?.map((a) => <li key={a}>{a}</li>)}</ul>
            </>
          ) : (
            <p>
              Please import the private key for {address} into metamask, and
              create a refund address to be paid directly to that ETH address.
            </p>
          )}
        </div>
      )}
      <RefundAddress
        address={account!}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </>
  )
}

export default FeesNotice
