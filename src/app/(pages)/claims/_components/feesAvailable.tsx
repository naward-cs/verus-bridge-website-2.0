import useClaimableFees from '@/lib/hooks/claims/useClaimableFees'

import {FeesClaimButton} from './feesClaimButton'
import FeesNotice from './feesNotice'

const FeesAvailable = ({address}: {address: string}) => {
  //if R-address, is it the public key one or does user to import their address into metamask
  const refundType = address.slice(0, 1) === 'R' ? 'PUBLIC_KEY' : 'FEE'
  const {fee_avail} = useClaimableFees(address, refundType)

  return (
    <div>
      <div className="my-5 flex max-w-md items-center justify-between rounded-lg border border-black bg-[#F5EFD0] p-2 shadow">
        <div>
          <p className="text-sm text-[#444444]">Amount available to claim</p>
          <p>{fee_avail} ETH</p>
        </div>
        <FeesClaimButton address={address} fees_avail={fee_avail}  type={refundType} />
      </div>
      {refundType === 'PUBLIC_KEY' && <FeesNotice address={address} />}
    </div>
  )
}

export default FeesAvailable
