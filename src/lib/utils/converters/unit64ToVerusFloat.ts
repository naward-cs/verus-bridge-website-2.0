export const unit64ToVerusFloat = (amount: bigint) => {
  let inter = `${amount / BigInt('100000000')}.`
  let decimalp = `${amount % BigInt('100000000')}`
  if (amount < 0n) {
    inter = `-${inter}`
    decimalp = decimalp.slice(1)
  }
  while (decimalp.length < 8) {
    decimalp = `0${decimalp}`
  }
  return inter + decimalp
}
