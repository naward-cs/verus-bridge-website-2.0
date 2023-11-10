import {parseEther, ZeroAddress} from 'ethers'
import {toast} from 'sonner'

import {
  bounceBackFee,
  CONVERT,
  DEST_ETH,
  DEST_ID,
  DEST_PKH,
  ETH_FEES,
  FLAG_DEST_AUX,
  FLAG_DEST_GATEWAY,
  IMPORT_TO_SOURCE,
  RESERVE_TO_RESERVE,
  VALID,
} from '@/config/constants'
import {BLOCKCHAIN_NAME} from '@/lib/server/verusChains'

import {coinsToSats, convertVerustoEthAddress} from './convert'
import {isETHAddress, isIAddress, isRAddress} from './rules'

// type ConfigOptions = {
//   toAddress: `0x${string}` | string
//   toToken: DestinationOption
//   poolAvailable: boolean
//   fromToken: TokenList
//   GasPrice: {SATSCOST: string; WEICOST: string}
//   bounceBackAddr: string
//   bridge: string
//   bridgeList: BridgeList
//   chain: number
// }

type ConfigOptions = {
  formInput: ConvertFormData
  toAddress: string
  poolAvailable: boolean
  bounceBackAddr: string
  bridgeList: BridgeList
  chain: number
}

export const getConfigOptions = async ({
  formInput,
  toAddress,
  poolAvailable,
  bounceBackAddr,
  bridgeList,
  chain,
}: ConfigOptions) => {
  const {toToken, fromToken, gasPrice: GasPrice, fromAmount} = formInput
  let destinationType: null | number = null
  let flagValue = VALID
  let secondReserveId = ZeroAddress
  let destinationCurrency: null | string = null
  let destinationAddress: `0x${string}` | string

  //set destination to correct type

  if (isIAddress(toAddress)) {
    destinationType = DEST_ID //ID TYPE
    destinationAddress = convertVerustoEthAddress(toAddress)
  } else if (isRAddress(toAddress)) {
    destinationType = DEST_PKH //R TYPE
    destinationAddress = convertVerustoEthAddress(toAddress)
  } else if (isETHAddress(toAddress)) {
    destinationType = DEST_ETH + FLAG_DEST_AUX //ETH TYPE
    destinationAddress = `${toAddress}01160214${convertVerustoEthAddress(
      bounceBackAddr
    ).slice(2)}` // vec 01 , subvec length 0x16, type DEST_PKH length 0x14
  } else {
    //error for assignment of destination address
    toast.error('A destination address was not provided')
    return null
  }

  const blockChainName = BLOCKCHAIN_NAME(chain)
  const GLOBAL_ADDRESS = Object.fromEntries(
    Object.values(bridgeList).map((k) => [k.value, k.iaddress])
  )
  const BETH = GLOBAL_ADDRESS.bridgeBridge
  if (destinationType === DEST_ID || destinationType === DEST_PKH) {
    //if I or R address chosen then do one way specific stuff
    if (!poolAvailable) {
      if (toToken.value === blockChainName) {
        flagValue = VALID
        destinationCurrency = toToken.iaddress
      } else {
        toast.error('Cannot convert yet Bridge.veth not launched') //add in FLAGS logic for destination
        return null
      }
    } else {
      //if not in Globals list

      // console.log('GLOB', GLOBAL_ADDRESS)
      // multi step check
      // 1) is this a sending event (send [coin] to Verus)
      // 2) is this convertting to Bridge.vETH (bridgeBridge)
      // 3) is this converting to any other Bridge.[token] (bridgeVRSC, bridgeDAI, etc.)
      // 4) non of the above throw error
      if (toToken.value === blockChainName) {
        //#1: catch if sending

        destinationCurrency = BETH //bridge open all sends go to bridge.veth
        flagValue = VALID
      } else if (toToken.value === 'bridgeBridge') {
        //#2: catch for bridge itself

        destinationCurrency = BETH //bridge open all sends go to bridge.veth
        if (fromToken.iaddress !== BETH) {
          flagValue = VALID + CONVERT //add convert flag on
        } else {
          toast.error(
            `Cannot convert bridge to bridge. Send Direct to ${blockChainName}`
          ) //add in FLAGS logic for destination
          return null
        }
      } else if (!!GLOBAL_ADDRESS[toToken.value]) {
        //#3: catch for all bridge conversions
        //not from == self and not from bridge.veth
        if (
          fromToken.iaddress !== GLOBAL_ADDRESS[toToken.value] &&
          fromToken.iaddress !== BETH
        ) {
          destinationCurrency = BETH //bridge open convert from token to VRSC
          secondReserveId = GLOBAL_ADDRESS[toToken.value]
          flagValue = VALID + CONVERT + RESERVE_TO_RESERVE //add convert flag on
        } else if (fromToken.iaddress === BETH) {
          destinationCurrency = GLOBAL_ADDRESS[toToken.value]
          flagValue = VALID + CONVERT + IMPORT_TO_SOURCE
        } else {
          toast.error(
            `Cannot convert ${fromToken.value} to ${toToken.currency}. Send Direct to ${blockChainName}` //add in FLAGS logic for destination
          )
          return null
        }
      } else {
        //#4: neither convert or sending
        toast.error('Cannot bounce back, direct send only with i or R address') //add in FLAGS logic for destination
        return null
      }
    }
  } else if (
    destinationType === DEST_ETH + FLAG_DEST_AUX &&
    poolAvailable &&
    GasPrice
  ) {
    // if ethereuem address, pool is available, and converting back to ETH chain
    destinationType += FLAG_DEST_GATEWAY //add 128 = FLAG_DEST_GATEWAY
    bounceBackFee.writeUInt32LE(Number(GasPrice.SATSCOST))
    //destination is concatenated with the gateway back address (bridge.veth) + uint160() + 0.003 ETH in fees uint64LE

    destinationAddress =
      destinationAddress.slice(0, 42) +
      GLOBAL_ADDRESS.bridgeETH.slice(2) +
      '0000000000000000000000000000000000000000' +
      bounceBackFee.toString('hex') +
      destinationAddress.slice(42)

    //Same as going to verus chain, now we are converting and sending back to ETH address
    // #1 Special convert for bridge.veth
    // #2 Can convert any other bridge token
    // #3 Can't do anything else, no sending
    const isFromBETH = fromToken.iaddress === BETH

    if (toToken.value === 'bridgeBridge') {
      //#1 going to bridge
      if (isFromBETH) {
        toast.error('Cannot bounce back, direct send only') //add in FLAGS logic for destination
        return null
      } else {
        destinationCurrency = BETH
        flagValue = VALID + CONVERT
      }
    } else if (!!GLOBAL_ADDRESS[toToken.value]) {
      //#2 any other bridge token
      if (isFromBETH) {
        //converting from bridge.veth
        destinationCurrency = GLOBAL_ADDRESS[toToken.value]
        flagValue = VALID + CONVERT + IMPORT_TO_SOURCE
      } else {
        //not converting from bridge.veth (some other type of erc20)
        destinationCurrency = BETH
        secondReserveId = GLOBAL_ADDRESS[toToken.value]
        flagValue = VALID + CONVERT + RESERVE_TO_RESERVE
      }
    } else {
      //#3 can't do
      toast.error('Cannot bounce back, direct send only') //add in FLAGS logic for destination
      return null
    }
  } else {
    toast.error(
      'Bridge.veth not launched yet, send only direct to i or R until launch complete'
    ) //add in FLAGS logic for destination
    return null
  }

  let feeCurrency: `0x${string}`
  let fees: string
  if (poolAvailable) {
    feeCurrency = GLOBAL_ADDRESS.bridgeETH as `0x${string}`
    fees = ETH_FEES.SATS //0.003 ETH FEE
  } else {
    feeCurrency = GLOBAL_ADDRESS.VRSC as `0x${string}`
    fees = '2000000' // 0.02 VRSC
  }

  const verusAmount = coinsToSats(fromAmount.toString())
  const currencyIaddress = fromToken.iaddress as `0x${string}`
  const CReserveTransfer: CReserveTransferType = {
    version: 1,
    currencyvalue: {currency: currencyIaddress, amount: BigInt(verusAmount)}, // currency sending from ethereum
    flags: flagValue,
    feecurrencyid: feeCurrency, // fee is vrsc pre bridge launch, veth or others post.
    fees: BigInt(fees),
    destination: {
      destinationtype: destinationType,
      destinationaddress: destinationAddress as `0x${string}`,
    }, // destination address currency is going to
    destcurrencyid: destinationCurrency as `0x${string}`, // destination currency is vrsc on direct. bridge.veth on bounceback
    destsystemid: ZeroAddress as `0x${string}`, // destination system not used
    secondreserveid: secondReserveId as `0x${string}`, // used as return currency type on bounce back
  }
  if (currencyIaddress === secondReserveId) {
    toast.error('Cannot bounceback to same currency')
    return null
  }

  let walletFee = parseEther(ETH_FEES.ETH)
  if (destinationType & FLAG_DEST_GATEWAY) {
    walletFee = walletFee + BigInt(GasPrice.WEICOST) // bounceback fee
  }

  if (fromToken.iaddress === ZeroAddress) {
    walletFee = walletFee + parseEther(fromAmount.toString())
  }

  return {CReserveTransfer, fee: walletFee.toString()}
}
