import type {State} from 'wagmi'

// wagmi.d.ts

export type WagmiStore = State | undefined

export type ProviderProps = {
  children: React.ReactNode
  initialState: WagmiStore
}
