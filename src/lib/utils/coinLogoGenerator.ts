const hashCode = (str: string) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return hash
}

const intToRGB = (i: number) => {
  const c = (i & 0x00ffffff).toString(16)
  const sub = '00000'.substring(0, 6 - c.length) + c
  return `#${sub}`
}

export const CoinLogoGenerator = (iAddr: string) => {
  const hashedNum = hashCode(iAddr)
  const bgColor = intToRGB(hashedNum)
  const intColors = []
  for (let i = 0; i < 16; i++) {
    const x = Math.sin(i + hashedNum) * (10000 + hashedNum)
    intColors.push(intToRGB(Math.floor(x)))
  }
  return {bgColor, intColors}
}
