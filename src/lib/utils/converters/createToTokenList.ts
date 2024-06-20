import {FLAGS} from '@/config/constants'

export const createOptionsList = ({
  from,
  sendList,
  bridge,
}: {
  from: FromList
  sendList: Record<string, DestinationOption[]>
  bridge: Record<string, DestinationOption>
}) => {
  if (from) {
    //lets find if "from" flag is conversion approved
    const convertToken =
      from.flags & FLAGS.MAPPING_PARTOF_BRIDGEVETH ||
      from.flags & FLAGS.MAPPING_ISBRIDGE_CURRENCY
    // const addedToken = !Object.keys(bridge).includes(from.id)
    //
    let convertList: DestinationOption[] | undefined
    if (convertToken) {
      convertList = Object.values(bridge).filter(
        (o) => o.currency !== from.value
      )
    }
    if (convertList) {
      return {
        vOptions: [...convertList, ...sendList[from.erc20address]],
        eOptions: convertList,
      }
    } else {
      return {vOptions: sendList[from.erc20address], eOptions: []}
    }
  } else return {vOptions: [], eOptions: []}
}
