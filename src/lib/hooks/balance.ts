'use client';

import {AddressZero} from '@ethersproject/constants'
import {erc20ABI, useAccount, useBalance, useContractReads} from 'wagmi'



import {useFormValues} from './formValues'

import type {FetchBalanceResult} from 'wagmi/actions'


export const useBalances = () => {
  const {selectedFromToken} = useFormValues()
  const {address: account, isConnected} = useAccount()
  const isEth = /^(0x)?[0]{40}$/.test(selectedFromToken?.erc20address)
  const {data: EthBalance} = useBalance({
    address: account,
    formatUnits: 'ether',
    watch: true,
    staleTime: 60_000,
    enabled: isConnected && isEth,
  })
  const {data: ErcBalance} = useBalance({
    address: account,
    token: selectedFromToken?.erc20address,
    watch: true,
    staleTime: 60_000,
    enabled: isConnected && selectedFromToken && !isEth,
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
    return 'Amount too large'
  if (Number(amount) < 0) return 'Insert amount'

  if (isConnected) {
    if (isEth) {
      if (Number(EthBalance?.formatted) < Number(amount)) {
        return `Insufficient balance`
      }
      return true
    } else {
      if (Number(ErcBalance?.formatted) < Number(amount)) {
        return `Insufficient balance`
      }
      return true
    }
  } else {
    return true
  }
}

export const useGetAllERC20balances = (
  account?: `0x${string}`,
  tokens?: `0x${string}`[]
) => {
  const contracts = tokens
    ?.filter((t) => t !== AddressZero)
    .map((t) => {
      return {
        address: t,
        abi: erc20ABI,
        functionName: 'balanceOf',
        args: [account!],
      }
    })
  return useContractReads({
    contracts,
    enabled: !!tokens && !!account,
    staleTime: 4_000,
    watch: true,
    select: (data) => {
      try {
        const list = contracts?.map((t, i) => {
          return {[t.address]: data[i].result}
        })
        return list
      } catch (error) {
        throw new Error('unable to get balances')
      }
    },
  })
}