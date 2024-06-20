import {FLAG_MAP_TYPE} from '@/config/constants'
import {BLOCKCHAIN_NAME, getChainId} from '@/lib/server/settings'

export const createSendList = (list: TokenList[]) => {
  const chainId = getChainId()
  //get non mapped tokens
  const startList = list.filter((t) => t.flags !== FLAG_MAP_TYPE)
  //get mapped tokens
  const mapList = list.filter((t) => t.flags === FLAG_MAP_TYPE)
  //pre-setup the sendList
  const sendList = Object.fromEntries(
    startList.map((k) => [
      k.erc20address,
      [
        {
          id: k.id,
          value: BLOCKCHAIN_NAME(chainId),
          label: k.label,
          iaddress: k.iaddress,
          currency: k.value,
        },
      ],
    ])
  )
  // Add mapping to the to list for what can be sent to on the to Token List
  mapList.map((m) => {
    const dList = {
      id: m.id,
      value: BLOCKCHAIN_NAME(chainId),
      label: m.label,
      iaddress: m.iaddress,
      currency: m.value,
    }
    if (sendList[m.erc20address]) {
      //already exists in the toList
      sendList[m.erc20address].push(dList)
    } else {
      //doesn't exists
      sendList[m.erc20address] = [dList]
    }
  })
  return sendList
}
