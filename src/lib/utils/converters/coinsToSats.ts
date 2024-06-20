import BigNumber from 'bignumber.js'

const coinsToUnits = (coin: BigNumber, decimal: number) => {
  return coin.multipliedBy(BigNumber(10).pow(BigNumber(decimal)))
}

export const coinsToSats = (amount: string) => {
  BigNumber.set({EXPONENTIAL_AT: 1000000, ROUNDING_MODE: BigNumber.ROUND_FLOOR})
  const input = BigNumber(amount)
  return BigNumber(coinsToUnits(input, 8).toFixed(0)).toString()
}
