import React from 'react'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spinner,
  useDisclosure,
} from '@nextui-org/react'
// import {useWeb3Modal, useWeb3ModalState} from '@web3modal/wagmi/react'
import {useAccount, useConnect} from 'wagmi'

// import {useIsMounted} from '@/lib/hooks/mounted'
import {Web3Skeleton} from '@/components/shared/skeletons'

const ConnectButton = () => {
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure()
  const {isReconnecting, isConnecting} = useAccount()
  const {connect, connectors} = useConnect()

  if (isReconnecting || isConnecting) return <Web3Skeleton />

  return (
    <>
      <button
        onClick={onOpen}
        className="min-h-[42px] min-w-[232px] rounded-xl bg-bluePrimary p-2.5 text-center text-white "
      >
        {isOpen ? (
          <Spinner className="w-full" size="sm" color="white" />
        ) : (
          'Connect Wallet'
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

export default ConnectButton
