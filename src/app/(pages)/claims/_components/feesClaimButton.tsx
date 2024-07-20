import {toast} from 'sonner'
import {useAccount} from 'wagmi'

import {useDelegatorContract} from '@/lib/hooks/contracts/useDelegatorContract'
import useEthers from '@/lib/hooks/web/useEthers'
import ConnectButton from '@/components/navbar/web3Button/connectButton'

export const FeesClaimButton = ({
  fee_avail,
  type,
}: {
  fee_avail: string
  type: 'PUBLIC_KEY' | 'FEE'
}) => {
  const {address, isConnected} = useAccount()
  const {refundAddresses} = useEthers()
  const contract = useDelegatorContract()

  const onSubmit = async () => {
    try {
      if (type === 'PUBLIC_KEY') {
      } else if (type === 'FEE') {
      } else {
        throw Error()
      }
    } catch (error) {
      toast.error('unable to claim fees')
    }
  }

  return isConnected ? (
    <button
      // disabled={parseFloat(fees) < 0.006} //disable only if less than 0.006
      className="m-0 flex items-center justify-center rounded-lg bg-bluePrimary px-2 py-1 text-center font-geo text-sm font-normal text-white disabled:bg-[#969696] md:text-base"
      onClick={onSubmit}
    >
      Claim Fees
    </button>
  ) : (
    <ConnectButton />
  )
}
