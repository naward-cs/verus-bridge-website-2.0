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
import {formatUnits} from 'viem'
import {useAccount, useBalance, useChains, useDisconnect} from 'wagmi'

import {useWatch} from '@/lib/hooks/wagmi'
import {Web3Skeleton} from '@/components/skeletons/web3Skeleton'

import NetworkSwitch from '../networkSwitch'

import type {Chain} from 'viem'

const AccountButton = () => {
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure()
  const {address, chainId, isReconnecting, isConnecting} = useAccount()
  const chains = useChains()
  // const validChaind = chains.map((x) => x.id)

  // throw new Error('Invalid Chain')
  const {disconnect} = useDisconnect()
  const {data: balance, isFetching, queryKey} = useBalance({address})
  useWatch(queryKey, 10)
  if (isReconnecting || isConnecting || isFetching) return <Web3Skeleton />
  return (
    <>
      <button
        onClick={onOpen}
        className="group min-w-[232px] rounded-xl bg-bluePrimary p-2.5 pr-0 text-right text-white hover:bg-[#417DFF]"
      >
        {isOpen ? (
          <Spinner className="w-full" size="sm" color="white" />
        ) : (
          <>
            {isFetching ? (
              <Spinner className="w-full" size="sm" color="white" />
            ) : (
              <>
                {Intl.NumberFormat('en-US', {
                  style: 'decimal',
                  maximumFractionDigits: 3,
                }).format(
                  parseFloat(
                    formatUnits(balance!.value, balance!.decimals) || '0'
                  )
                )}{' '}
                ETH
              </>
            )}
            <span className=" ml-6 mr-0  rounded-xl border-2 border-bluePrimary bg-[#417DFF] p-2 group-hover:bg-bluePrimary">
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
              <>
                Switch Network or Disconnect: <br />
                Current Network:{' '}
                {chains.filter((i: Chain) => i.id === chainId)[0]?.name ||
                  'Unauthorized Chain'}
              </>
            ) : (
              <>Disconnect:</>
            )}
          </ModalHeader>
          <ModalBody>
            {chains.length > 1 && (
              <>
                <NetworkSwitch chainID={chainId!} close={() => onClose()} />
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

export default AccountButton
