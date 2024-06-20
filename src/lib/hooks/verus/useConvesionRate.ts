import {useQuery} from '@tanstack/react-query'
import {useChainId} from 'wagmi'

import {getConversionRate} from '@/lib/server/actions/getConversionRate'

type ConversionRateProp = {
  fromToken: FromList
  toToken: DestinationOption
}
export const useConvesionRate = ({fromToken, toToken}: ConversionRateProp) => {
  const chainId = useChainId()
  // const {setValue, getValues} = useFormContext()
  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['convertRate', fromToken?.value, toToken?.value, chainId],
    queryFn: () => getConversionRate(fromToken, toToken),
    enabled: !!fromToken && !!toToken,
    notifyOnChangeProps: ['data'],
  })
}
