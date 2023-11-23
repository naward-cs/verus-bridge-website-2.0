'use server';

import {VerusRPC} from './verusRPC'

export const getBlockHeight = async (chain?: number) => {
  try {
    const blockHeight = await VerusRPC(chain).getCurrentHeight()
    return blockHeight
  } catch (e) {
    throw new Error('Failed to fetch current block height')
  }
}

export const getDestinationList = async (chain: number, bridge: string) => {
  try {
    const currencies = await VerusRPC(chain).interface.getCurrency(bridge)
    return currencies
  } catch (e) {
    throw new Error('Failed to fetch currency list')
  }
}

export const getConversionRate = async (
  chain: number,
  bridge: string,
  bridgeList: BridgeList,
  fromToken: TokenList,
  toToken: DestinationOption,
  amount = 1
) => {
  try {
    //lets check if we are converting first
    if (fromToken.id === toToken.id) {
      return null
    }
    const convertingTo = toToken.id
    const convertingFrom = fromToken.id
    const conversionPackage: {
      currency: string
      convertto: string
      amount: number
      via?: string
    } = {currency: convertingFrom, convertto: convertingTo, amount}
    //check to make sure from and to are not of Bridge.vETH
    if (convertingTo !== bridge && convertingFrom !== bridge) {
      //since not the from or to Bridge.vETH the exchange will be done using Bridge.vETH contract
      conversionPackage.via = bridge
    }
    //if working from bridge token
    if (Object.keys(bridgeList).indexOf(fromToken.id) > -1) {
      const estimation =
        await VerusRPC(chain).interface.estimateConversion(conversionPackage)
      if (estimation.error) return null
      const destinationName = await VerusRPC(chain).interface.getCurrency(
        toToken.id
      )
      return {
        value: `${estimation.result?.estimatedcurrencyout}`,
        destination: destinationName.result?.fullyqualifiedname,
      }
    }
    return null
  } catch (e) {
    throw new Error('Failed to fetch conversion rate')
  }
}

export const isValidVerusID = async (chain: number, address: string) => {
  //NOTE: This is only works as long as the address being sent is not of ETH or R-Address, ensure safeties, before using

  const result = await VerusRPC(chain).interface.getIdentity(address)

  return {result: result.result?.identity, error: result.error}
}

export const getIdentityInfo = async (chain: number, address: string) => {
  const result = await VerusRPC(chain).interface.getIdentity(address)
  return result
}

export const getVdxfId = async (chain: number, vdxf: string) => {
  const result = await VerusRPC(chain).interface.getVdxfId(vdxf)
  return result
}