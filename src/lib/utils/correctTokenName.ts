import fromTokenList from '@/data/fromTokenCorrection.json'
import toTokenList from '@/data/toTokenCorrection.json'

export const FromTokenName = (name?: string) => {
  if (name === undefined) return name
  let newName = name
  fromTokenList.map((t) => {
    if (t.misTypes.includes(name)) {
      newName = t.name
    }
  })

  if (newName[0] === '[') {
    //evaluate length keep it short
    const tokenNameArr = newName.split(']')
    if (tokenNameArr[0].length > 30) {
      newName =
        tokenNameArr[0].slice(0, 5) +
        '...' +
        tokenNameArr[0].slice(-3) +
        ']' +
        tokenNameArr[1]
    }
  }
  return newName
}

export const ToTokenName = (name: string) => {
  if (!name) return undefined
  let tokenInfo: {
    name: string
    verusToken?: string
    ethToken?: string
  } = {name: name, verusToken: undefined, ethToken: undefined}
  let tempVerusToken
  if (name.split(']').length > 1) {
    tokenInfo.name = name.split(']')[0].slice(1)
    tempVerusToken = name.split(']')[1].slice(4)
  }

  toTokenList.map((t) => {
    if (t.misTypes.includes(name)) {
      tokenInfo = {name: t.name, verusToken: t.verusToken, ethToken: t.ethToken}
    }
  })

  if (tempVerusToken) tokenInfo.verusToken = tempVerusToken

  return tokenInfo
}
