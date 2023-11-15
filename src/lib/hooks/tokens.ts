import {useQuery} from '@tanstack/react-query'

import {BridgeName} from '@/config/constants'
import {getDestinationList} from '@/lib/server/verusQueries'

import {useGetTokenFromList} from './delegator'
import {NetworkChain} from './network'
import {createConvertOptionsList} from './verus'

export const useGetTokens = () => {
  const chainID = NetworkChain()
  const {data: tokenList} = useGetTokenFromList()
  // console.log(tokenList)
  const bridge = tokenList?.filter(
    (t) => t.label.toUpperCase() === BridgeName
  )[0].id

  const {data: bridgeList} = useQuery({
    queryKey: ['destinationList', chainID, bridge],
    queryFn: () => getDestinationList(chainID, bridge!),
    select(data) {
      try {
        const list = createConvertOptionsList(tokenList!, data.result!)
        return list
      } catch {
        throw new Error('unable to get converstion list')
      }
    },
    enabled: !!bridge,
  })
  return {tokenList, bridgeList, bridge}
}
