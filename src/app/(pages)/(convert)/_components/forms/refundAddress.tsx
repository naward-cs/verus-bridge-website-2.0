'use client';

import { useEffect } from 'react';
import { Link, Modal, ModalBody, ModalContent, Spinner } from '@nextui-org/react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useFormContext } from 'react-hook-form';
import { toast } from 'sonner';



import useEthers from '@/lib/hooks/web/useEthers';
import { Icons } from '@/components/shared/icons';





const RefundAddress = ({
  address,
  isOpen,
  onOpenChange,
}: {
  address: `0x${string}`
  isOpen: boolean
  onOpenChange: () => void
}) => {
  const {refundAddresses, isLoading, signMsg, msg} = useEthers()

  const {setValue} = useFormContext()
  const signMessage = async () => {
    await signMsg({message: msg})
  }
  useEffect(() => {
    if (isOpen) {
      signMessage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])
  const addresses = refundAddresses.current

  const handleClose = () => {
    if (addresses && addresses[address]) {
      setValue('rAddress', addresses[address])
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      backdrop="opaque"
      size="md"
      scrollBehavior="inside"
      placement="center"
      onOpenChange={onOpenChange}
      isDismissable={false}
      onClose={handleClose}
    >
      <ModalContent>
        <ModalBody className="my-10">
          <h2 className="text-center text-2xl font-medium">
            Create Verus refund address
          </h2>
          {addresses && addresses[address] ? (
            <>
              <div className="mx-2 flex items-center justify-between space-x-2">
                <div className="w-full rounded-lg border-1 border-[#999999] bg-[#DDDDDD] px-3 py-2">
                  {addresses[address]}
                </div>
                <CopyToClipboard
                  text={addresses[address]}
                  onCopy={() => toast.success('refund address copied!!')}
                >
                  <Icons.copy
                    height={24}
                    className="cursor-pointer opacity-35"
                  />
                </CopyToClipboard>
              </div>
              <div className="mx-8 text-sm">
                <p>
                  Go to the{' '}
                  <Link href="/claims" className="text-sm">
                    Refunds/claims
                  </Link>{' '}
                  page to check for refunds and how to retrieve them.
                </p>
              </div>
            </>
          ) : isLoading ? (
            <div className="mx-auto">
              <Spinner />
            </div>
          ) : (
            <div className="mx-auto my-5 flex w-fit items-center space-x-2.5 rounded-2xl bg-[#F4EEEE] px-2 py-1 text-[#C58484] ">
              <Icons.iInfo className="h-full w-4 text-[#D95757] " />
              <p className=" text-xs ">
                Sign message to create a Verus refund address
              </p>
            </div>
          )}

          <div className="mx-8 space-y-2.5 text-sm">
            <h3 className="text-md font-bold">
              What is a Verus refund address?
            </h3>
            <p>
              Sometimes Ethereum gas fees jump up too much, and when your
              conversion is ready to be sent back to Ethereum it became too
              expensive. If that happens, the conversion is then safely refunded
              to you on the Verus blockchain.
            </p>
            <p>
              To be able to retrieve the currency that is strored on the Verus
              blockchain you need to hve an address that is controlled by you.
            </p>
            <p>
              The refund address created here is derived from your Ethereum
              private key. Only you controll this address.
            </p>
          </div>
          <div className="mx-8 mt-3 text-sm">
            <h3 className="text-md font-bold">How to retrieve refunds?</h3>
            <p>
              Go to the{' '}
              <Link href="/claims" className="text-sm">
                Refunds/claims
              </Link>{' '}
              page to learn more.
            </p>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default RefundAddress