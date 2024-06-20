import {useAccount, useBalance as useEthBalance} from 'wagmi'

import {useERC20Balance} from '@/lib/hooks/wagmi/useErc20Balance'
import {isEth as isEthCheck} from '@/lib/utils'

import {useFormValues} from '.'
import {useWatch} from '@/lib/hooks/wagmi'

//This is returns either Eth Balance or ERC20 token Balance
export const useFormBalances = () => {
  const {address} = useAccount()
  const {fromToken} = useFormValues()
  const {data: ethBalance, queryKey: ethQueryKey} = useEthBalance({
    address,
    query: {
      staleTime: 60_000,
    },
  })
  const {data: erc20Balance, queryKey: erc20queryKey} = useERC20Balance(
    address,
    fromToken?.erc20address,
    {staleTime: 60_000}
  )
  useWatch(ethQueryKey)
  useWatch(erc20queryKey)
  const isEth = isEthCheck(fromToken?.erc20address)
  return {isEth, ethBalance, erc20Balance}
}
