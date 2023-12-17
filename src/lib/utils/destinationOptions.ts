import {BLOCKCHAIN_NAME} from '../server/verusChains'

export const DestinationOptions = ({
  from,
  bridge,
  chain,
}: {
  from: TokenList
  bridge: {[key: string]: DestinationOption}
  chain: number
}) => {
  const addedToken = !Object.keys(bridge).includes(from.id)

  let convertList: DestinationOption[] | undefined
  if (!addedToken) {
    convertList = Object.values(bridge).filter(
      (o) => o.iaddress !== from.iaddress
    )
  }

  const destinationList = {
    id: from.id,
    value: BLOCKCHAIN_NAME(chain),
    label: from.label,
    iaddress: from.iaddress,
    currency: from.value,
  }
  if (convertList) {
    return [...convertList, destinationList]
  } else {
    return [destinationList]
  }
}
