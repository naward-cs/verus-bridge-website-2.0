import React, {useState} from 'react'
import {toast} from 'sonner'
import {useAccount} from 'wagmi'

import useClaimableFees from '@/lib/hooks/claims/useClaimableFees'
import {useDelegatorContract} from '@/lib/hooks/contracts/useDelegatorContract'
import useTxReceiptHandler from '@/lib/hooks/verus/useTxReceiptHandler'

import {useAddressContext} from './addressContext'

const maxGas = 800000
const VerusFees = () => {
  const {address: account} = useAccount()
  const {addressInfo} = useAddressContext()

  const {refundAddr, fee_avail: fees} = useClaimableFees(
    addressInfo.address,
    'FEE'
  )

  const contract = useDelegatorContract()
  const [tx, setTx] = useState<`0x${string}` | undefined>(undefined)
  useTxReceiptHandler({
    tx,
    reset: () => {
      setTx(undefined)
    },
  })

  const onSubmit = async () => {
    //NOTE: Only works for i-address
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
      }
    } catch (error) {
      toast.error('unable to claim fees')
    }
  }

  if (!addressInfo.address) {
    return <p>Enter Address to check available</p>
  }

  if (addressInfo.address.slice(0, 1) === 'R') {
    return (
      <p className="max-w-sm text-sm">
        Please import the private key for {addressInfo.address} into metamask,
        and use the 'Public Key' claim option to be paid directly to that ETH
        address.
      </p>
    )
  }

  return (
    <>
      <p>{fees}</p>
      <button
        disabled={parseFloat(fees) < 0.006} //disable only if less than 0.006
        className="m-0 flex items-center justify-center rounded-lg bg-bluePrimary px-2 py-1 text-center font-geo text-sm font-normal text-white disabled:bg-[#969696] md:text-base"
        onClick={() => onSubmit()}
      >
        Claim
      </button>
    </>
  )
}

export default VerusFees
