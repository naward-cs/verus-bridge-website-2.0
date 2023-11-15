'use client';

import { useAccount, useBalance } from 'wagmi';



import { useFormValues } from './formValues';



import type { FetchBalanceResult } from 'wagmi/actions';


export const useBalances = () => {
  const {fromToken} = useFormValues()
  const {address: account, isConnected} = useAccount()
  const isEth = /^(0x)?[0]{40}$/.test(fromToken?.erc20address)
  const {data: EthBalance} = useBalance({
    address: account,
    formatUnits: 'ether',
    watch: true,
    staleTime: 60_000,
    enabled: isConnected && isEth,
  })
  const {data: ErcBalance} = useBalance({
    address: account,
    token: fromToken?.erc20address,
    watch: true,
    staleTime: 60_000,
    enabled: isConnected && fromToken && !isEth,
  })
  return {isEth, isConnected, EthBalance, ErcBalance}
}

// const isNumberic = (value: string) => /^\d+(?:.\d?).*/.test(value)
export const ValidateAmount = (
  amount: string,
  isEth: boolean,
  isConnected: boolean,
  EthBalance?: FetchBalanceResult,
  ErcBalance?: FetchBalanceResult
) => {
  // lets mark the max 8 decimals
  //FIXME: prevent non-numeric entries
  // if (!isNumberic(amount)) return 'Only numbers allowed'
  if (amount.split('.')[1] && amount.split('.')[1].length > 8)
    return 'max 8 decimals'

  if (Number(amount) > 100000000)
    return 'Amount too large. Try a smaller amount.'
  if (Number(amount) < 0) return 'Amount is not valid.'

  if (isConnected) {
    if (isEth) {
      if (Number(EthBalance?.formatted) < Number(amount)) {
        return `Amount is not available in your wallet. ${EthBalance?.formatted} ${EthBalance?.symbol}`
      }
      return true
    } else {
      if (Number(ErcBalance?.formatted) < Number(amount)) {
        return `Amount is not available in your wallet. ${ErcBalance?.formatted} ${ErcBalance?.symbol}`
      }
      return true
    }
  } else {
    return true
  }
}