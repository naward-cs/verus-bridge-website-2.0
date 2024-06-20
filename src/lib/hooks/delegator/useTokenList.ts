import {useReadContract} from 'wagmi'

import delegatorAbi from '@/config/abi/DelegatorAbiJson.json'
import {FLAGS} from '@/config/constants'
import {DelegatorAddress} from '@/config/delegator'
import {toBase58Check} from '@/lib/utils/converters'

export const useTokenList = (chainId?: number) => {
  const delegatorAddr = DelegatorAddress(chainId)
  return useReadContract({
    address: delegatorAddr,
    abi: delegatorAbi,
    functionName: 'getTokenList',
    args: [0n, 0n],
    query: {
      staleTime: 60_000,
      select(data) {
        const list = (data as unknown as FromTokenList[]).map((e) => ({
          label: e.name,
          value: e.ticker,
          iaddress: e.iaddress,
          erc20address: e.erc20ContractAddress,
          id: toBase58Check(e.iaddress),
          flags: e.flags,
        }))
        const ercList = list.filter(
          (token) => token.flags & FLAGS.MAPPING_ERC20_DEFINITION && token.label
        )
        return ercList as TokenList[]
      },
    },
  })
}
