'use client';

import React from 'react'
import {useNetwork, useSwitchNetwork} from 'wagmi'

const Error = ({error, reset}: {error: Error; reset: () => void}) => {
  const {chain} = useNetwork()
  const {
    chains,
    error: switchingError,
    isLoading,
    pendingChainId,
    switchNetwork,
  } = useSwitchNetwork()

  return (
    <div className="container flex max-w-sm flex-col space-y-5 text-center">
      <h2>{error.message}</h2>

      {chain?.unsupported ? (
        <>
          <h3>{chain?.name} is an unsupported Ethereum Chain!</h3>
          <p>Select from the supported chains to switch to.</p>
          {chains.map((x) => (
            <button
              key={x.id}
              disabled={!switchNetwork || x.id === chain?.id}
              onClick={() => switchNetwork?.(x.id)}
              className="min-h-[42px] min-w-[232px] rounded-xl bg-bluePrimary p-2.5 text-center text-white "
            >
              Change to {x.name}
              {isLoading && pendingChainId === x.id && ' (switching)'}
            </button>
          ))}
          <div>{switchingError && switchingError.message}</div>
        </>
      ) : (
        <>
          <h3>{chain?.name} is a supported Ethereum Chain!</h3>
          <p>However page needs to be refreshed to access page.</p>
          <button
            onClick={() => reset()}
            className="min-h-[42px] min-w-[232px] rounded-xl bg-bluePrimary p-2.5 text-center text-white "
          >
            Reload page
          </button>
        </>
      )}
    </div>
  )
}

export default Error