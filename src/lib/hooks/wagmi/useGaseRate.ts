import BigNumber from 'bignumber.js'
import {useEstimateGas} from 'wagmi'

import {ETH_FEES} from '@/config/constants'

export const useGaseRate = () => {
  const gasPrice = useEstimateGas({
    query: {refetchInterval: 5 * 60_000, notifyOnChangeProps: ['data']},
  })
  let gasInSats = new BigNumber(ETH_FEES.GAS_TRANSACTIONIMPORTFEE)
  let gasInWei = new BigNumber(ETH_FEES.MINIMUM_GAS_PRICE_WEI).times(gasInSats)
  if (gasPrice) {
    const gasBuffer = new BigNumber(gasPrice.toString())
      .times(new BigNumber(12))
      .dividedBy(new BigNumber(10)) //20%

    if (gasBuffer.gt(new BigNumber(ETH_FEES.MINIMUM_GAS_PRICE_WEI))) {
      gasInWei = gasBuffer.times(gasInSats)
      gasInSats = gasBuffer
        .times(gasInSats)
        .dividedBy(new BigNumber('10000000000'))
    }
  }
  return {SATSCOST: gasInSats.toString(), WEICOST: gasInWei.toString()}
}
