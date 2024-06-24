'use server'

import {BridgeName} from '@/config/constants'
import {convertDestinationList} from '@/lib/utils/converters/convertDestinationList'
import {createSendList} from '@/lib/utils/converters/createSendList'

import {getTokenList} from './getTokenList'
import {getVerusBridgeList} from './getVerusBridgeList'

export const getDestinationList = async () => {
  //need to find the bridge from delegator token list
  const delegatorTokenList = await getTokenList()

  const bridge = delegatorTokenList.find(
    (t) => t.label.toUpperCase() === BridgeName
  )?.id
  //get list of tokens on the verus
  const verusCurrencies = await getVerusBridgeList(bridge!)

  const verusList = convertDestinationList(
    delegatorTokenList,
    verusCurrencies.result!
  )
  const tokenListFromDelegator = createSendList(delegatorTokenList)

  return {verusList, tokenListFromDelegator, bridge}
}
