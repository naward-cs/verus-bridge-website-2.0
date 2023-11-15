import {useQuery} from '@tanstack/react-query'
import BigNumber from 'bignumber.js'
import {fetchFeeData} from 'wagmi/actions'

import {ETH_FEES} from '@/config/constants'

export const useGasRate = () => {
  return useQuery({
    queryKey: ['gasRates'],
    queryFn: () => fetchFeeData(),
    cacheTime: 30 * 1000,
    refetchInterval: 60 * 1000,
    select(data) {
      let gasInSats = new BigNumber(ETH_FEES.GAS_TRANSACTIONIMPORTFEE)
      let gasInWei = new BigNumber(ETH_FEES.MINIMUM_GAS_PRICE_WEI).times(
        gasInSats
      )
      if (data?.gasPrice) {
        const gasBuffer = new BigNumber(data.gasPrice.toString())
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
    },
  })
}
