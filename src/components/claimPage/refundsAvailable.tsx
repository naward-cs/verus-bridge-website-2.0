'use client'

import React, {useState} from 'react'
import {toast} from 'sonner'
import {formatEther} from 'viem'
import {useAccount, useWaitForTransaction} from 'wagmi'

import {useClaimableRefunds} from '@/lib/hooks/claims'
import {useDelgatorContract} from '@/lib/hooks/contract'
import {useGetAllRefunds} from '@/lib/hooks/delegator'
import {useGetTokens} from '@/lib/hooks/tokens'

import {useAddressContext} from './addressContext'

const maxGas = 800000

const TokenRefund = ({
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
  const contract = useDelgatorContract()
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

const RefundsAvailable = () => {
  const {tokenList} = useGetTokens()

  const {addressInfo} = useAddressContext()

  const {data: allFunds} = useGetAllRefunds(addressInfo.address, tokenList!)
  let tokens = tokenList
  if (tokenList && allFunds) {
    tokens = tokenList
      ?.map((token, index) => {
        const amount: bigint =
          allFunds[index].status === 'failure'
            ? 0n
            : (allFunds[index].result as bigint)
        return {...token, amount}
      })
      .filter((t) => t.amount > 0n)
  }

  if (!addressInfo.address) {
    return <p>Enter Address to check available</p>
  }
  return (
    <div className="flex w-full flex-col space-y-2">
      {tokens && tokens?.length > 0 ? (
        tokens?.map((t) => (
          <TokenRefund
            key={t.id}
            address={'RWoeVkTvTfWYuM6HEpMtmb3pFWy1VPRuNZ'}
            token={t}
          />
        ))
      ) : (
        <p>No refunds found</p>
      )}
    </div>
  )
}

export default RefundsAvailable
