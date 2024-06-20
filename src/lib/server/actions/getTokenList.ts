'use server'

import {readContract} from 'wagmi/actions'

import delegatorAbi from '@/config/abi/DelegatorAbiJson.json'
import {FLAGS} from '@/config/constants'
import {config} from '@/config/wagmi'
import {getChainId, getDelegatorAddress} from '@/lib/server/settings'
import {toBase58Check} from '@/lib/utils/converters'

export const getTokenList = async () => {
  const chainId = getChainId()
  const delegatorAddr = getDelegatorAddress()
  let data = [] as unknown as FromTokenList[]
  try {
    data = (await readContract(config, {
      address: delegatorAddr!,
      abi: delegatorAbi,
      functionName: 'getTokenList',
      args: [0n, 0n],
      chainId: chainId,
    })) as unknown as FromTokenList[]
  } catch (error) {
    console.error(error)
  }

  const list = data.map((e) => ({
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
}
