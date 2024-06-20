'use client'

import React, {useEffect, useState} from 'react'
import {toast} from 'sonner'
import {useAccount} from 'wagmi'

import useClaimableFees from '@/lib/hooks/claims/useClaimableFees'
import {useDelegatorContract} from '@/lib/hooks/contracts/useDelegatorContract'
import useTxReceiptHandler from '@/lib/hooks/verus/useTxReceiptHandler'
import useEthers from '@/lib/hooks/web/useEthers'

const maxGasClaim = 80000
const PubkeyFees = () => {
  const {address: account} = useAccount()
  const {refundAddresses, refundcKey, signError, signMsgNonAsync, msg} =
    useEthers()

  const I_Raddress =
    (refundAddresses.current && refundAddresses.current[account!]) || ''
  const {fee_avail: fees} = useClaimableFees(I_Raddress, 'PUBLIC_KEY')

  const contract = useDelegatorContract()
  useEffect(() => {
    if (signError) {
      toast.error(signError.message) //Propably could move this to within hook
    }
  }, [signError])

  const [tx, setTx] = useState<`0x${string}` | undefined>(undefined)
  useTxReceiptHandler({
    tx,
    reset: () => {
      setTx(undefined)
    },
  })

  const onSubmit = async () => {
    if (refundcKey) {
      const {x1, x2} = (refundcKey.current && refundcKey.current[account!]) || {
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
        }
      } catch (error) {
        toast.error('Unable to claim fees')
      }
    }
  }
  if (!refundAddresses.current || !refundAddresses.current[account!]) {
    return (
      <>
        <p>No refund address found.</p>
        <button
          className="m-0 flex items-center justify-center rounded-lg bg-bluePrimary px-2 py-1 text-center font-geo text-sm font-normal text-white disabled:bg-[#969696] md:text-base"
          onClick={() => signMsgNonAsync({message: msg})}
        >
          Create
        </button>
      </>
    )
  }

  return (
    <>
      <p>{fees}</p>
      <button
        // disabled={parseFloat(fees) < 0.006} //disable only if less than 0.006
        className="m-0 flex items-center justify-center rounded-lg bg-bluePrimary px-2 py-1 text-center font-geo text-sm font-normal text-white disabled:bg-[#969696] md:text-base"
        onClick={() => onSubmit()}
      >
        Claim
      </button>
    </>
  )
}

export default PubkeyFees
