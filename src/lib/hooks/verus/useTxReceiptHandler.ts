'use client'

import {useEffect} from 'react'
import {toast} from 'sonner'
import {useWaitForTransactionReceipt} from 'wagmi'

type Props = {
  tx: `0x${string}` | undefined
  reset: () => void
  errorReset?: () => void
}

const useTxReceiptHandler = (props: Props) => {
  const {tx, reset, errorReset} = props
  const {data: txReceipt, isError: txError} = useWaitForTransactionReceipt({
    hash: tx,
    timeout: 240_000, //4 minutes
    onReplaced(data) {
      toast(`Transaction change of ${data.reason}`)
    },
  })

  useEffect(() => {
    if (txReceipt) {
      toast.success(`Transaction successful ${txReceipt.transactionHash}`)
      reset()
    }
    if (txError) {
      toast.error('Something went wrong with transaction')
      if (errorReset) {
        errorReset()
      }
    }
  }, [errorReset, reset, txError, txReceipt])
}

export default useTxReceiptHandler
