import {Spinner} from '@nextui-org/react'
import {useWeb3Modal, useWeb3ModalState} from '@web3modal/wagmi/react'
import {useAccount, useBalance} from 'wagmi'

import {useIsMounted} from '@/lib/hooks/mounted'
import {Web3Skeleton} from '@/components/shared/skeletons'

const Web3Button = () => {
  const {open} = useWeb3Modal()
  const {open: modelOpen} = useWeb3ModalState()
  const isMounted = useIsMounted()
  const {address, isConnected, isReconnecting, isConnecting} = useAccount()

  const {data: balance} = useBalance({
    address,
    enabled: !!address && !!isConnected,
    staleTime: 60_000,
    watch: true,
  })
  if (isReconnecting || isConnecting || !isMounted) return <Web3Skeleton />

  if (isConnected) {
    return (
      <button
        onClick={() => open()}
        className="  min-w-[232px] rounded-xl bg-bluePrimary p-2.5 pr-0 text-right text-white"
      >
        {modelOpen ? (
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
    )
  }
  return (
    <button
      onClick={() => open()}
      className="min-h-[42px] min-w-[232px] rounded-xl bg-bluePrimary p-2.5 text-center text-white "
    >
      {modelOpen ? <Spinner size="sm" color="white" /> : 'Connect Wallet'}
    </button>
  )
}

export default Web3Button
