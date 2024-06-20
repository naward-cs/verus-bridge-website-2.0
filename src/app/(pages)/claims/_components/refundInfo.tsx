'use client'

import React from 'react'
import {Link} from '@nextui-org/react'
import {useAccount} from 'wagmi'

import {Icons} from '@/components/shared/icons'

const RefundInfo = () => {
  const {isConnected} = useAccount()
  return (
    <div className="container max-w-4xl px-1.5">
      <div className="space-y-5 rounded-xl border-2 p-4">
        <h3 className="text-2xl font-medium">Get Refunds back</h3>
        {!isConnected ? (
          <div className="flex w-fit items-center space-x-2.5 rounded-2xl bg-[#F4EEEE] px-2 py-1 text-[#C58484] ">
            <Icons.iInfo className="h-full w-4 text-[#D95757] " />
            <p className=" text-sm ">
              Connect wallet to see your Verus refund address
            </p>
          </div>
        ) : (
          <p>connected</p>
        )}

        <div>
          <h4 className="text-xl font-medium">What are refunds?</h4>
          <p>A refund can happen for a few reasons.</p>
          <ol className="ml-4 mt-5 list-decimal space-y-5">
            <li>
              Sometimes Ethereum gas fees jump up too much, and when your
              conversion is ready to be sent (back) to Ethereum it became too
              expensive
            </li>
            <li>
              You sent funds to a special Ethereum contract address instead of a
              normal Ethereum address. Sending to a special contract address
              became too expensive.
            </li>
          </ol>
        </div>
        <div>
          <h4 className="text-xl font-medium">
            What is a Verus refund address?
          </h4>
          <p>
            The refund address is an address on the Verus blockchain. Funds are
            safely stored there for you when sending from Ethereum to Ethereum.
            The one created here is derived from you Ethereum private key. Only
            you control this address.
          </p>
          <p className="mt-5">
            When sending from Verus to Ethereum the funds can be safely returned
            to the refund address after claiming on this page.
          </p>
        </div>
        <div>
          <h4 className="text-xl font-medium">
            How to redeem refunded funds on Verus?
          </h4>
          <p>
            <u>If you sent from Ethereum:</u> export your private key from
            MetaMask [or other wallet] and import it into Verus.{' '}
            <Link
              href=""
              className=" text-bluePrimary underline-offset-1"
              isExternal
              underline="always"
            >
              Go here for a walkthrough
            </Link>
          </p>
          <p className="mt-5">
            <u>If you sent from Verus:</u> When sending from Verus you used a
            refund address together with you send or conversion. Enter the
            address on this page, select the currency, click "Claim", pay for
            the fees to send the funds back to Verus. The funds will appear in
            your refund address.
          </p>
        </div>
      </div>
    </div>
  )
}

export default RefundInfo
