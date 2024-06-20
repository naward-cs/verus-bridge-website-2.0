'use client'

import {useState} from 'react'
import {toast} from 'sonner'

import {useDelegatorContract} from '@/lib/hooks/contracts/useDelegatorContract'
import {useConvesionRate} from '@/lib/hooks/verus/useConvesionRate'

import AwatingConfirmation from '../finalReviewExtras/awatingConfirmation'
import CompletedWithErrors from '../finalReviewExtras/completedWithErrors'
import FinalReview from '../finalReviewExtras/finalReview'
import TxCompleted from '../finalReviewExtras/txCompleted'
import useTxReceiptHandler from '@/lib/hooks/verus/useTxReceiptHandler'

interface FinalProps extends TxConfigType {
  account: `0x${string}`
  onClose: () => void
  setStatus: React.Dispatch<React.SetStateAction<'completed' | 'failed' | null>>
}
const maxGas = 1000000
export const ReviewForm = (props: FinalProps) => {
  const {
    formValues,
    CReserveTransfer: cr,
    fee,
    account,
    onClose,
    setStatus,
  } = props
  const [pending, setPending] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [txError, setTxError] = useState(false)
  const [pendingTx, setPendingTx] = useState(false)
  const [tx, setTx] = useState<`0x${string}` | undefined>(undefined)

  const {data: currencyRate} = useConvesionRate({
    fromToken: formValues.fromToken,
    toToken: formValues.toToken,
  })

  useTxReceiptHandler({
    tx,
    reset: () => {
      setStatus('completed')
      setTimeout(() => {
        // setTx(undefined)
        onClose()
      }, 10_000)
    },
    errorReset: () => {
      setTxError(true)
      setStatus('failed')
    },
  })
  const contract = useDelegatorContract()
  const confirmSubmit = async () => {
    setPending(true)
    try {
      const txResult = await contract.sendTransfer(cr, {
        from: account,
        gasLimit: maxGas.toString(),
        value: fee,
      })
      if (txResult) {
        setPendingTx(true)
        await txResult.wait()

        setTx(txResult.hash)
        setPendingTx(false)
      }
      //Sample
      // setTx(
      //   '0xee6a66a92f75436d19956fd7a20b7cdff5ff4b6ca0f96c645886615b8040b4a9'
      // )
      setPending(false)
    } catch (e: any) {
      if (e?.message.includes('User denied transaction')) {
        toast.error('Transaction Stopped: User denied the transaction.')
      } else if (e?.message) {
        toast.error(
          `An error occurred while processing the transaction: ${e.message}`
        )
      } else {
        toast.error('An error occurred while processing the transaction.')
      }
      setTxError(true)

      setPending(false)
    }
    setCompleted(true)
  }

  if (!completed && pending)
    return (
      <AwatingConfirmation
        formValues={formValues}
        pendingTx={pendingTx}
        destination={currencyRate?.destination}
      />
    )
  if (completed && txError) return <CompletedWithErrors tx={tx!} />
  if (tx) return <TxCompleted toAddress={formValues.toAddress} tx={tx} />
  return (
    <FinalReview
      formInfo={formValues}
      currencyRate={currencyRate?.value}
      confirmSubmit={confirmSubmit}
    />
  )
}
