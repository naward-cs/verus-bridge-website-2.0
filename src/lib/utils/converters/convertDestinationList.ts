import type {primitives} from 'verusid-ts-client'

export const convertDestinationList = (
  tokenList: TokenList[],
  currencyList: primitives.CurrencyDefinition
) => {
  if (tokenList.length == 0) return {}
  const list = Object.fromEntries(
    currencyList.currencies.map((k) => {
      const token = tokenList.filter((t) => t.id === k)[0]
      const value = `bridge${token.value}`
      const label = `${token.value}`
      const currency = token.value
      return [k, {id: k, value, label, iaddress: token.iaddress, currency}]
    })
  )
  const bridgeToken = tokenList.filter(
    (t) => t.id === currencyList.currencyid
  )[0]

  list[currencyList.currencyid] = {
    id: currencyList.currencyid,
    value: 'bridgeBridge',
    label: 'Bridge.vETH',
    iaddress: bridgeToken.iaddress,
    currency: 'VBRID',
  }

  return list
}
