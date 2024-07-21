'use client';

import React from 'react';
import { Link, useDisclosure } from '@nextui-org/react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { toast } from 'sonner';
import { useAccount } from 'wagmi';



import { useRefundAddresses } from '@/lib/hooks/state/refundKeys';
import { Icons } from '@/components/shared/icons';
import RefundAddress from './refundAddress'





const RefundInfo = () => {
  const {address, isConnected} = useAccount()
  const {refundAddresses} = useRefundAddresses()
  const {isOpen, onOpen, onOpenChange} = useDisclosure()
  const hasAddress = address && refundAddresses && refundAddresses[address]
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
        ) : hasAddress ? (
          <div className="flex flex-col space-y-5 ">
            <p>
              Your funds are safely stored in this address if you did an
              Ethereum to Ethereum send/conversion.
            </p>
            <div className="mx-2 flex max-w-sm items-center justify-between space-x-2">
              <div className="w-full rounded-lg border-1 border-[#999999] bg-[#DDDDDD] px-3 py-2">
                {refundAddresses[address!]}
              </div>
              <CopyToClipboard
                text={refundAddresses[address!]}
                onCopy={() => toast.success('refund address copied!!')}
              >
                <Icons.copy height={24} className="cursor-pointer opacity-35" />
              </CopyToClipboard>
            </div>
            <Link
              className="text-bluePrimary underline-offset-1"
              isExternal
              underline="always"
              href="https://docs.verus.io"
            >
              Learn how to access this address on the Verus blockchain
            </Link>
          </div>
        ) : (
          <div className="flex flex-row items-center space-x-5">
            <div className="flex w-fit items-center space-x-2.5 rounded-2xl bg-[#F4EEEE] px-2 py-1 text-[#C58484] ">
              <Icons.iInfo className="h-full w-4 text-[#D95757] " />
              <p className=" text-sm ">
                Sign message to see Verus refund address
              </p>
            </div>
            <button className="text-bluePrimary underline underline-offset-2" onClick={onOpen}>
              Sign Message
            </button>
          </div>
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
      <RefundAddress
        address={address!}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </div>
  )
}

export default RefundInfo