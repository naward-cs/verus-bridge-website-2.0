import {FLAG_MAP_TYPE} from '@/config/constants'
import {BLOCKCHAIN_NAME} from '@/lib/server/verusChains'

//Split original Token List into two parts
export const GetFromList = (list: TokenList[]) => {
  //get non mapped tokens
  const startList = list.filter((t) => t.flags !== FLAG_MAP_TYPE)
  //get mapped tokens
  const mapList = list.filter((t) => t.flags === FLAG_MAP_TYPE)
  //generate list from non-mapped tokens
  const fromList = startList.reduce((newList: FromList[], origList) => {
    //place for testnet fix
    let value = origList.value
    if (origList.label === 'bridge.vETH') {
      value = 'VBRID'
    }
    return [
      ...newList,
      {
        label: origList.label,
        value,
        erc20address: origList.erc20address,
        flags: origList.flags,
      },
    ]
  }, [])
  //append non-existing tokens to from list
  mapList.map((m) => {
    if (fromList.find((o) => o.erc20address === m.erc20address) === undefined) {
      fromList.push({
        label: m.label.split(']')[0].slice(1),
        value: m.value,
        erc20address: m.erc20address,
        flags: m.flags,
      })
    }
  })

  return fromList
}

export const GetSendList = (list: TokenList[], chain: number) => {
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
          value: BLOCKCHAIN_NAME(chain),
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
      value: BLOCKCHAIN_NAME(chain),
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