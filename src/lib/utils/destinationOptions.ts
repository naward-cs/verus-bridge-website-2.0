import {FLAGS} from '@/config/constants'

export const DestinationOptions = ({
  from,
  sendList,
  bridge,
}: {
  sendList: {[key: string]: DestinationOption[]}
  from: FromList
  bridge: {[key: string]: DestinationOption}
}) => {
  //lets find if "from" flag is conversion approved
  const convertToken =
    from.flags & FLAGS.MAPPING_PARTOF_BRIDGEVETH ||
    from.flags & FLAGS.MAPPING_ISBRIDGE_CURRENCY
  // const addedToken = !Object.keys(bridge).includes(from.id)
  //
  let convertList: DestinationOption[] | undefined
  if (convertToken) {
    convertList = Object.values(bridge).filter((o) => o.currency !== from.value)
  }
  if (convertList) {
    return {
      vOptions: [...convertList, ...sendList[from.erc20address]],
      eOptions: convertList,
    }
  } else {
    return {vOptions: sendList[from.erc20address], eOptions: []}
  }
  // const destinationList = {
  //   id: from.id,
  //   value: BLOCKCHAIN_NAME(chain),
  //   label: from.label,
  //   iaddress: from.iaddress,
  //   currency: from.value,
  // }
  // if (convertList) {
  //   return [...convertList, destinationList]
  // } else {
  //   return [destinationList]
  // }
}
