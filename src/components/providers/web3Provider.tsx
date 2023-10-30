import {walletConnectProvider} from '@web3modal/wagmi'
import {createWeb3Modal} from '@web3modal/wagmi/react'
import {configureChains, createConfig, WagmiConfig} from 'wagmi'
import {goerli, mainnet} from 'wagmi/chains'
import {InjectedConnector} from 'wagmi/connectors/injected'
import {WalletConnectConnector} from 'wagmi/connectors/walletConnect'
import {infuraProvider} from 'wagmi/providers/infura'
import {publicProvider} from 'wagmi/providers/public'

import {env} from '@/config/env.mjs'

const projectId = env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID
const infuraId = env.NEXT_PUBLIC_INFURA_KEY

let chainList: any[]
let providerList: any[]

if (infuraId) {
  providerList = [
    walletConnectProvider({projectId}),
    infuraProvider({apiKey: infuraId}),
    publicProvider(),
  ]
} else {
  providerList = [walletConnectProvider({projectId}), publicProvider()]
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

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({
      chains,
      options: {projectId, showQrModal: false},
    }),
    new InjectedConnector({chains, options: {shimDisconnect: true}}),
  ],
  publicClient,
  webSocketPublicClient,
})

createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  defaultChain: env.NEXT_PUBLIC_TESTNET_ONLY ? goerli : mainnet,
})

const Web3Provider = ({children}: {children: React.ReactNode}) => {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
}

export default Web3Provider
