import {useMemo} from 'react'
// import {useWeb3Modal, useWeb3ModalState} from '@web3modal/wagmi/react'
import {useAccount} from 'wagmi'

// import {useIsMounted} from '@/lib/hooks/mounted'

import ConnectButton from './connectButton'
import NetworkDisconnectButton from './networkDisconnectButton'

const Web3Button = () => {
  const {isConnected} = useAccount()

  // if (isReconnecting || isConnecting) return <Web3Skeleton />
  return useMemo(
    () => (isConnected ? <NetworkDisconnectButton /> : <ConnectButton />),
    [isConnected]
  )
  //if (isConnected) {

  // return (
  //   <>
  //     <button
  //       onClick={onOpen}
  //       className="min-w-[232px] rounded-xl bg-bluePrimary p-2.5 pr-0 text-right text-white"
  //     >
  //       {isOpen ? (
  //         <Spinner className="w-full" size="sm" color="white" />
  //       ) : (
  //         <>
  //           {Intl.NumberFormat('en-US', {
  //             style: 'decimal',
  //             maximumFractionDigits: 3,
  //           }).format(parseFloat(balance?.formatted || '0'))}{' '}
  //           ETH
  //           <span className=" ml-6 mr-0  rounded-xl border-2 border-bluePrimary bg-[#417DFF] p-2">
  //             {address?.slice(0, 6)}...{address?.slice(-4)}
  //           </span>
  //         </>
  //       )}
  //     </button>
  //     <Modal
  //       isOpen={isOpen}
  //       backdrop="opaque"
  //       size="md"
  //       placement="center"
  //       onOpenChange={() => {
  //         onOpenChange()
  //       }}
  //     >
  //       <ModalContent>
  //         <ModalHeader className="font-normal">
  //           {chains.length > 1 ? (
  //             <>Switch Network or Disconnect: {chain?.name} network</>
  //           ) : (
  //             <>Disconnect: {chain?.name} network</>
  //           )}
  //         </ModalHeader>
  //         <ModalBody>
  //           {chains.length > 1 && (
  //             <>
  //               <h4>Switch Network</h4>
  //               {chains.map((x) => (
  //                 <button
  //                   disabled={!switchNetwork || x.id === chain?.id}
  //                   key={x.id}
  //                   onClick={() => switchNetwork?.(x.id)}
  //                   className="min-h-[42px] min-w-[232px] rounded-xl bg-bluePrimary p-2.5 text-center text-white "
  //                 >
  //                   {x.name}
  //                   {isLoading && pendingChainId === x.id && ' (switching)'}
  //                 </button>
  //               ))}
  //               <Divider />
  //             </>
  //           )}
  //           <button
  //             onClick={() => disconnect()}
  //             className="min-h-[42px] min-w-[232px] rounded-xl bg-bluePrimary p-2.5 text-center text-white "
  //           >
  //             Disconnect Wallet
  //           </button>
  //         </ModalBody>
  //       </ModalContent>
  //     </Modal>
  //   </>
  // )
  //}

  // return (
  //   <>
  //     <button
  //       onClick={onOpen}
  //       className="min-h-[42px] min-w-[232px] rounded-xl bg-bluePrimary p-2.5 text-center text-white "
  //     >
  //       {isOpen ? (
  //         <Spinner className="w-full" size="sm" color="white" />
  //       ) : (
  //         'Connect Wallet'
  //       )}
  //     </button>
  //     <Modal
  //       isOpen={isOpen}
  //       backdrop="opaque"
  //       size="md"
  //       placement="center"
  //       onOpenChange={onOpenChange}
  //     >
  //       <ModalContent>
  //         <ModalHeader className="font-normal">Connect a Wallet</ModalHeader>
  //         <ModalBody>
  //           {connectors.map((connector) => (
  //             <button
  //               disabled={!connector.ready}
  //               key={connector.id}
  //               onClick={() => {
  //                 connect({connector})
  //                 onClose()
  //               }}
  //               className="min-h-[42px] min-w-[232px] rounded-xl bg-bluePrimary p-2.5 text-center text-white "
  //             >
  //               {connector.name}
  //             </button>
  //           ))}
  //         </ModalBody>
  //       </ModalContent>
  //     </Modal>
  //   </>
  // )
  // const {open} = useWeb3Modal()
  // const {open: modelOpen} = useWeb3ModalState()
  // const isMounted = useIsMounted()

  // if (isReconnecting || isConnecting || !isMounted) return <Web3Skeleton />
  // if (isConnected) {
  //   return (
  //     <button
  //       onClick={() => open()}
  //       className="  min-w-[232px] rounded-xl bg-bluePrimary p-2.5 pr-0 text-right text-white"
  //     >
  //       {modelOpen ? (
  //         <Spinner className="w-full" size="sm" color="white" />
  //       ) : (
  //         <>
  //           {Intl.NumberFormat('en-US', {
  //             style: 'decimal',
  //             maximumFractionDigits: 3,
  //           }).format(parseFloat(balance?.formatted || '0'))}{' '}
  //           ETH
  //           <span className=" ml-6 mr-0  rounded-xl border-2 border-bluePrimary bg-[#417DFF] p-2">
  //             {address?.slice(0, 6)}...{address?.slice(-4)}
  //           </span>
  //         </>
  //       )}
  //     </button>
  //   )
  // }
  // return (
  //   <button
  //     onClick={() => open()}
  //     className="min-h-[42px] min-w-[232px] rounded-xl bg-bluePrimary p-2.5 text-center text-white "
  //   >
  //     {modelOpen ? <Spinner size="sm" color="white" /> : 'Connect Wallet'}
  //   </button>
  // )
}

export default Web3Button
