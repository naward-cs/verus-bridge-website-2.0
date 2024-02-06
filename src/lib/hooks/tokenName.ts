import fromTokenList from '@/data/fromTokenCorrection.json' 
import toTokenList from '@/data/toTokenCorrection.json' 
export const FromTokenName = (name: string) => {
  let newName = name
  fromTokenList.map((t) => {
    if (t.misTypes.includes(name)) {
      newName = t.name
    }
  })
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