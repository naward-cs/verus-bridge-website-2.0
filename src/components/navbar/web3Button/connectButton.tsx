import React from 'react'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spinner,
  useDisclosure,
} from '@nextui-org/react'
import {useChainId, useConnect} from 'wagmi'

import WalletOption from './walletOption'

const ConnectButton = () => {
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure()
  const chainId = useChainId()
  const {connectors, connect} = useConnect()

  return (
    <>
      <button
        type='button'
        onClick={onOpen}
        className="min-h-[42px] min-w-[232px] rounded-xl bg-bluePrimary p-2.5 font-medium text-center text-white hover:bg-[#417DFF] "
      >
        {isOpen ? (
          <Spinner className="w-full" size="sm" color="white" />
        ) : (
          'Connect wallet'
        )}
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
              <WalletOption
                key={connector.id}
                connector={connector}
                onClick={() => {
                  connect({connector, chainId})
                  onClose()
                }}
              />
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ConnectButton
