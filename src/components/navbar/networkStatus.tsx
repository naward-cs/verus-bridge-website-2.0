'use client'

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react'
import {useChainId, useChains} from 'wagmi'

import NetworkSwitch from './networkSwitch'

const NetworkStatus = () => {
  const chainId = useChainId()
  const chains = useChains()
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure()
  
  
  return (
    <>
      <button className="pl-5 font-medium" onClick={onOpen}>
        Ethereum Bridge { chainId === 1 ? " - Mainnet" : "- Testnet"}
      </button>
      <Modal
        isOpen={isOpen}
        backdrop="opaque"
        size="md"
        placement="center"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader className="font-normal">Switch Network</ModalHeader>
          <ModalBody>
            Current Network:{' '}
            {chains.filter((i) => i.id === chainId)[0]?.name ||
              'Unauthorized Chain'}
            <NetworkSwitch chainID={chainId} close={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default NetworkStatus
