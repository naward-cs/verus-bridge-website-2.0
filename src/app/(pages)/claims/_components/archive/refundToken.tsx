import {useState} from 'react'
import {toast} from 'sonner'
import {formatEther} from 'viem'
import {useAccount} from 'wagmi'

import {useClaimableRefunds} from '@/lib/hooks/claims/useClaimableRefunds'
import {useDelegatorContract} from '@/lib/hooks/contracts/useDelegatorContract'
import useTxReceiptHandler from '@/lib/hooks/verus/useTxReceiptHandler'

const maxGas = 800000

const RefundToken = ({
  address,
  token,
}: {
  address: string
  token: TokenList & {amount?: bigint}
}) => {
  const {refundAddr, refund_avail} = useClaimableRefunds(
    address,
    token.iaddress as `0x${string}`
  )
  const {address: account, isConnected} = useAccount()
  const [tx, setTx] = useState<`0x${string}` | undefined>(undefined)
  const contract = useDelegatorContract()
  useTxReceiptHandler({
    tx,
    reset: () => {
      setTx(undefined)
    },
  })

  const onSubmit = async () => {
    if (parseFloat(refund_avail) > 0) {
      try {
        const txResult = await contract.claimRefund(refundAddr, token.value, {
          from: account,
          gasLimit: maxGas,
        })
        if (txResult) {
          await txResult.wait()
          setTx(txResult.hash)
        }
      } catch (error) {
        toast.error('Something went wrong with the refund transaction')
      }
    } else {
      toast.error(`No ${token.value} refunds available.`)
    }
  }

  return (
    <div className="flex items-center justify-between">
      <p key={token.id}>{token.label}</p>
      <p className="flex items-center">
        {formatEther(token.amount || 0n)}

        <button
          className="ml-2 flex items-center justify-center rounded-lg bg-bluePrimary px-2 py-1 text-center font-geo text-sm font-normal text-white disabled:bg-[#969696] md:text-base"
          onClick={() => onSubmit()}
          disabled={!(token.amount && isConnected)}
        >
          Claim
        </button>
      </p>
    </div>
  )
}

export default RefundToken
