import React, {useEffect, useState} from 'react'

import type {Connector} from 'wagmi'

const WalletOption = ({
  connector,
  onClick,
}: {
  connector: Connector
  onClick: () => void
}) => {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    ;(async () => {
      const provider = await connector.getProvider()
      setReady(!!provider)
    })()
  }, [connector])
  return (
    <button
      disabled={!ready}
      onClick={onClick}
      className="min-h-[42px] min-w-[232px] rounded-xl bg-bluePrimary p-2.5 text-center text-white hover:bg-[#417DFF]"
    >
      {connector.name}
    </button>
  )
}

export default WalletOption
