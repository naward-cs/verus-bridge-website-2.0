import {AddressZero} from '@ethersproject/constants'
import {useQuery} from '@tanstack/react-query'
import {useAccount} from 'wagmi'

import {BridgeName} from '@/config/constants'
import {getDestinationList} from '@/lib/server/verusQueries'

import {useGetAllERC20balances} from './balance'
import {useGetTokenFromList} from './delegator'
import {NetworkChain} from './network'
import {createConvertOptionsList} from './verus'

export const useGetTokens = () => {
  const chainID = NetworkChain()

  const {data: originalTokenList} = useGetTokenFromList()
  // console.log(tokenList)

  const bridge = originalTokenList?.filter(
    (t) => t.label.toUpperCase() === BridgeName
  )[0].id

  const {data: bridgeList} = useQuery({
    queryKey: ['destinationList', chainID, bridge],
    queryFn: () => getDestinationList(chainID, bridge!),
    select(data) {
      try {
        const list = createConvertOptionsList(originalTokenList!, data.result!)
        return list
      } catch {
        throw new Error('unable to get converstion list')
      }
    },
    enabled: !!bridge,
  })
  const {address:account, isConnected} = useAccount()
  let tokenList = originalTokenList
  const tList = originalTokenList?.map((t) => t.erc20address)
  const {data: ethBalance} = useGetAllERC20balances(account,tList)
  const hasEthBalance: string[] = []
  if (isConnected) {
    if (ethBalance) {
      ethBalance.forEach((t) => {
        for (const [key, value] of Object.entries(t)) {
          if ((value as unknown as bigint) > 0n) {
            hasEthBalance.push(key)
          }
        }
      })
    }
    if (!!hasEthBalance.length) {
      tokenList = originalTokenList?.filter(
        (t) =>
          t.erc20address === AddressZero ||
          hasEthBalance.includes(t.erc20address)
      )
    } else {
      tokenList = originalTokenList?.filter(
        (t) => t.erc20address === AddressZero
      )
    }
  }

  return {tokenList, bridgeList, bridge}
}

export const useGetBridgeInfo = () => {
  const chainID = NetworkChain()
  const {bridge} = useGetTokens()

  const {data: bridgeInfo} = useQuery({
    queryKey: ['destinationList', chainID, bridge],
    queryFn: () => getDestinationList(chainID, bridge!),
    select(data) {
      try {
        const info = data.result
        return info
      } catch {
        throw new Error('unable to get converstion list')
      }
    },
    enabled: !!bridge,
  })
  return {bridgeInfo}
}
