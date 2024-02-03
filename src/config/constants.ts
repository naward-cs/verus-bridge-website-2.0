export const ETH_FEES = {
  SATS: '300000', // 0.003 ETH FEE SATS (8 decimal places)
  ETH: '0.003', // 0.003 ETH FEE
  GAS_TRANSACTIONIMPORTFEE: '1000000', // Transactionimportfee as defined in vETH: as (TX GAS AMOUNT)
  MINIMUM_GAS_PRICE_WEI: '10000000000', // Minimum WEI price as defined in contract. (10 GWEI)
  VRSC_SATS_FEE: 2000000,
}
export const maxTxGas = 1000000
export const maxNFTGas = '6000000'

export const FLAGS = {
  MAPPING_ETHEREUM_OWNED: 1,
  MAPPING_VERUS_OWNED: 2,
  MAPPING_PARTOF_BRIDGEVETH: 4,
  MAPPING_ISBRIDGE_CURRENCY: 8,
  MAPPING_ERC1155_NFT_DEFINITION: 16,
  MAPPING_ERC20_DEFINITION: 32,
  MAPPING_ERC1155_ERC_DEFINITION: 64,
  MAPPING_ERC721_NFT_DEFINITION: 128,
}

export const HEIGHT_LOCATION_IN_FORKS = 130
export const BridgeName = 'bridge.veth'.toUpperCase()
export const ETHaddress = '0x0000000000000000000000000000000000000000'

export const DEST_PKH = 2
export const DEST_ID = 4
export const DEST_ETH = 9
export const FLAG_DEST_AUX = 64
export const FLAG_DEST_GATEWAY = 128
export const FLAG_MAP_TYPE = 33
export const VALID = 1
export const CONVERT = 2
export const PRECONVERT = 4
export const CROSS_SYSTEM = 0x40 // if this is set there is a systemID serialized and deserialized as well for destination
export const IMPORT_TO_SOURCE = 0x200 // set when the source currency not destination is the import currency
export const RESERVE_TO_RESERVE = 0x400 // for arbitrage or transient conversion 2 stage solving (2nd from new fractional to reserves)
export const bounceBackFee = Buffer.alloc(8) //write LE bounce back fee
