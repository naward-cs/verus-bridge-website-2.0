export const TokenToBridgeToken = (token: string, bridgeList?: CoinList[]) => {
  switch (token) {
    case 'vrsc':
      return bridgeList?.filter(
        (t) => t.value === 'vrsc' || t.value === 'vrsctest'
      )[0]
    case 'eth':
      return bridgeList?.filter((t) => t.value === 'veth')[0]
    case 'dai':
      return bridgeList?.filter((t) => t.value === 'dai')[0]
    case 'mkr':
      return bridgeList?.filter((t) => t.value === 'mkr')[0]
    default:
      return {name: token, amount: 0, daiPrice: 0, value: token}
  }
}
