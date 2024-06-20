import * as dn from 'dnum'

export const validateAmount = (
  amount: string,
  balance?: {
    value: bigint
    decimals: number
    symbol?: string
    formatted?: string
  },
  gasPrice?: string
) => {
  // lets mark the max 8 decimals
  if (amount.split('.')[1] && amount.split('.')[1].length > 8)
    return 'max 8 decimals'

  if (Number(amount) > 100000000) return 'Amount too large'
  if (Number(amount) < 0) return 'Insert amount'

  if (balance && gasPrice) {
    const newBalanceAvail = dn.sub([balance.value, balance.decimals], gasPrice)
    const balanceFormated = dn.format(newBalanceAvail)
    if (Number(balanceFormated) < Number(amount)) return 'Insufficient balance'
  }
  return true
}
