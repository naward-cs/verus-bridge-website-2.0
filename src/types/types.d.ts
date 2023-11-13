declare module '@bitgo/utxo-lib'
type DestinationOption = {
  value: string
  label: string
  iaddress: string
  id: string
  currency: string
}

type FromTokenList = {
  erc20ContractAddress: `0x${string}`
  flags: number
  iaddress: string
  launchSystemID: string
  name: string
  ticker: string
  tokenID: any
}

type TokenList = {
  label: string
  value: string
  iaddress: string
  erc20address: `0x${string}`
  id: string
  flags: number
}

type ConvertFormData = {
  fromAmount: number | string | bigint
  fromToken: TokenList
  toToken: DestinationOption
  toAddress: string
  sendOnly: boolean
  gasPrice: {SATSCOST: string; WEICOST: string}
}

type FromDestinationList = {
  convertList: DestinationOption[] | undefined
  destinationList: DestinationOption
}

type BridgeList = {
  [k: string]: {
    id: string
    value: string
    label: string
    iaddress: string
    currency: string
  }
}

type CReserveTransferType = {
  version: number
  currencyvalue: {
    currency: `0x${string}`
    amount: string
  }
  flags: number
  feecurrencyid: `0x${string}`
  fees: number
  destination: {
    destinationtype: number
    destinationaddress: `0x${string}`
  }
  destcurrencyid: `0x${string}`
  destsystemid: `0x${string}`
  secondreserveid: `0x${string}`
}

type TxConfigType = {
  formValues: ConvertFormData
  CReserveTransfer: CReserveTransferType
  fee: string
}

type CoinList = {
  name: string
  amount: number
  daiPrice: number
  value?: string
}