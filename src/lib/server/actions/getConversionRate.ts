'use server'

import {VerusRPC} from '../settings'
import {getDestinationList} from './getDestinationList'

type ConversionPackage = {
  currency: string
  convertto: string //do not use camel case due to verus api does not support
  amount: number
  via?: string //this is to indicate using bridge token or not
}

export const getConversionRate = async (
  fromToken: FromList,
  toToken: DestinationOption,
  amount = 1
) => {
  try {
    const {bridge, verusList: bridgeList} = await getDestinationList()

    //lets check if we are converting first
    // if (fromToken.id === toToken.id) {
    //   return null
    // }
    if (fromToken.value === toToken.currency) return null

    const convertingTo = toToken.id
    // const convertingFrom = fromToken.id
    const convertingFrom = Object.values(bridgeList).find(
      (k) => k.currency === fromToken.value
    )?.id
    const conversionPackage: ConversionPackage = {
      currency: convertingFrom!,
      convertto: convertingTo,
      amount,
    }
    //check to make sure from and to are not of Bridge.vETH
    if (convertingTo !== bridge && convertingFrom !== bridge) {
      //since not the from or to Bridge.vETH the exchange will be done using Bridge.vETH contract
      conversionPackage.via = bridge
    }
    //if working from bridge token
    if (Object.keys(bridgeList).indexOf(convertingFrom!) > -1) {
      const estimation =
        await VerusRPC().interface.estimateConversion(conversionPackage)
      if (estimation.error) return null
      const destinationName = await VerusRPC().interface.getCurrency(toToken.id)
      return {
        value: `${estimation.result?.estimatedcurrencyout}`,
        destination: destinationName.result?.fullyqualifiedname,
      }
    }
    return null
  } catch (error) {
    //TODO: need to support server error logging
    throw new Error('Failed to fetch conversion rate')
  }
  return null
}
