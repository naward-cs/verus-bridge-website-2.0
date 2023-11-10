import React from 'react'
import {
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spinner,
  useDisclosure,
} from '@nextui-org/react'
// import {useWeb3Modal, useWeb3ModalState} from '@web3modal/wagmi/react'
import {
  useAccount,
  useBalance,
  useDisconnect,
  useNetwork,
  useSwitchNetwork,
} from 'wagmi'

// import {useIsMounted} from '@/lib/hooks/mounted'
import {Web3Skeleton} from '@/components/shared/skeletons'

const NetworkDisconnectButton = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure()
  const {address, isConnected, isReconnecting, isConnecting} = useAccount()

  const {disconnect} = useDisconnect()
  const {chain} = useNetwork()
  const {chains, isLoading, pendingChainId, switchNetwork} = useSwitchNetwork()

  const {data: balance} = useBalance({
    address,
    enabled: !!address && !!isConnected,
    staleTime: 60_000,
    watch: true,
  })
  if (isReconnecting || isConnecting || !isConnected) return <Web3Skeleton />

  return (
    <>
      <button
        onClick={onOpen}
        className="min-w-[232px] rounded-xl bg-bluePrimary p-2.5 pr-0 text-right text-white"
      >
        {isOpen ? (
          <Spinner className="w-full" size="sm" color="white" />
        ) : (
          <>
            {Intl.NumberFormat('en-US', {
              style: 'decimal',
              maximumFractionDigits: 3,
            }).format(parseFloat(balance?.formatted || '0'))}{' '}
            ETH
            <span className=" ml-6 mr-0  rounded-xl border-2 border-bluePrimary bg-[#417DFF] p-2">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </span>
          </>
        )}
      </button>
      <Modal
        isOpen={isOpen}
        backdrop="opaque"
        size="md"
        placement="center"
        onOpenChange={() => {
          onOpenChange()
        }}
      >
        <ModalContent>
          <ModalHeader className="font-normal">
            {chains.length > 1 ? (
              <>Switch Network or Disconnect: {chain?.name} network</>
            ) : (
              <>Disconnect: {chain?.name} network</>
            )}
          </ModalHeader>
          <ModalBody>
            {chains.length > 1 && (
              <>
                <h4>Switch Network</h4>
                {chains.map((x) => (
                  <button
                    disabled={!switchNetwork || x.id === chain?.id}
                    key={x.id}
                    onClick={() => switchNetwork?.(x.id)}
                    className="min-h-[42px] min-w-[232px] rounded-xl bg-bluePrimary p-2.5 text-center text-white "
                  >
                    {x.name}
                    {isLoading && pendingChainId === x.id && ' (switching)'}
                  </button>
                ))}
                <Divider />
              </>
            )}
            <button
              onClick={() => disconnect()}
              className="min-h-[42px] min-w-[232px] rounded-xl bg-bluePrimary p-2.5 text-center text-white "
            >
              Disconnect Wallet
            </button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default NetworkDisconnectButton
