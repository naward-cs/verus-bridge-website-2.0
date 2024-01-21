'use client'

import React, {useEffect, useState} from 'react'
import {toast} from 'sonner'
import {useAccount, useWaitForTransaction} from 'wagmi'

import {useClaimableFees} from '@/lib/hooks/claims'
import {useDelgatorContract} from '@/lib/hooks/contract'
import {useEthers} from '@/lib/hooks/ethers'

const maxGasClaim = 80000
const PubkeyFees = () => {
  const {address: account} = useAccount()
  const {
    refundAddresses,
    refundcKey,
    error: signError,
    signMsgNonAsync,
  } = useEthers()

  const I_Raddress = (refundAddresses && refundAddresses[account!]) || ''
  const {fee_avail: fees} = useClaimableFees(I_Raddress, 'PUBLIC_KEY')

  const contract = useDelgatorContract()
  useEffect(() => {
    if (signError) {
      toast.error(signError.message) //Propably could move this to within hook
    }
  }, [signError])

  const [tx, setTx] = useState<`0x${string}` | undefined>(undefined)
  useWaitForTransaction({
    hash: tx,
    enabled: !!tx,
    timeout: 240_000, //4 minutes
    onReplaced(data) {
      toast(`Transaction change of ${data.reason}`)
    },
    onSuccess(data) {
      toast.success(`Transaction successful ${data.transactionHash}`)
      setTx(undefined)
    },
    onError: () => {
      toast.error('Something went wrong with transaction')
    },
  })
  const onSubmit = async () => {
    if (refundcKey) {
      const {x1, x2} = refundcKey[account!]
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
  if (!refundAddresses || !refundAddresses[account!]) {
    return (
      <>
        <p>No refund address found.</p>
        <button
          className="m-0 flex items-center justify-center rounded-lg bg-bluePrimary px-2 py-1 text-center font-geo text-sm font-normal text-white disabled:bg-[#969696] md:text-base"
          onClick={() => signMsgNonAsync()}
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
