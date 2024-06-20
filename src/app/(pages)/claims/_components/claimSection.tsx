import React from 'react'

import {useClaimContext} from './claimProvider'
import Fees from './fees'
import Refund from './refund'

const ClaimSection = ({tokenList}: {tokenList: TokenList[]}) => {
  const {claimType} = useClaimContext()
  const components = {
    refund: <Refund tokenList={tokenList} />,
    fees: <Fees />,
  }
  return components[claimType]
}

export default ClaimSection
