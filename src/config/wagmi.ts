import { cookieStorage, createConfig, createStorage, fallback, http, unstable_connector, webSocket } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { injected, walletConnect } from 'wagmi/connectors';



import { env } from '@/config/env.mjs';



import type { Chain, FallbackTransport, HttpTransport, Transport, WebSocketTransport } from 'viem';


declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}

const infuraId = env.NEXT_PUBLIC_INFURA_KEY
const projectId = env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID

type ChainList = readonly [Chain, ...Chain[]]

let chainList: ChainList
let providerList: Record<ChainList[number]['id'], Transport | FallbackTransport>

const publicMap: Record<string, (HttpTransport | WebSocketTransport)[]> = {
  Ethereum: [
    http('https://rpc.ankr.com/eth', {batch: true}),
    http('https://ethereum-rpc.publicnode.com', {batch: true}),
    webSocket('wss://ethereum-rpc.publicnode.com'),
  ],
  // Goerli: [
  //   http('https://rpc.ankr.com/eth_goerli', {batch: true}),
  //   http('https://ethereum-goerli-rpc.publicnode.com', {batch: true}),
  //   http('https://goerli.blockpi.network/v1/rpc/public', {batch: true}),
  // ],
  Sepolia: [
    http('https://ethereum-sepolia-rpc.publicnode.com', {
      batch: true,
    }),
    http('https://1rpc.io/sepolia', {
      batch: true,
    }),
    webSocket('wss://ethereum-sepolia-rpc.publicnode.com'),
  ],
}

const infuraMap: Record<string, (HttpTransport | WebSocketTransport)[]> = {
  Ethereum: [
    http(`https://mainnet.infura.io/v3/${infuraId}`, {
      batch: true,
      key: 'infura-mainnet-http',
      name: 'Infura HTTP Provider',
    }),
    webSocket(`wss://mainnet.infura.io/ws/v3/${infuraId}`, {
      key: 'infura-mainnet-wss',
      name: 'Infura Websocket Provider',
    }),
  ],
  // Goerli: [
  //   http(`https://goerli.infura.io/v3/${infuraId}`, {
  //     batch: true,
  //     key: 'infura-goerli-http',
  //     name: 'Infura HTTP Provider',
  //   }),
  // ],
}

//Create a the transports chains list
if (env.NEXT_PUBLIC_TESTNET_ONLY) {
  //testnet only
  chainList = [sepolia]
} else {
  //testnet and mainnet
  chainList = [mainnet, sepolia]
}

if (infuraId) {
  //create a fallback list with infura and then public
  //NOTE: this is basd on a hardcoded list based
  providerList = chainList.reduce((n, o) => {
    return {
      ...n,
      [o.id]: fallback([
        unstable_connector(injected),
        ...infuraMap[o.name],
        ...publicMap[o.name],
      ]),
    }
  }, {})
} else {
  providerList = chainList.reduce((n, o) => {
    return {
      ...n,
      [o.id]: fallback([unstable_connector(injected), ...publicMap[o.name]]),
    }
  }, {})
}

// connectors: [injected({target: 'metaMask'}), walletConnect({projectId})],

export const config = createConfig({
  chains: chainList,
  ssr: true,
  connectors: [injected({target: 'metaMask'}), walletConnect({projectId})],
  multiInjectedProviderDiscovery: false,
  cacheTime: 10 * 60_000,
  pollingInterval: 60_000,
  transports: providerList,
  storage: createStorage({storage: cookieStorage}),
  batch: {multicall: true},
})