import {readContractQueryOptions} from 'wagmi/query'

import delegatorAbi from '@/config/abi/DelegatorAbiJson.json'
import {config} from '@/config/wagmi'

const txHeightQueryOptions = (
  chainId: number,
  delegatorAddr: `0x${string}`
) => {
  return readContractQueryOptions(config, {
    address: delegatorAddr,
    abi: delegatorAbi,
    functionName: 'bestForks',
    args: [0n],
    chainId: chainId,
  })
}

export default txHeightQueryOptions
