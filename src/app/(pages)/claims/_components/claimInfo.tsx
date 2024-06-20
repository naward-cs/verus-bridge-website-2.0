import React from 'react'

import {useClaimContext} from './claimProvider'
import FeesInfo from './feesInfo'
import RefundInfo from './refundInfo'

const ClaimInfo = () => {
  const {claimType} = useClaimContext()
  const components = {
    refund: <RefundInfo />,
    fees: <FeesInfo />,
  }
  return components[claimType]
}

export default ClaimInfo
