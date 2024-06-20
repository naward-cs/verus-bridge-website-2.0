'use server'

import {readDelegatorBridgeConverterActive} from '@/generated'
import {toast} from 'sonner'
import {parseEther} from 'viem'

// import {readContract} from 'wagmi/actions'

// import delegatorAbi from '@/config/abi/DelegatorAbiJson.json'
import {
  AddressZero,
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
import {config} from '@/config/wagmi'
import {BLOCKCHAIN_NAME, getChainId} from '@/lib/server/settings'
import {isETHAddress, isIAddress, isRAddress} from '@/lib/utils'
import {coinsToSats} from '@/lib/utils/converters/coinsToSats'
import {convertVerustoEthAddress} from '@/lib/utils/converters/verusToEthAddress'

import {getDestinationList} from './getDestinationList'

export const getConfigOptions = async ({
  formInput,
  toAddress,
}: {
  formInput: ConvertFormData
  toAddress: string
}) => {
  const chainId = getChainId()
  const poolAvailable = await readDelegatorBridgeConverterActive(config, {
    chainId: chainId as 1 | 11155111,
  })
  // const poolAvailable = await readContract(config, {
  //   address: delegatorAddr!,
  //   abi: delegatorAbi,
  //   functionName: 'bridgeConverterActive',
  //   chainId: chainId,
  // })
  const {verusList: bridgeList} = await getDestinationList()
  const {
    toToken,
    fromToken,
    gasPrice: GasPrice,
    fromAmount,
    sendOnly,
    rAddress: bounceBackAddr,
  } = formInput
  let destinationType: null | number = null
  let flagValue = VALID
  let secondReserveId = AddressZero
  let destinationCurrency: null | string = null
  let destinationAddress: `0x${string}` | string
  //due to change of fromToken to no longer have iaddress and id
  //need to generate new reference of fromToken to fromTokenReference
  //
  let fromTokenReference: TokenList
  if (sendOnly) {
    fromTokenReference = {
      label: toToken.label,
      value: toToken.currency,
      iaddress: toToken.iaddress,
      erc20address: fromToken.erc20address,
      id: toToken.id,
      flags: fromToken.flags,
    }
  } else {
    const tokenInfo = Object.values(bridgeList).filter(
      (t) => t.currency === fromToken.value
    )[0]
    fromTokenReference = {
      label: tokenInfo.label,
      value: tokenInfo.currency,
      iaddress: tokenInfo.iaddress,
      erc20address: fromToken.erc20address,
      id: tokenInfo.id,
      flags: fromToken.flags,
    }
  }

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
  const blockChainName = BLOCKCHAIN_NAME(chainId)
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
        if (fromTokenReference.iaddress !== BETH) {
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
          fromTokenReference.iaddress !== GLOBAL_ADDRESS[toToken.value] &&
          fromTokenReference.iaddress !== BETH
        ) {
          destinationCurrency = BETH //bridge open convert from token to VRSC
          secondReserveId = GLOBAL_ADDRESS[toToken.value]
          flagValue = VALID + CONVERT + RESERVE_TO_RESERVE //add convert flag on
        } else if (fromTokenReference.iaddress === BETH) {
          destinationCurrency = GLOBAL_ADDRESS[toToken.value]
          flagValue = VALID + CONVERT + IMPORT_TO_SOURCE
        } else {
          toast.error(
            `Cannot convert ${fromTokenReference.value} to ${toToken.currency}. Send Direct to ${blockChainName}` //add in FLAGS logic for destination
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
    const isFromBETH = fromTokenReference.iaddress === BETH

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
  const currencyIaddress = fromTokenReference.iaddress as `0x${string}`
  const CReserveTransfer: CReserveTransferType = {
    version: 1,
    currencyvalue: {currency: currencyIaddress, amount: verusAmount}, // currency sending from ethereum
    flags: flagValue,
    feecurrencyid: feeCurrency, // fee is vrsc pre bridge launch, veth or others post.
    fees: Number(fees),
    destination: {
      destinationtype: destinationType,
      destinationaddress: destinationAddress as `0x${string}`,
    }, // destination address currency is going to
    destcurrencyid: destinationCurrency as `0x${string}`, // destination currency is vrsc on direct. bridge.veth on bounceback
    destsystemid: AddressZero as `0x${string}`, // destination system not used
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

  if (fromTokenReference.erc20address === AddressZero) {
    // parseEther(fromAmount.toString())

    walletFee = walletFee + BigInt(parseEther(fromAmount.toString()))
  }

  return {CReserveTransfer, fee: walletFee.toString()}
}
