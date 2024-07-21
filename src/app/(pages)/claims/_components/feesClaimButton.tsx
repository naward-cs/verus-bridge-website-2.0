import {useState} from 'react'
import {toast} from 'sonner'
import {useAccount} from 'wagmi'

import {useDelegatorContract} from '@/lib/hooks/contracts/useDelegatorContract'
import {useRefundAddresses, useRefundcKeys} from '@/lib/hooks/state/refundKeys'
import useTxReceiptHandler from '@/lib/hooks/verus/useTxReceiptHandler'
import {formatHexAddress} from '@/lib/utils/converters/formatHexAddress'
import ConnectButton from '@/components/navbar/web3Button/connectButton'

const maxGasClaim = 80000
const maxGas = 800000
export const FeesClaimButton = ({
  address,
  fees_avail,
  type,
}: {
  address: string
  fees_avail: string
  type: 'PUBLIC_KEY' | 'FEE'
}) => {
  const {address: account, isConnected} = useAccount()
  const {refundAddresses} = useRefundAddresses()
  const {refundcKey} = useRefundcKeys()
  const contract = useDelegatorContract()

  const [tx, setTx] = useState<`0x${string}` | undefined>(undefined)
  useTxReceiptHandler({
    tx,
    reset: () => {
      setTx(undefined)
    },
  })
  const onSubmit = async () => {
    try {
      if (type === 'PUBLIC_KEY') {
        if (refundcKey) {
          const {x1, x2} = (refundcKey && refundcKey[account!]) || {
            x1: '',
            x2: '',
          }
          try {
            const txResult = await contract.sendfees(`0x${x1}`, `0x${x2}`, {
              from: account,
              gasLimit: maxGasClaim,
            })
            if (txResult) {
              await txResult.wait()
              setTx(txResult.hash)
              toast.success('Claim to ETH Transaction Success!')
            }
          } catch (error) {
            toast.error('Unable to claim fees')
          }
        }
      } else if (type === 'FEE') {
        //NOTE: Only works for i-address
        const refundAddr = formatHexAddress(address, type)

        try {
          await contract.sendfees(
            refundAddr,
            `0x${Buffer.alloc(32).toString('hex')}`
          )
          const txResult = await contract.sendfees(
            refundAddr,
            `0x${Buffer.alloc(32).toString('hex')}`,
            {from: account, gasLimit: maxGas}
          )
          if (txResult) {
            await txResult.wait()
            setTx(txResult.hash)
            toast.success('Fee reimburse Transaction Success!')
          }
        } catch (error) {
          toast.error('unable to claim fees')
        }
      } else {
        throw Error()
      }
    } catch (error) {
      toast.error('unable to claim fees')
    }
  }
  const disabled =
    parseFloat(fees_avail) < 0.006 ||
    (refundAddresses && account && refundAddresses[account] !== address)

  return isConnected ? (
    <button
      disabled={!!disabled}
      className="m-0 flex items-center justify-center rounded-lg bg-bluePrimary px-2 py-1 text-center font-geo text-sm font-normal text-white disabled:bg-[#969696] md:text-base"
      onClick={onSubmit}
    >
      Claim Fees
    </button>
  ) : (
    <ConnectButton />
  )
}
