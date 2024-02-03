import {FLAG_MAP_TYPE} from '@/config/constants'

import {BLOCKCHAIN_NAME} from '../server/verusChains'

//Split original Token List into two parts
const SplitTokenList = (list: TokenList[], chain: number) => {
  // Part 1: create a defined from list
  const blockchain = BLOCKCHAIN_NAME(chain)
  // 1) truely from token list
  const startList = list.filter((t) => t.flags !== FLAG_MAP_TYPE)
  //pre-setup the sendList
  const sendList = Object.fromEntries(
    startList.map((k) => [
      k.erc20address,
      [
        {
          id: k.id,
          value: blockchain,
          label: k.label,
          iaddress: k.iaddress,
          currency: k.value,
        },
      ],
    ])
  )
  const fromList = startList.reduce((newList: FromList[], origList) => {
    return [
      ...newList,
      {
        label: origList.label,
        value: origList.value,
        erc20address: origList.erc20address,
        flags: origList.flags,
      },
    ]
  }, [])
  const mapList = list.filter((t) => t.flags === FLAG_MAP_TYPE)
  mapList.forEach((m) => {
    if (fromList.find((o) => o.erc20address === m.erc20address) === undefined) {
      fromList.push({
        label: m.label.split(']')[0].slice(1),
        value: m.value,
        erc20address: m.erc20address,
        flags: m.flags,
      })
    }
  })

  // 2) Add mapping to the to list for what can be sent to on the to Token List
  mapList.forEach((m) => {
    const dList = {
      id: m.id,
      value: blockchain,
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

  return {fromList, sendList}
}

export default SplitTokenList
