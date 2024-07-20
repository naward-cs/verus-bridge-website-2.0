'use client'

import {useGetAllRefunds} from '@/lib/hooks/claims/useGetAllFefunds'
import {useTokenList} from '@/lib/hooks/delegator/useTokenList'

import {useAddressContext} from './addressContext'
import RefundToken from './refundToken'

const RefundsAvailable = () => {
  const {data: tokenList} = useTokenList()

  const {addressInfo} = useAddressContext()

  const {data: allFunds} = useGetAllRefunds(addressInfo.address, tokenList!)

  const tokens = tokenList

  if (!addressInfo.address) {
    return <p>Enter Address to check available</p>
  }
  return (
    <div className="flex w-full flex-col space-y-2">
      {tokens && tokens?.length > 0 ? (
        tokens?.map((t) => (
          <RefundToken
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
