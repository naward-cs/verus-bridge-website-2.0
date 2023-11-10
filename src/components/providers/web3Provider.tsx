import React from 'react'
// import {walletConnectProvider} from '@web3modal/wagmi'
// import {createWeb3Modal} from '@web3modal/wagmi/react'
import {configureChains, createConfig, WagmiConfig} from 'wagmi'
import {goerli, mainnet} from 'wagmi/chains'
// import {InjectedConnector} from 'wagmi/connectors/injected'
import {MetaMaskConnector} from 'wagmi/connectors/metaMask'
import {WalletConnectConnector} from 'wagmi/connectors/walletConnect'
import {infuraProvider} from 'wagmi/providers/infura'
import {publicProvider} from 'wagmi/providers/public'

import {env} from '@/config/env.mjs'

const projectId = env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID
const infuraId = env.NEXT_PUBLIC_INFURA_KEY

let chainList: any[]
let providerList: any[]

if (infuraId) {
  // providerList = [
  //   walletConnectProvider({projectId}),
  //   infuraProvider({apiKey: infuraId}),
  //   publicProvider(),
  // ]
  providerList = [infuraProvider({apiKey: infuraId}), publicProvider()]
} else {
  // providerList = [walletConnectProvider({projectId}), publicProvider()]
  providerList = [publicProvider()]
}

if (env.NEXT_PUBLIC_TESTNET_ONLY) {
  chainList = [goerli]
} else {
  chainList = [mainnet, goerli]
}

const {chains, publicClient, webSocketPublicClient} = configureChains(
  [...chainList],
  [...providerList]
)
// new InjectedConnector({chains, options: {shimDisconnect: true}}),
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({chains, options: {shimDisconnect: true}}),
    new WalletConnectConnector({
      chains,
      options: {projectId, showQrModal: true},
    }),
  ],
  publicClient,
  webSocketPublicClient,
})

// createWeb3Modal({
//   wagmiConfig,
//   projectId,
//   chains,
// })

const Web3Provider = ({children}: {children: React.ReactNode}) => {
  const [isMounted, setIsMounted] = React.useState(false)
  React.useEffect(() => setIsMounted(true), [])
  return isMounted ? (
    <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
  ) : null
}

export default Web3Provider
