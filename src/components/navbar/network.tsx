import React from 'react'

import {useIsMounted} from '@/lib/hooks/mounted'
import {NetworkChain} from '@/lib/hooks/network'

const Network = () => {
  const chainID = NetworkChain()
  const isMounted = useIsMounted()
  if (!isMounted) return null
  return (
    <p className="pl-5 font-medium">
      Ethereum Bridge {chainID === 1 ? '- Mainnet' : '- Testnet'}
    </p>
  )
}

export default Network
