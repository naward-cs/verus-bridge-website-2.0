import React from 'react'
import {Spinner} from '@nextui-org/react'
import * as dn from 'dnum'
import {toast} from 'sonner'
import {erc20Abi} from 'viem'
import {useReadContract} from 'wagmi'

import {useGetAllRefunds} from '@/lib/hooks/claims/useGetAllFefunds'

interface MergeList extends TokenList {
  refund: bigint
}

const RefundSection = ({token}: {token: MergeList}) => {
  const {data: decimals} = useReadContract({
    address: token.erc20address,
    abi: erc20Abi,
    functionName: 'decimals',
  })

  const onClaim = () => {
    toast.info('This is not enabled yet')
  }

  if (!decimals) return null
  return (
    <div className="flex flex-row items-center justify-between">
      <div>
        <p className="text-xs">Amount</p>
        <p>
          {dn.format([token.refund, decimals])} {token.value}
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
            <RefundSection token={token} />
            <hr />
          </div>
        )
      })}
    </div>
  )
  // }
}

export default RefundAvailable
