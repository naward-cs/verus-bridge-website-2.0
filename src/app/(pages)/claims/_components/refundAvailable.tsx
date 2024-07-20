import React, {useState} from 'react'
import {Spinner} from '@nextui-org/react'
import * as dn from 'dnum'
import {toast} from 'sonner'
import {erc20Abi} from 'viem'
import {useReadContract} from 'wagmi'

import {useGetAllRefunds} from '@/lib/hooks/claims/useGetAllFefunds'
import {useDelegatorContract} from '@/lib/hooks/contracts/useDelegatorContract'
import useTxReceiptHandler from '@/lib/hooks/verus/useTxReceiptHandler'
import FormatAddress from '@/lib/utils/formatAddress'

const maxGas = 800000

interface MergeList extends TokenList {
  refund: bigint
}

const RefundSection = ({
  token,
  address,
}: {
  token: MergeList
  address: string
}) => {
  const [tx, setTx] = useState<`0x${string}` | undefined>(undefined)
  const {data: decimals} = useReadContract({
    address: token.erc20address,
    abi: erc20Abi,
    functionName: 'decimals',
  })

  const formattedAddress = FormatAddress(address)
  const contract = useDelegatorContract()
  const refund_avail = !!decimals ? dn.format([token.refund, decimals]) : null

  useTxReceiptHandler({
    tx,
    reset: () => {
      setTx(undefined)
    },
  })
  const onClaim = async () => {
    if (parseFloat(refund_avail || '0') > 0) {
      try {
        const txResult = await contract.claimRefund(
          formattedAddress,
          token.value,
          {from: address, gasLimit: maxGas}
        )
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

  if (!decimals) return null
  return (
    <div className="flex flex-row items-center justify-between">
      <div>
        <p className="text-xs">Amount</p>
        <p>
          {refund_avail} {token.value}
        </p>
      </div>
      <button
        onClick={onClaim}
        className="h-fit rounded-lg bg-bluePrimary px-4 py-1 text-center font-medium text-white disabled:bg-[#969696]"
        disabled={!token.refund}
      >
        Claim
      </button>
    </div>
  )
}

const RefundAvailable = ({
  address,
  tokenList,
}: {
  address: string
  tokenList: TokenList[]
}) => {
  const {data: allFunds, isFetching} = useGetAllRefunds(address, tokenList!)

  if (isFetching)
    return (
      <div className="flex flex-row gap-3">
        <p>Checking Records</p>
        <Spinner />
      </div>
    )

  const mergeData = tokenList.map((token, i) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const refundAmount = allFunds[i].result as bigint
    return {...token, refund: refundAmount}
  })
  // .filter((t) => t.refund) as MergeList[]

  return (
    <div className="mx-auto mt-5 max-w-sm">
      <p className="text-center font-medium underline">Refund(s) Available</p>
      <hr />
      {mergeData.map((token: MergeList, i) => {
        return (
          <div key={`${token.label}-${i}`}>
            <RefundSection token={token} address={address} />
            <hr />
          </div>
        )
      })}
    </div>
  )
  // }
}

export default RefundAvailable
