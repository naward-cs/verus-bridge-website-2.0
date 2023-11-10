'use client';

import {toast} from 'sonner'

import {useDelgatorContract} from '@/lib/hooks/contract'

interface FinalProps extends TxConfigType {
  setHash: (hash: `0x${string}`) => void
  closeModal: () => void
  account: `0x${string}`
}

const maxGas = 1000000
const FinalReview = (props: FinalProps) => {
  const {formValues, CReserveTransfer: cr, fee, account, setHash, closeModal} = props

  const contract = useDelgatorContract()

  const newSubmit = async () => {
    const timeoutDuration = 240000 // 240 seconds

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error('Transaction timeout exceeded.'))
      }, timeoutDuration)
    })

    const txResult = await contract.sendTransfer(cr, {
      from: account,
      gasLimit: maxGas.toString(),
      value: fee,
    })

    setHash(txResult.hash)
    const promiseRace = await Promise.race([txResult.wait(), timeoutPromise])
    if (promiseRace instanceof Error) {
      toast.error('Transaction timed out')
    }
    closeModal()
  }
  return (
    <div>
      <button onClick={() => newSubmit()}>test</button>
    </div>
  )
}

export default FinalReview