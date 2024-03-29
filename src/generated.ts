import {
  useContractRead,
  UseContractReadConfig,
  useContractWrite,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
  useContractEvent,
  UseContractEventConfig,
  useNetwork,
  useChainId,
  Address,
} from 'wagmi'
import {
  ReadContractResult,
  WriteContractMode,
  PrepareWriteContractResult,
} from 'wagmi/actions'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20ABI = [
  {
    type: 'event',
    inputs: [
      {name: 'owner', type: 'address', indexed: true},
      {name: 'spender', type: 'address', indexed: true},
      {name: 'value', type: 'uint256', indexed: false},
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    inputs: [
      {name: 'from', type: 'address', indexed: true},
      {name: 'to', type: 'address', indexed: true},
      {name: 'value', type: 'uint256', indexed: false},
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      {name: 'owner', type: 'address'},
      {name: 'spender', type: 'address'},
    ],
    name: 'allowance',
    outputs: [{type: 'uint256'}],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {name: 'spender', type: 'address'},
      {name: 'amount', type: 'uint256'},
    ],
    name: 'approve',
    outputs: [{type: 'bool'}],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{name: 'account', type: 'address'}],
    name: 'balanceOf',
    outputs: [{type: 'uint256'}],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{type: 'uint8'}],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{type: 'string'}],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{type: 'string'}],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{type: 'uint256'}],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {name: 'recipient', type: 'address'},
      {name: 'amount', type: 'uint256'},
    ],
    name: 'transfer',
    outputs: [{type: 'bool'}],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {name: 'sender', type: 'address'},
      {name: 'recipient', type: 'address'},
      {name: 'amount', type: 'uint256'},
    ],
    name: 'transferFrom',
    outputs: [{type: 'bool'}],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {name: 'spender', type: 'address'},
      {name: 'addedValue', type: 'uint256'},
    ],
    name: 'increaseAllowance',
    outputs: [{type: 'bool'}],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {name: 'spender', type: 'address'},
      {name: 'subtractedValue', type: 'uint256'},
    ],
    name: 'decreaseAllowance',
    outputs: [{type: 'bool'}],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC721
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc721ABI = [
  {
    type: 'event',
    inputs: [
      {name: 'owner', type: 'address', indexed: true},
      {name: 'spender', type: 'address', indexed: true},
      {name: 'tokenId', type: 'uint256', indexed: true},
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    inputs: [
      {name: 'owner', type: 'address', indexed: true},
      {name: 'operator', type: 'address', indexed: true},
      {name: 'approved', type: 'bool', indexed: false},
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    inputs: [
      {name: 'from', type: 'address', indexed: true},
      {name: 'to', type: 'address', indexed: true},
      {name: 'tokenId', type: 'uint256', indexed: true},
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {name: 'spender', type: 'address'},
      {name: 'tokenId', type: 'uint256'},
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{name: 'account', type: 'address'}],
    name: 'balanceOf',
    outputs: [{type: 'uint256'}],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{name: 'tokenId', type: 'uint256'}],
    name: 'getApproved',
    outputs: [{type: 'address'}],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      {name: 'owner', type: 'address'},
      {name: 'operator', type: 'address'},
    ],
    name: 'isApprovedForAll',
    outputs: [{type: 'bool'}],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{type: 'string'}],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{name: 'tokenId', type: 'uint256'}],
    name: 'ownerOf',
    outputs: [{name: 'owner', type: 'address'}],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {name: 'from', type: 'address'},
      {name: 'to', type: 'address'},
      {name: 'tokenId', type: 'uint256'},
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {name: 'from', type: 'address'},
      {name: 'to', type: 'address'},
      {name: 'id', type: 'uint256'},
      {name: 'data', type: 'bytes'},
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {name: 'operator', type: 'address'},
      {name: 'approved', type: 'bool'},
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{type: 'string'}],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{name: 'index', type: 'uint256'}],
    name: 'tokenByIndex',
    outputs: [{type: 'uint256'}],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      {name: 'owner', type: 'address'},
      {name: 'index', type: 'uint256'},
    ],
    name: 'tokenByIndex',
    outputs: [{name: 'tokenId', type: 'uint256'}],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{name: 'tokenId', type: 'uint256'}],
    name: 'tokenURI',
    outputs: [{type: 'string'}],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{type: 'uint256'}],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {name: 'sender', type: 'address'},
      {name: 'recipient', type: 'address'},
      {name: 'tokenId', type: 'uint256'},
    ],
    name: 'transferFrom',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// delegator
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export const delegatorABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      {name: '_notaries', internalType: 'address[]', type: 'address[]'},
      {
        name: '_notariesEthAddress',
        internalType: 'address[]',
        type: 'address[]',
      },
      {
        name: '_notariesColdStoreEthAddress',
        internalType: 'address[]',
        type: 'address[]',
      },
      {
        name: '_newContractAddress',
        internalType: 'address[]',
        type: 'address[]',
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{name: '', internalType: 'uint256', type: 'uint256'}],
    name: '_readyExports',
    outputs: [
      {name: 'exportHash', internalType: 'bytes32', type: 'bytes32'},
      {name: 'prevExportHash', internalType: 'bytes32', type: 'bytes32'},
      {name: 'endHeight', internalType: 'uint64', type: 'uint64'},
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{name: '', internalType: 'uint256', type: 'uint256'}],
    name: 'bestForks',
    outputs: [{name: '', internalType: 'bytes', type: 'bytes'}],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'bridgeConverterActive',
    outputs: [{name: '', internalType: 'bool', type: 'bool'}],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'cceLastEndHeight',
    outputs: [{name: '', internalType: 'uint64', type: 'uint64'}],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'cceLastStartHeight',
    outputs: [{name: '', internalType: 'uint64', type: 'uint64'}],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{name: '', internalType: 'bytes32', type: 'bytes32'}],
    name: 'claimableFees',
    outputs: [{name: '', internalType: 'uint256', type: 'uint256'}],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{name: '', internalType: 'uint256', type: 'uint256'}],
    name: 'contracts',
    outputs: [{name: '', internalType: 'address', type: 'address'}],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{name: '', internalType: 'uint256', type: 'uint256'}],
    name: 'exportHeights',
    outputs: [{name: '', internalType: 'uint256', type: 'uint256'}],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{name: '', internalType: 'bytes32', type: 'bytes32'}],
    name: 'lastImportInfo',
    outputs: [
      {name: 'hashOfTransfers', internalType: 'bytes32', type: 'bytes32'},
      {name: 'exporttxid', internalType: 'bytes32', type: 'bytes32'},
      {name: 'exporttxoutnum', internalType: 'uint32', type: 'uint32'},
      {name: 'height', internalType: 'uint32', type: 'uint32'},
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'lastTxIdImport',
    outputs: [{name: '', internalType: 'bytes32', type: 'bytes32'}],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{name: '', internalType: 'uint256', type: 'uint256'}],
    name: 'notaries',
    outputs: [{name: '', internalType: 'address', type: 'address'}],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{name: '', internalType: 'address', type: 'address'}],
    name: 'notaryAddressMapping',
    outputs: [
      {name: 'main', internalType: 'address', type: 'address'},
      {name: 'recovery', internalType: 'address', type: 'address'},
      {name: 'state', internalType: 'uint8', type: 'uint8'},
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {name: '', internalType: 'address', type: 'address'},
      {name: '', internalType: 'address', type: 'address'},
      {name: '', internalType: 'uint256[]', type: 'uint256[]'},
      {name: '', internalType: 'uint256[]', type: 'uint256[]'},
      {name: '', internalType: 'bytes', type: 'bytes'},
    ],
    name: 'onERC1155BatchReceived',
    outputs: [{name: '', internalType: 'bytes4', type: 'bytes4'}],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {name: '', internalType: 'address', type: 'address'},
      {name: '', internalType: 'address', type: 'address'},
      {name: '', internalType: 'uint256', type: 'uint256'},
      {name: '', internalType: 'uint256', type: 'uint256'},
      {name: '', internalType: 'bytes', type: 'bytes'},
    ],
    name: 'onERC1155Received',
    outputs: [{name: '', internalType: 'bytes4', type: 'bytes4'}],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {name: '', internalType: 'address', type: 'address'},
      {name: '', internalType: 'address', type: 'address'},
      {name: '', internalType: 'uint256', type: 'uint256'},
      {name: '', internalType: 'bytes', type: 'bytes'},
    ],
    name: 'onERC721Received',
    outputs: [{name: '', internalType: 'bytes4', type: 'bytes4'}],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{name: '', internalType: 'address', type: 'address'}],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{name: '', internalType: 'bytes32', type: 'bytes32'}],
    name: 'processedTxids',
    outputs: [{name: '', internalType: 'bool', type: 'bool'}],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      {name: '', internalType: 'bytes32', type: 'bytes32'},
      {name: '', internalType: 'address', type: 'address'},
    ],
    name: 'refunds',
    outputs: [{name: '', internalType: 'uint256', type: 'uint256'}],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{name: '', internalType: 'uint256', type: 'uint256'}],
    name: 'rollingUpgradeVotes',
    outputs: [{name: '', internalType: 'address', type: 'address'}],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'rollingVoteIndex',
    outputs: [{name: '', internalType: 'uint8', type: 'uint8'}],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{name: '', internalType: 'bytes32', type: 'bytes32'}],
    name: 'saltsUsed',
    outputs: [{name: '', internalType: 'bool', type: 'bool'}],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{name: '', internalType: 'bytes32', type: 'bytes32'}],
    name: 'storageGlobal',
    outputs: [{name: '', internalType: 'bytes', type: 'bytes'}],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{name: 'interfaceId', internalType: 'bytes4', type: 'bytes4'}],
    name: 'supportsInterface',
    outputs: [{name: '', internalType: 'bool', type: 'bool'}],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{name: '', internalType: 'uint256', type: 'uint256'}],
    name: 'tokenList',
    outputs: [{name: '', internalType: 'address', type: 'address'}],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{name: '', internalType: 'address', type: 'address'}],
    name: 'verusToERC20mapping',
    outputs: [
      {name: 'erc20ContractAddress', internalType: 'address', type: 'address'},
      {name: 'flags', internalType: 'uint8', type: 'uint8'},
      {name: 'tokenIndex', internalType: 'uint256', type: 'uint256'},
      {name: 'name', internalType: 'string', type: 'string'},
      {name: 'tokenID', internalType: 'uint256', type: 'uint256'},
    ],
  },
  {stateMutability: 'payable', type: 'receive'},
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: '_transfer',
        internalType: 'struct VerusObjects.CReserveTransfer',
        type: 'tuple',
        components: [
          {name: 'version', internalType: 'uint32', type: 'uint32'},
          {
            name: 'currencyvalue',
            internalType: 'struct VerusObjects.CCurrencyValueMap',
            type: 'tuple',
            components: [
              {name: 'currency', internalType: 'address', type: 'address'},
              {name: 'amount', internalType: 'uint64', type: 'uint64'},
            ],
          },
          {name: 'flags', internalType: 'uint32', type: 'uint32'},
          {name: 'feecurrencyid', internalType: 'address', type: 'address'},
          {name: 'fees', internalType: 'uint64', type: 'uint64'},
          {
            name: 'destination',
            internalType: 'struct VerusObjectsCommon.CTransferDestination',
            type: 'tuple',
            components: [
              {name: 'destinationtype', internalType: 'uint8', type: 'uint8'},
              {
                name: 'destinationaddress',
                internalType: 'bytes',
                type: 'bytes',
              },
            ],
          },
          {name: 'destcurrencyid', internalType: 'address', type: 'address'},
          {name: 'destsystemid', internalType: 'address', type: 'address'},
          {name: 'secondreserveid', internalType: 'address', type: 'address'},
        ],
      },
    ],
    name: 'sendTransfer',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [{name: 'data', internalType: 'bytes', type: 'bytes'}],
    name: 'sendTransferDirect',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'data',
        internalType: 'struct VerusObjects.CReserveTransferImport',
        type: 'tuple',
        components: [
          {
            name: 'partialtransactionproof',
            internalType: 'struct VerusObjects.CPtransactionproof',
            type: 'tuple',
            components: [
              {name: 'version', internalType: 'uint8', type: 'uint8'},
              {name: 'typeC', internalType: 'uint8', type: 'uint8'},
              {
                name: 'txproof',
                internalType: 'struct VerusObjects.CTXProof[]',
                type: 'tuple[]',
                components: [
                  {name: 'branchType', internalType: 'uint8', type: 'uint8'},
                  {
                    name: 'proofSequence',
                    internalType: 'struct VerusObjects.CMerkleBranch',
                    type: 'tuple',
                    components: [
                      {
                        name: 'CMerkleBranchBase',
                        internalType: 'uint8',
                        type: 'uint8',
                      },
                      {name: 'nIndex', internalType: 'uint32', type: 'uint32'},
                      {name: 'nSize', internalType: 'uint32', type: 'uint32'},
                      {
                        name: 'extraHashes',
                        internalType: 'uint8',
                        type: 'uint8',
                      },
                      {
                        name: 'branch',
                        internalType: 'bytes32[]',
                        type: 'bytes32[]',
                      },
                    ],
                  },
                ],
              },
              {
                name: 'components',
                internalType: 'struct VerusObjects.CComponents[]',
                type: 'tuple[]',
                components: [
                  {name: 'elType', internalType: 'uint8', type: 'uint8'},
                  {name: 'elIdx', internalType: 'uint8', type: 'uint8'},
                  {name: 'elVchObj', internalType: 'bytes', type: 'bytes'},
                  {
                    name: 'elProof',
                    internalType: 'struct VerusObjects.CTXProof[]',
                    type: 'tuple[]',
                    components: [
                      {
                        name: 'branchType',
                        internalType: 'uint8',
                        type: 'uint8',
                      },
                      {
                        name: 'proofSequence',
                        internalType: 'struct VerusObjects.CMerkleBranch',
                        type: 'tuple',
                        components: [
                          {
                            name: 'CMerkleBranchBase',
                            internalType: 'uint8',
                            type: 'uint8',
                          },
                          {
                            name: 'nIndex',
                            internalType: 'uint32',
                            type: 'uint32',
                          },
                          {
                            name: 'nSize',
                            internalType: 'uint32',
                            type: 'uint32',
                          },
                          {
                            name: 'extraHashes',
                            internalType: 'uint8',
                            type: 'uint8',
                          },
                          {
                            name: 'branch',
                            internalType: 'bytes32[]',
                            type: 'bytes32[]',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {name: 'serializedTransfers', internalType: 'bytes', type: 'bytes'},
        ],
      },
    ],
    name: 'submitImports',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {name: '_startBlock', internalType: 'uint256', type: 'uint256'},
      {name: '_endBlock', internalType: 'uint256', type: 'uint256'},
    ],
    name: 'getReadyExportsByRange',
    outputs: [
      {
        name: 'returnedExports',
        internalType: 'struct VerusObjects.CReserveTransferSetCalled[]',
        type: 'tuple[]',
        components: [
          {name: 'exportHash', internalType: 'bytes32', type: 'bytes32'},
          {name: 'prevExportHash', internalType: 'bytes32', type: 'bytes32'},
          {name: 'startHeight', internalType: 'uint64', type: 'uint64'},
          {name: 'endHeight', internalType: 'uint64', type: 'uint64'},
          {
            name: 'transfers',
            internalType: 'struct VerusObjects.CReserveTransfer[]',
            type: 'tuple[]',
            components: [
              {name: 'version', internalType: 'uint32', type: 'uint32'},
              {
                name: 'currencyvalue',
                internalType: 'struct VerusObjects.CCurrencyValueMap',
                type: 'tuple',
                components: [
                  {name: 'currency', internalType: 'address', type: 'address'},
                  {name: 'amount', internalType: 'uint64', type: 'uint64'},
                ],
              },
              {name: 'flags', internalType: 'uint32', type: 'uint32'},
              {name: 'feecurrencyid', internalType: 'address', type: 'address'},
              {name: 'fees', internalType: 'uint64', type: 'uint64'},
              {
                name: 'destination',
                internalType: 'struct VerusObjectsCommon.CTransferDestination',
                type: 'tuple',
                components: [
                  {
                    name: 'destinationtype',
                    internalType: 'uint8',
                    type: 'uint8',
                  },
                  {
                    name: 'destinationaddress',
                    internalType: 'bytes',
                    type: 'bytes',
                  },
                ],
              },
              {
                name: 'destcurrencyid',
                internalType: 'address',
                type: 'address',
              },
              {name: 'destsystemid', internalType: 'address', type: 'address'},
              {
                name: 'secondreserveid',
                internalType: 'address',
                type: 'address',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {name: 'serializedNotarization', internalType: 'bytes', type: 'bytes'},
      {name: 'txid', internalType: 'bytes32', type: 'bytes32'},
      {name: 'n', internalType: 'uint32', type: 'uint32'},
      {name: 'data', internalType: 'bytes', type: 'bytes'},
    ],
    name: 'setLatestData',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{name: 'data', internalType: 'bytes', type: 'bytes'}],
    name: 'launchContractTokens',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {name: 'start', internalType: 'uint256', type: 'uint256'},
      {name: 'end', internalType: 'uint256', type: 'uint256'},
    ],
    name: 'getTokenList',
    outputs: [
      {
        name: '',
        internalType: 'struct VerusObjects.setupToken[]',
        type: 'tuple[]',
        components: [
          {name: 'iaddress', internalType: 'address', type: 'address'},
          {
            name: 'erc20ContractAddress',
            internalType: 'address',
            type: 'address',
          },
          {name: 'launchSystemID', internalType: 'address', type: 'address'},
          {name: 'flags', internalType: 'uint8', type: 'uint8'},
          {name: 'name', internalType: 'string', type: 'string'},
          {name: 'ticker', internalType: 'string', type: 'string'},
          {name: 'tokenID', internalType: 'uint256', type: 'uint256'},
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{name: '_imports', internalType: 'bytes32', type: 'bytes32'}],
    name: 'checkImport',
    outputs: [{name: '', internalType: 'bool', type: 'bool'}],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'claimfees',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {name: 'verusAddress', internalType: 'uint176', type: 'uint176'},
      {name: 'currency', internalType: 'address', type: 'address'},
    ],
    name: 'claimRefund',
    outputs: [{name: '', internalType: 'uint256', type: 'uint256'}],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {name: 'publicKeyX', internalType: 'bytes32', type: 'bytes32'},
      {name: 'publicKeyY', internalType: 'bytes32', type: 'bytes32'},
    ],
    name: 'sendfees',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {name: 'proofHeightOptions', internalType: 'uint256', type: 'uint256'},
    ],
    name: 'getProof',
    outputs: [{name: '', internalType: 'bytes', type: 'bytes'}],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{name: 'proofOption', internalType: 'uint256', type: 'uint256'}],
    name: 'getProofCosts',
    outputs: [{name: '', internalType: 'uint256', type: 'uint256'}],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [{name: 'data', internalType: 'bytes', type: 'bytes'}],
    name: 'upgradeContracts',
    outputs: [{name: '', internalType: 'uint8', type: 'uint8'}],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {name: 'newcontract', internalType: 'address', type: 'address'},
      {name: 'contractNo', internalType: 'uint256', type: 'uint256'},
    ],
    name: 'replacecontract',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{name: 'data', internalType: 'bytes', type: 'bytes'}],
    name: 'revokeWithMainAddress',
    outputs: [{name: '', internalType: 'bool', type: 'bool'}],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{name: 'data', internalType: 'bytes', type: 'bytes'}],
    name: 'revokeWithMultiSig',
    outputs: [{name: '', internalType: 'bool', type: 'bool'}],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{name: 'data', internalType: 'bytes', type: 'bytes'}],
    name: 'recoverWithRecoveryAddress',
    outputs: [{name: '', internalType: 'uint8', type: 'uint8'}],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{name: 'data', internalType: 'bytes', type: 'bytes'}],
    name: 'recoverWithMultiSig',
    outputs: [{name: '', internalType: 'uint8', type: 'uint8'}],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{name: 'contractsHash', internalType: 'address', type: 'address'}],
    name: 'getVoteCount',
    outputs: [{name: '', internalType: 'uint256', type: 'uint256'}],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{name: 'data', internalType: 'bytes', type: 'bytes'}],
    name: 'burnFees',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {name: 'data', internalType: 'bytes', type: 'bytes'},
      {name: 'vdxfid', internalType: 'string', type: 'string'},
    ],
    name: 'setVerusData',
    outputs: [],
  },
] as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export const delegatorAddress = {
  1: '0x71518580f36FeCEFfE0721F06bA4703218cD7F63',
  5: '0x85a7dE2278E52327471e174AeeB280cdFdC6A68a',
} as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export const delegatorConfig = {
  address: delegatorAddress,
  abi: delegatorABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// erc1155
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc1155ABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [{name: 'governance_', internalType: 'address', type: 'address'}],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {name: 'approved', internalType: 'bool', type: 'bool', indexed: false},
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {name: 'from', internalType: 'address', type: 'address', indexed: true},
      {name: 'to', internalType: 'address', type: 'address', indexed: true},
      {
        name: 'ids',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
      {
        name: 'values',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'TransferBatch',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {name: 'from', internalType: 'address', type: 'address', indexed: true},
      {name: 'to', internalType: 'address', type: 'address', indexed: true},
      {name: 'id', internalType: 'uint256', type: 'uint256', indexed: false},
      {name: 'value', internalType: 'uint256', type: 'uint256', indexed: false},
    ],
    name: 'TransferSingle',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {name: 'value', internalType: 'string', type: 'string', indexed: false},
      {name: 'id', internalType: 'uint256', type: 'uint256', indexed: true},
    ],
    name: 'URI',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{name: 'initialSupply', internalType: 'uint256', type: 'uint256'}],
    name: 'addNewAirline',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'airlineCount',
    outputs: [{name: '', internalType: 'uint256', type: 'uint256'}],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      {name: 'account', internalType: 'address', type: 'address'},
      {name: 'id', internalType: 'uint256', type: 'uint256'},
    ],
    name: 'balanceOf',
    outputs: [{name: '', internalType: 'uint256', type: 'uint256'}],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      {name: 'accounts', internalType: 'address[]', type: 'address[]'},
      {name: 'ids', internalType: 'uint256[]', type: 'uint256[]'},
    ],
    name: 'balanceOfBatch',
    outputs: [{name: '', internalType: 'uint256[]', type: 'uint256[]'}],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'governance',
    outputs: [{name: '', internalType: 'address', type: 'address'}],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      {name: 'account', internalType: 'address', type: 'address'},
      {name: 'operator', internalType: 'address', type: 'address'},
    ],
    name: 'isApprovedForAll',
    outputs: [{name: '', internalType: 'bool', type: 'bool'}],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {name: 'from', internalType: 'address', type: 'address'},
      {name: 'to', internalType: 'address', type: 'address'},
      {name: 'ids', internalType: 'uint256[]', type: 'uint256[]'},
      {name: 'amounts', internalType: 'uint256[]', type: 'uint256[]'},
      {name: 'data', internalType: 'bytes', type: 'bytes'},
    ],
    name: 'safeBatchTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {name: 'from', internalType: 'address', type: 'address'},
      {name: 'to', internalType: 'address', type: 'address'},
      {name: 'id', internalType: 'uint256', type: 'uint256'},
      {name: 'amount', internalType: 'uint256', type: 'uint256'},
      {name: 'data', internalType: 'bytes', type: 'bytes'},
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {name: 'operator', internalType: 'address', type: 'address'},
      {name: 'approved', internalType: 'bool', type: 'bool'},
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{name: 'interfaceId', internalType: 'bytes4', type: 'bytes4'}],
    name: 'supportsInterface',
    outputs: [{name: '', internalType: 'bool', type: 'bool'}],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{name: '', internalType: 'uint256', type: 'uint256'}],
    name: 'uri',
    outputs: [{name: '', internalType: 'string', type: 'string'}],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__.
 */
export function useErc20Read<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any
) {
  return useContractRead({abi: erc20ABI, ...config} as UseContractReadConfig<
    typeof erc20ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"allowance"`.
 */
export function useErc20Allowance<
  TFunctionName extends 'allowance',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: erc20ABI,
    functionName: 'allowance',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useErc20BalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: erc20ABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"decimals"`.
 */
export function useErc20Decimals<
  TFunctionName extends 'decimals',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: erc20ABI,
    functionName: 'decimals',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"name"`.
 */
export function useErc20Name<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: erc20ABI,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"symbol"`.
 */
export function useErc20Symbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: erc20ABI,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"totalSupply"`.
 */
export function useErc20TotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: erc20ABI,
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__.
 */
export function useErc20Write<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof erc20ABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof erc20ABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any
) {
  return useContractWrite<typeof erc20ABI, TFunctionName, TMode>({
    abi: erc20ABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"approve"`.
 */
export function useErc20Approve<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20ABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & {functionName?: 'approve'}
    : UseContractWriteConfig<typeof erc20ABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any
) {
  return useContractWrite<typeof erc20ABI, 'approve', TMode>({
    abi: erc20ABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"transfer"`.
 */
export function useErc20Transfer<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20ABI,
          'transfer'
        >['request']['abi'],
        'transfer',
        TMode
      > & {functionName?: 'transfer'}
    : UseContractWriteConfig<typeof erc20ABI, 'transfer', TMode> & {
        abi?: never
        functionName?: 'transfer'
      } = {} as any
) {
  return useContractWrite<typeof erc20ABI, 'transfer', TMode>({
    abi: erc20ABI,
    functionName: 'transfer',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useErc20TransferFrom<
  TMode extends WriteContractMode = undefined
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20ABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & {functionName?: 'transferFrom'}
    : UseContractWriteConfig<typeof erc20ABI, 'transferFrom', TMode> & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any
) {
  return useContractWrite<typeof erc20ABI, 'transferFrom', TMode>({
    abi: erc20ABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"increaseAllowance"`.
 */
export function useErc20IncreaseAllowance<
  TMode extends WriteContractMode = undefined
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20ABI,
          'increaseAllowance'
        >['request']['abi'],
        'increaseAllowance',
        TMode
      > & {functionName?: 'increaseAllowance'}
    : UseContractWriteConfig<typeof erc20ABI, 'increaseAllowance', TMode> & {
        abi?: never
        functionName?: 'increaseAllowance'
      } = {} as any
) {
  return useContractWrite<typeof erc20ABI, 'increaseAllowance', TMode>({
    abi: erc20ABI,
    functionName: 'increaseAllowance',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"decreaseAllowance"`.
 */
export function useErc20DecreaseAllowance<
  TMode extends WriteContractMode = undefined
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20ABI,
          'decreaseAllowance'
        >['request']['abi'],
        'decreaseAllowance',
        TMode
      > & {functionName?: 'decreaseAllowance'}
    : UseContractWriteConfig<typeof erc20ABI, 'decreaseAllowance', TMode> & {
        abi?: never
        functionName?: 'decreaseAllowance'
      } = {} as any
) {
  return useContractWrite<typeof erc20ABI, 'decreaseAllowance', TMode>({
    abi: erc20ABI,
    functionName: 'decreaseAllowance',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__.
 */
export function usePrepareErc20Write<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ABI, TFunctionName>,
    'abi'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareErc20Approve(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"transfer"`.
 */
export function usePrepareErc20Transfer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ABI, 'transfer'>,
    'abi' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    functionName: 'transfer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, 'transfer'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareErc20TransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, 'transferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"increaseAllowance"`.
 */
export function usePrepareErc20IncreaseAllowance(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ABI, 'increaseAllowance'>,
    'abi' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    functionName: 'increaseAllowance',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, 'increaseAllowance'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"decreaseAllowance"`.
 */
export function usePrepareErc20DecreaseAllowance(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ABI, 'decreaseAllowance'>,
    'abi' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    functionName: 'decreaseAllowance',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, 'decreaseAllowance'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc20ABI}__.
 */
export function useErc20Event<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof erc20ABI, TEventName>,
    'abi'
  > = {} as any
) {
  return useContractEvent({abi: erc20ABI, ...config} as UseContractEventConfig<
    typeof erc20ABI,
    TEventName
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc20ABI}__ and `eventName` set to `"Approval"`.
 */
export function useErc20ApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof erc20ABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any
) {
  return useContractEvent({
    abi: erc20ABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof erc20ABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc20ABI}__ and `eventName` set to `"Transfer"`.
 */
export function useErc20TransferEvent(
  config: Omit<
    UseContractEventConfig<typeof erc20ABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any
) {
  return useContractEvent({
    abi: erc20ABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof erc20ABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__.
 */
export function useErc721Read<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any
) {
  return useContractRead({abi: erc721ABI, ...config} as UseContractReadConfig<
    typeof erc721ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useErc721BalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: erc721ABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"getApproved"`.
 */
export function useErc721GetApproved<
  TFunctionName extends 'getApproved',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: erc721ABI,
    functionName: 'getApproved',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"isApprovedForAll"`.
 */
export function useErc721IsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: erc721ABI,
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"name"`.
 */
export function useErc721Name<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: erc721ABI,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"ownerOf"`.
 */
export function useErc721OwnerOf<
  TFunctionName extends 'ownerOf',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: erc721ABI,
    functionName: 'ownerOf',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"symbol"`.
 */
export function useErc721Symbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: erc721ABI,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"tokenByIndex"`.
 */
export function useErc721TokenByIndex<
  TFunctionName extends 'tokenByIndex',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: erc721ABI,
    functionName: 'tokenByIndex',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"tokenURI"`.
 */
export function useErc721TokenUri<
  TFunctionName extends 'tokenURI',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: erc721ABI,
    functionName: 'tokenURI',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"totalSupply"`.
 */
export function useErc721TotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: erc721ABI,
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__.
 */
export function useErc721Write<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof erc721ABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof erc721ABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any
) {
  return useContractWrite<typeof erc721ABI, TFunctionName, TMode>({
    abi: erc721ABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"approve"`.
 */
export function useErc721Approve<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721ABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & {functionName?: 'approve'}
    : UseContractWriteConfig<typeof erc721ABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any
) {
  return useContractWrite<typeof erc721ABI, 'approve', TMode>({
    abi: erc721ABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function useErc721SafeTransferFrom<
  TMode extends WriteContractMode = undefined
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721ABI,
          'safeTransferFrom'
        >['request']['abi'],
        'safeTransferFrom',
        TMode
      > & {functionName?: 'safeTransferFrom'}
    : UseContractWriteConfig<typeof erc721ABI, 'safeTransferFrom', TMode> & {
        abi?: never
        functionName?: 'safeTransferFrom'
      } = {} as any
) {
  return useContractWrite<typeof erc721ABI, 'safeTransferFrom', TMode>({
    abi: erc721ABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function useErc721SetApprovalForAll<
  TMode extends WriteContractMode = undefined
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721ABI,
          'setApprovalForAll'
        >['request']['abi'],
        'setApprovalForAll',
        TMode
      > & {functionName?: 'setApprovalForAll'}
    : UseContractWriteConfig<typeof erc721ABI, 'setApprovalForAll', TMode> & {
        abi?: never
        functionName?: 'setApprovalForAll'
      } = {} as any
) {
  return useContractWrite<typeof erc721ABI, 'setApprovalForAll', TMode>({
    abi: erc721ABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useErc721TransferFrom<
  TMode extends WriteContractMode = undefined
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721ABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & {functionName?: 'transferFrom'}
    : UseContractWriteConfig<typeof erc721ABI, 'transferFrom', TMode> & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any
) {
  return useContractWrite<typeof erc721ABI, 'transferFrom', TMode>({
    abi: erc721ABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__.
 */
export function usePrepareErc721Write<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721ABI, TFunctionName>,
    'abi'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: erc721ABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareErc721Approve(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721ABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: erc721ABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePrepareErc721SafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721ABI, 'safeTransferFrom'>,
    'abi' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: erc721ABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ABI, 'safeTransferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePrepareErc721SetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721ABI, 'setApprovalForAll'>,
    'abi' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: erc721ABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ABI, 'setApprovalForAll'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareErc721TransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721ABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: erc721ABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ABI, 'transferFrom'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc721ABI}__.
 */
export function useErc721Event<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof erc721ABI, TEventName>,
    'abi'
  > = {} as any
) {
  return useContractEvent({abi: erc721ABI, ...config} as UseContractEventConfig<
    typeof erc721ABI,
    TEventName
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc721ABI}__ and `eventName` set to `"Approval"`.
 */
export function useErc721ApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof erc721ABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any
) {
  return useContractEvent({
    abi: erc721ABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof erc721ABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc721ABI}__ and `eventName` set to `"ApprovalForAll"`.
 */
export function useErc721ApprovalForAllEvent(
  config: Omit<
    UseContractEventConfig<typeof erc721ABI, 'ApprovalForAll'>,
    'abi' | 'eventName'
  > = {} as any
) {
  return useContractEvent({
    abi: erc721ABI,
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof erc721ABI, 'ApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc721ABI}__ and `eventName` set to `"Transfer"`.
 */
export function useErc721TransferEvent(
  config: Omit<
    UseContractEventConfig<typeof erc721ABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any
) {
  return useContractEvent({
    abi: erc721ABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof erc721ABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link delegatorABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function useDelegatorRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof delegatorABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof delegatorABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  > & {chainId?: keyof typeof delegatorAddress} = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    ...config,
  } as UseContractReadConfig<typeof delegatorABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"_readyExports"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function useDelegatorReadyExports<
  TFunctionName extends '_readyExports',
  TSelectData = ReadContractResult<typeof delegatorABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof delegatorABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & {chainId?: keyof typeof delegatorAddress} = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: '_readyExports',
    ...config,
  } as UseContractReadConfig<typeof delegatorABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"bestForks"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function useDelegatorBestForks<
  TFunctionName extends 'bestForks',
  TSelectData = ReadContractResult<typeof delegatorABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof delegatorABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & {chainId?: keyof typeof delegatorAddress} = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'bestForks',
    ...config,
  } as UseContractReadConfig<typeof delegatorABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"bridgeConverterActive"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function useDelegatorBridgeConverterActive<
  TFunctionName extends 'bridgeConverterActive',
  TSelectData = ReadContractResult<typeof delegatorABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof delegatorABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & {chainId?: keyof typeof delegatorAddress} = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'bridgeConverterActive',
    ...config,
  } as UseContractReadConfig<typeof delegatorABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"cceLastEndHeight"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function useDelegatorCceLastEndHeight<
  TFunctionName extends 'cceLastEndHeight',
  TSelectData = ReadContractResult<typeof delegatorABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof delegatorABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & {chainId?: keyof typeof delegatorAddress} = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'cceLastEndHeight',
    ...config,
  } as UseContractReadConfig<typeof delegatorABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"cceLastStartHeight"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function useDelegatorCceLastStartHeight<
  TFunctionName extends 'cceLastStartHeight',
  TSelectData = ReadContractResult<typeof delegatorABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof delegatorABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & {chainId?: keyof typeof delegatorAddress} = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'cceLastStartHeight',
    ...config,
  } as UseContractReadConfig<typeof delegatorABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"claimableFees"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function useDelegatorClaimableFees<
  TFunctionName extends 'claimableFees',
  TSelectData = ReadContractResult<typeof delegatorABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof delegatorABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & {chainId?: keyof typeof delegatorAddress} = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'claimableFees',
    ...config,
  } as UseContractReadConfig<typeof delegatorABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"contracts"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function useDelegatorContracts<
  TFunctionName extends 'contracts',
  TSelectData = ReadContractResult<typeof delegatorABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof delegatorABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & {chainId?: keyof typeof delegatorAddress} = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'contracts',
    ...config,
  } as UseContractReadConfig<typeof delegatorABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"exportHeights"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function useDelegatorExportHeights<
  TFunctionName extends 'exportHeights',
  TSelectData = ReadContractResult<typeof delegatorABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof delegatorABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & {chainId?: keyof typeof delegatorAddress} = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'exportHeights',
    ...config,
  } as UseContractReadConfig<typeof delegatorABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"lastImportInfo"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function useDelegatorLastImportInfo<
  TFunctionName extends 'lastImportInfo',
  TSelectData = ReadContractResult<typeof delegatorABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof delegatorABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & {chainId?: keyof typeof delegatorAddress} = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'lastImportInfo',
    ...config,
  } as UseContractReadConfig<typeof delegatorABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"lastTxIdImport"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function useDelegatorLastTxIdImport<
  TFunctionName extends 'lastTxIdImport',
  TSelectData = ReadContractResult<typeof delegatorABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof delegatorABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & {chainId?: keyof typeof delegatorAddress} = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'lastTxIdImport',
    ...config,
  } as UseContractReadConfig<typeof delegatorABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"notaries"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function useDelegatorNotaries<
  TFunctionName extends 'notaries',
  TSelectData = ReadContractResult<typeof delegatorABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof delegatorABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & {chainId?: keyof typeof delegatorAddress} = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'notaries',
    ...config,
  } as UseContractReadConfig<typeof delegatorABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"notaryAddressMapping"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function useDelegatorNotaryAddressMapping<
  TFunctionName extends 'notaryAddressMapping',
  TSelectData = ReadContractResult<typeof delegatorABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof delegatorABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & {chainId?: keyof typeof delegatorAddress} = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'notaryAddressMapping',
    ...config,
  } as UseContractReadConfig<typeof delegatorABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"owner"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function useDelegatorOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof delegatorABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof delegatorABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & {chainId?: keyof typeof delegatorAddress} = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof delegatorABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"processedTxids"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function useDelegatorProcessedTxids<
  TFunctionName extends 'processedTxids',
  TSelectData = ReadContractResult<typeof delegatorABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof delegatorABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & {chainId?: keyof typeof delegatorAddress} = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'processedTxids',
    ...config,
  } as UseContractReadConfig<typeof delegatorABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"refunds"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function useDelegatorRefunds<
  TFunctionName extends 'refunds',
  TSelectData = ReadContractResult<typeof delegatorABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof delegatorABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & {chainId?: keyof typeof delegatorAddress} = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'refunds',
    ...config,
  } as UseContractReadConfig<typeof delegatorABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"rollingUpgradeVotes"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function useDelegatorRollingUpgradeVotes<
  TFunctionName extends 'rollingUpgradeVotes',
  TSelectData = ReadContractResult<typeof delegatorABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof delegatorABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & {chainId?: keyof typeof delegatorAddress} = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'rollingUpgradeVotes',
    ...config,
  } as UseContractReadConfig<typeof delegatorABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"rollingVoteIndex"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function useDelegatorRollingVoteIndex<
  TFunctionName extends 'rollingVoteIndex',
  TSelectData = ReadContractResult<typeof delegatorABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof delegatorABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & {chainId?: keyof typeof delegatorAddress} = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'rollingVoteIndex',
    ...config,
  } as UseContractReadConfig<typeof delegatorABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"saltsUsed"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function useDelegatorSaltsUsed<
  TFunctionName extends 'saltsUsed',
  TSelectData = ReadContractResult<typeof delegatorABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof delegatorABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & {chainId?: keyof typeof delegatorAddress} = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'saltsUsed',
    ...config,
  } as UseContractReadConfig<typeof delegatorABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"storageGlobal"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function useDelegatorStorageGlobal<
  TFunctionName extends 'storageGlobal',
  TSelectData = ReadContractResult<typeof delegatorABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof delegatorABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & {chainId?: keyof typeof delegatorAddress} = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'storageGlobal',
    ...config,
  } as UseContractReadConfig<typeof delegatorABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"supportsInterface"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function useDelegatorSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof delegatorABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof delegatorABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & {chainId?: keyof typeof delegatorAddress} = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof delegatorABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"tokenList"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function useDelegatorTokenList<
  TFunctionName extends 'tokenList',
  TSelectData = ReadContractResult<typeof delegatorABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof delegatorABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & {chainId?: keyof typeof delegatorAddress} = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'tokenList',
    ...config,
  } as UseContractReadConfig<typeof delegatorABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"verusToERC20mapping"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function useDelegatorVerusToErc20mapping<
  TFunctionName extends 'verusToERC20mapping',
  TSelectData = ReadContractResult<typeof delegatorABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof delegatorABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & {chainId?: keyof typeof delegatorAddress} = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'verusToERC20mapping',
    ...config,
  } as UseContractReadConfig<typeof delegatorABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"checkImport"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function useDelegatorCheckImport<
  TFunctionName extends 'checkImport',
  TSelectData = ReadContractResult<typeof delegatorABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof delegatorABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & {chainId?: keyof typeof delegatorAddress} = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'checkImport',
    ...config,
  } as UseContractReadConfig<typeof delegatorABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link delegatorABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function useDelegatorWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof delegatorAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof delegatorABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      > & {address?: Address; chainId?: TChainId}
    : UseContractWriteConfig<typeof delegatorABI, TFunctionName, TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
      } = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof delegatorABI, TFunctionName, TMode>({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"onERC1155BatchReceived"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function useDelegatorOnErc1155BatchReceived<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof delegatorAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof delegatorABI,
          'onERC1155BatchReceived'
        >['request']['abi'],
        'onERC1155BatchReceived',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'onERC1155BatchReceived'
      }
    : UseContractWriteConfig<
        typeof delegatorABI,
        'onERC1155BatchReceived',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'onERC1155BatchReceived'
      } = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof delegatorABI, 'onERC1155BatchReceived', TMode>(
    {
      abi: delegatorABI,
      address: delegatorAddress[chainId as keyof typeof delegatorAddress],
      functionName: 'onERC1155BatchReceived',
      ...config,
    } as any
  )
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"onERC1155Received"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function useDelegatorOnErc1155Received<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof delegatorAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof delegatorABI,
          'onERC1155Received'
        >['request']['abi'],
        'onERC1155Received',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'onERC1155Received'
      }
    : UseContractWriteConfig<
        typeof delegatorABI,
        'onERC1155Received',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'onERC1155Received'
      } = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof delegatorABI, 'onERC1155Received', TMode>({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'onERC1155Received',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"onERC721Received"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function useDelegatorOnErc721Received<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof delegatorAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof delegatorABI,
          'onERC721Received'
        >['request']['abi'],
        'onERC721Received',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'onERC721Received'
      }
    : UseContractWriteConfig<typeof delegatorABI, 'onERC721Received', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'onERC721Received'
      } = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof delegatorABI, 'onERC721Received', TMode>({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'onERC721Received',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"sendTransfer"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function useDelegatorSendTransfer<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof delegatorAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof delegatorABI,
          'sendTransfer'
        >['request']['abi'],
        'sendTransfer',
        TMode
      > & {address?: Address; chainId?: TChainId; functionName?: 'sendTransfer'}
    : UseContractWriteConfig<typeof delegatorABI, 'sendTransfer', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'sendTransfer'
      } = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof delegatorABI, 'sendTransfer', TMode>({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'sendTransfer',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"sendTransferDirect"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function useDelegatorSendTransferDirect<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof delegatorAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof delegatorABI,
          'sendTransferDirect'
        >['request']['abi'],
        'sendTransferDirect',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'sendTransferDirect'
      }
    : UseContractWriteConfig<
        typeof delegatorABI,
        'sendTransferDirect',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'sendTransferDirect'
      } = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof delegatorABI, 'sendTransferDirect', TMode>({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'sendTransferDirect',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"submitImports"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function useDelegatorSubmitImports<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof delegatorAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof delegatorABI,
          'submitImports'
        >['request']['abi'],
        'submitImports',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'submitImports'
      }
    : UseContractWriteConfig<typeof delegatorABI, 'submitImports', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'submitImports'
      } = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof delegatorABI, 'submitImports', TMode>({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'submitImports',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"getReadyExportsByRange"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function useDelegatorGetReadyExportsByRange<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof delegatorAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof delegatorABI,
          'getReadyExportsByRange'
        >['request']['abi'],
        'getReadyExportsByRange',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'getReadyExportsByRange'
      }
    : UseContractWriteConfig<
        typeof delegatorABI,
        'getReadyExportsByRange',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'getReadyExportsByRange'
      } = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof delegatorABI, 'getReadyExportsByRange', TMode>(
    {
      abi: delegatorABI,
      address: delegatorAddress[chainId as keyof typeof delegatorAddress],
      functionName: 'getReadyExportsByRange',
      ...config,
    } as any
  )
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"setLatestData"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function useDelegatorSetLatestData<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof delegatorAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof delegatorABI,
          'setLatestData'
        >['request']['abi'],
        'setLatestData',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'setLatestData'
      }
    : UseContractWriteConfig<typeof delegatorABI, 'setLatestData', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setLatestData'
      } = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof delegatorABI, 'setLatestData', TMode>({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'setLatestData',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"launchContractTokens"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function useDelegatorLaunchContractTokens<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof delegatorAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof delegatorABI,
          'launchContractTokens'
        >['request']['abi'],
        'launchContractTokens',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'launchContractTokens'
      }
    : UseContractWriteConfig<
        typeof delegatorABI,
        'launchContractTokens',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'launchContractTokens'
      } = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof delegatorABI, 'launchContractTokens', TMode>({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'launchContractTokens',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"getTokenList"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function useDelegatorGetTokenList<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof delegatorAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof delegatorABI,
          'getTokenList'
        >['request']['abi'],
        'getTokenList',
        TMode
      > & {address?: Address; chainId?: TChainId; functionName?: 'getTokenList'}
    : UseContractWriteConfig<typeof delegatorABI, 'getTokenList', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'getTokenList'
      } = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof delegatorABI, 'getTokenList', TMode>({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'getTokenList',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"claimfees"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function useDelegatorClaimfees<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof delegatorAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof delegatorABI,
          'claimfees'
        >['request']['abi'],
        'claimfees',
        TMode
      > & {address?: Address; chainId?: TChainId; functionName?: 'claimfees'}
    : UseContractWriteConfig<typeof delegatorABI, 'claimfees', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'claimfees'
      } = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof delegatorABI, 'claimfees', TMode>({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'claimfees',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"claimRefund"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function useDelegatorClaimRefund<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof delegatorAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof delegatorABI,
          'claimRefund'
        >['request']['abi'],
        'claimRefund',
        TMode
      > & {address?: Address; chainId?: TChainId; functionName?: 'claimRefund'}
    : UseContractWriteConfig<typeof delegatorABI, 'claimRefund', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'claimRefund'
      } = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof delegatorABI, 'claimRefund', TMode>({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'claimRefund',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"sendfees"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function useDelegatorSendfees<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof delegatorAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof delegatorABI,
          'sendfees'
        >['request']['abi'],
        'sendfees',
        TMode
      > & {address?: Address; chainId?: TChainId; functionName?: 'sendfees'}
    : UseContractWriteConfig<typeof delegatorABI, 'sendfees', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'sendfees'
      } = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof delegatorABI, 'sendfees', TMode>({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'sendfees',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"getProof"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function useDelegatorGetProof<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof delegatorAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof delegatorABI,
          'getProof'
        >['request']['abi'],
        'getProof',
        TMode
      > & {address?: Address; chainId?: TChainId; functionName?: 'getProof'}
    : UseContractWriteConfig<typeof delegatorABI, 'getProof', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'getProof'
      } = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof delegatorABI, 'getProof', TMode>({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'getProof',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"getProofCosts"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function useDelegatorGetProofCosts<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof delegatorAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof delegatorABI,
          'getProofCosts'
        >['request']['abi'],
        'getProofCosts',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'getProofCosts'
      }
    : UseContractWriteConfig<typeof delegatorABI, 'getProofCosts', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'getProofCosts'
      } = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof delegatorABI, 'getProofCosts', TMode>({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'getProofCosts',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"upgradeContracts"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function useDelegatorUpgradeContracts<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof delegatorAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof delegatorABI,
          'upgradeContracts'
        >['request']['abi'],
        'upgradeContracts',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'upgradeContracts'
      }
    : UseContractWriteConfig<typeof delegatorABI, 'upgradeContracts', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'upgradeContracts'
      } = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof delegatorABI, 'upgradeContracts', TMode>({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'upgradeContracts',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"replacecontract"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function useDelegatorReplacecontract<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof delegatorAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof delegatorABI,
          'replacecontract'
        >['request']['abi'],
        'replacecontract',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'replacecontract'
      }
    : UseContractWriteConfig<typeof delegatorABI, 'replacecontract', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'replacecontract'
      } = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof delegatorABI, 'replacecontract', TMode>({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'replacecontract',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"revokeWithMainAddress"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function useDelegatorRevokeWithMainAddress<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof delegatorAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof delegatorABI,
          'revokeWithMainAddress'
        >['request']['abi'],
        'revokeWithMainAddress',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'revokeWithMainAddress'
      }
    : UseContractWriteConfig<
        typeof delegatorABI,
        'revokeWithMainAddress',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'revokeWithMainAddress'
      } = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof delegatorABI, 'revokeWithMainAddress', TMode>({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'revokeWithMainAddress',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"revokeWithMultiSig"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function useDelegatorRevokeWithMultiSig<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof delegatorAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof delegatorABI,
          'revokeWithMultiSig'
        >['request']['abi'],
        'revokeWithMultiSig',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'revokeWithMultiSig'
      }
    : UseContractWriteConfig<
        typeof delegatorABI,
        'revokeWithMultiSig',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'revokeWithMultiSig'
      } = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof delegatorABI, 'revokeWithMultiSig', TMode>({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'revokeWithMultiSig',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"recoverWithRecoveryAddress"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function useDelegatorRecoverWithRecoveryAddress<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof delegatorAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof delegatorABI,
          'recoverWithRecoveryAddress'
        >['request']['abi'],
        'recoverWithRecoveryAddress',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'recoverWithRecoveryAddress'
      }
    : UseContractWriteConfig<
        typeof delegatorABI,
        'recoverWithRecoveryAddress',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'recoverWithRecoveryAddress'
      } = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<
    typeof delegatorABI,
    'recoverWithRecoveryAddress',
    TMode
  >({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'recoverWithRecoveryAddress',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"recoverWithMultiSig"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function useDelegatorRecoverWithMultiSig<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof delegatorAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof delegatorABI,
          'recoverWithMultiSig'
        >['request']['abi'],
        'recoverWithMultiSig',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'recoverWithMultiSig'
      }
    : UseContractWriteConfig<
        typeof delegatorABI,
        'recoverWithMultiSig',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'recoverWithMultiSig'
      } = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof delegatorABI, 'recoverWithMultiSig', TMode>({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'recoverWithMultiSig',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"getVoteCount"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function useDelegatorGetVoteCount<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof delegatorAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof delegatorABI,
          'getVoteCount'
        >['request']['abi'],
        'getVoteCount',
        TMode
      > & {address?: Address; chainId?: TChainId; functionName?: 'getVoteCount'}
    : UseContractWriteConfig<typeof delegatorABI, 'getVoteCount', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'getVoteCount'
      } = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof delegatorABI, 'getVoteCount', TMode>({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'getVoteCount',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"burnFees"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function useDelegatorBurnFees<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof delegatorAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof delegatorABI,
          'burnFees'
        >['request']['abi'],
        'burnFees',
        TMode
      > & {address?: Address; chainId?: TChainId; functionName?: 'burnFees'}
    : UseContractWriteConfig<typeof delegatorABI, 'burnFees', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'burnFees'
      } = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof delegatorABI, 'burnFees', TMode>({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'burnFees',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"setVerusData"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function useDelegatorSetVerusData<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof delegatorAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof delegatorABI,
          'setVerusData'
        >['request']['abi'],
        'setVerusData',
        TMode
      > & {address?: Address; chainId?: TChainId; functionName?: 'setVerusData'}
    : UseContractWriteConfig<typeof delegatorABI, 'setVerusData', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setVerusData'
      } = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof delegatorABI, 'setVerusData', TMode>({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'setVerusData',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link delegatorABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function usePrepareDelegatorWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof delegatorABI, TFunctionName>,
    'abi' | 'address'
  > & {chainId?: keyof typeof delegatorAddress} = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    ...config,
  } as UsePrepareContractWriteConfig<typeof delegatorABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"onERC1155BatchReceived"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function usePrepareDelegatorOnErc1155BatchReceived(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof delegatorABI,
      'onERC1155BatchReceived'
    >,
    'abi' | 'address' | 'functionName'
  > & {chainId?: keyof typeof delegatorAddress} = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'onERC1155BatchReceived',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof delegatorABI,
    'onERC1155BatchReceived'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"onERC1155Received"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function usePrepareDelegatorOnErc1155Received(
  config: Omit<
    UsePrepareContractWriteConfig<typeof delegatorABI, 'onERC1155Received'>,
    'abi' | 'address' | 'functionName'
  > & {chainId?: keyof typeof delegatorAddress} = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'onERC1155Received',
    ...config,
  } as UsePrepareContractWriteConfig<typeof delegatorABI, 'onERC1155Received'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"onERC721Received"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function usePrepareDelegatorOnErc721Received(
  config: Omit<
    UsePrepareContractWriteConfig<typeof delegatorABI, 'onERC721Received'>,
    'abi' | 'address' | 'functionName'
  > & {chainId?: keyof typeof delegatorAddress} = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'onERC721Received',
    ...config,
  } as UsePrepareContractWriteConfig<typeof delegatorABI, 'onERC721Received'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"sendTransfer"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function usePrepareDelegatorSendTransfer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof delegatorABI, 'sendTransfer'>,
    'abi' | 'address' | 'functionName'
  > & {chainId?: keyof typeof delegatorAddress} = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'sendTransfer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof delegatorABI, 'sendTransfer'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"sendTransferDirect"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function usePrepareDelegatorSendTransferDirect(
  config: Omit<
    UsePrepareContractWriteConfig<typeof delegatorABI, 'sendTransferDirect'>,
    'abi' | 'address' | 'functionName'
  > & {chainId?: keyof typeof delegatorAddress} = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'sendTransferDirect',
    ...config,
  } as UsePrepareContractWriteConfig<typeof delegatorABI, 'sendTransferDirect'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"submitImports"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function usePrepareDelegatorSubmitImports(
  config: Omit<
    UsePrepareContractWriteConfig<typeof delegatorABI, 'submitImports'>,
    'abi' | 'address' | 'functionName'
  > & {chainId?: keyof typeof delegatorAddress} = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'submitImports',
    ...config,
  } as UsePrepareContractWriteConfig<typeof delegatorABI, 'submitImports'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"getReadyExportsByRange"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function usePrepareDelegatorGetReadyExportsByRange(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof delegatorABI,
      'getReadyExportsByRange'
    >,
    'abi' | 'address' | 'functionName'
  > & {chainId?: keyof typeof delegatorAddress} = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'getReadyExportsByRange',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof delegatorABI,
    'getReadyExportsByRange'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"setLatestData"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function usePrepareDelegatorSetLatestData(
  config: Omit<
    UsePrepareContractWriteConfig<typeof delegatorABI, 'setLatestData'>,
    'abi' | 'address' | 'functionName'
  > & {chainId?: keyof typeof delegatorAddress} = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'setLatestData',
    ...config,
  } as UsePrepareContractWriteConfig<typeof delegatorABI, 'setLatestData'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"launchContractTokens"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function usePrepareDelegatorLaunchContractTokens(
  config: Omit<
    UsePrepareContractWriteConfig<typeof delegatorABI, 'launchContractTokens'>,
    'abi' | 'address' | 'functionName'
  > & {chainId?: keyof typeof delegatorAddress} = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'launchContractTokens',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof delegatorABI,
    'launchContractTokens'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"getTokenList"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function usePrepareDelegatorGetTokenList(
  config: Omit<
    UsePrepareContractWriteConfig<typeof delegatorABI, 'getTokenList'>,
    'abi' | 'address' | 'functionName'
  > & {chainId?: keyof typeof delegatorAddress} = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'getTokenList',
    ...config,
  } as UsePrepareContractWriteConfig<typeof delegatorABI, 'getTokenList'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"claimfees"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function usePrepareDelegatorClaimfees(
  config: Omit<
    UsePrepareContractWriteConfig<typeof delegatorABI, 'claimfees'>,
    'abi' | 'address' | 'functionName'
  > & {chainId?: keyof typeof delegatorAddress} = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'claimfees',
    ...config,
  } as UsePrepareContractWriteConfig<typeof delegatorABI, 'claimfees'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"claimRefund"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function usePrepareDelegatorClaimRefund(
  config: Omit<
    UsePrepareContractWriteConfig<typeof delegatorABI, 'claimRefund'>,
    'abi' | 'address' | 'functionName'
  > & {chainId?: keyof typeof delegatorAddress} = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'claimRefund',
    ...config,
  } as UsePrepareContractWriteConfig<typeof delegatorABI, 'claimRefund'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"sendfees"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function usePrepareDelegatorSendfees(
  config: Omit<
    UsePrepareContractWriteConfig<typeof delegatorABI, 'sendfees'>,
    'abi' | 'address' | 'functionName'
  > & {chainId?: keyof typeof delegatorAddress} = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'sendfees',
    ...config,
  } as UsePrepareContractWriteConfig<typeof delegatorABI, 'sendfees'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"getProof"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function usePrepareDelegatorGetProof(
  config: Omit<
    UsePrepareContractWriteConfig<typeof delegatorABI, 'getProof'>,
    'abi' | 'address' | 'functionName'
  > & {chainId?: keyof typeof delegatorAddress} = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'getProof',
    ...config,
  } as UsePrepareContractWriteConfig<typeof delegatorABI, 'getProof'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"getProofCosts"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function usePrepareDelegatorGetProofCosts(
  config: Omit<
    UsePrepareContractWriteConfig<typeof delegatorABI, 'getProofCosts'>,
    'abi' | 'address' | 'functionName'
  > & {chainId?: keyof typeof delegatorAddress} = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'getProofCosts',
    ...config,
  } as UsePrepareContractWriteConfig<typeof delegatorABI, 'getProofCosts'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"upgradeContracts"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function usePrepareDelegatorUpgradeContracts(
  config: Omit<
    UsePrepareContractWriteConfig<typeof delegatorABI, 'upgradeContracts'>,
    'abi' | 'address' | 'functionName'
  > & {chainId?: keyof typeof delegatorAddress} = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'upgradeContracts',
    ...config,
  } as UsePrepareContractWriteConfig<typeof delegatorABI, 'upgradeContracts'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"replacecontract"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function usePrepareDelegatorReplacecontract(
  config: Omit<
    UsePrepareContractWriteConfig<typeof delegatorABI, 'replacecontract'>,
    'abi' | 'address' | 'functionName'
  > & {chainId?: keyof typeof delegatorAddress} = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'replacecontract',
    ...config,
  } as UsePrepareContractWriteConfig<typeof delegatorABI, 'replacecontract'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"revokeWithMainAddress"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function usePrepareDelegatorRevokeWithMainAddress(
  config: Omit<
    UsePrepareContractWriteConfig<typeof delegatorABI, 'revokeWithMainAddress'>,
    'abi' | 'address' | 'functionName'
  > & {chainId?: keyof typeof delegatorAddress} = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'revokeWithMainAddress',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof delegatorABI,
    'revokeWithMainAddress'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"revokeWithMultiSig"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function usePrepareDelegatorRevokeWithMultiSig(
  config: Omit<
    UsePrepareContractWriteConfig<typeof delegatorABI, 'revokeWithMultiSig'>,
    'abi' | 'address' | 'functionName'
  > & {chainId?: keyof typeof delegatorAddress} = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'revokeWithMultiSig',
    ...config,
  } as UsePrepareContractWriteConfig<typeof delegatorABI, 'revokeWithMultiSig'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"recoverWithRecoveryAddress"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function usePrepareDelegatorRecoverWithRecoveryAddress(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof delegatorABI,
      'recoverWithRecoveryAddress'
    >,
    'abi' | 'address' | 'functionName'
  > & {chainId?: keyof typeof delegatorAddress} = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'recoverWithRecoveryAddress',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof delegatorABI,
    'recoverWithRecoveryAddress'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"recoverWithMultiSig"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function usePrepareDelegatorRecoverWithMultiSig(
  config: Omit<
    UsePrepareContractWriteConfig<typeof delegatorABI, 'recoverWithMultiSig'>,
    'abi' | 'address' | 'functionName'
  > & {chainId?: keyof typeof delegatorAddress} = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'recoverWithMultiSig',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof delegatorABI,
    'recoverWithMultiSig'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"getVoteCount"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function usePrepareDelegatorGetVoteCount(
  config: Omit<
    UsePrepareContractWriteConfig<typeof delegatorABI, 'getVoteCount'>,
    'abi' | 'address' | 'functionName'
  > & {chainId?: keyof typeof delegatorAddress} = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'getVoteCount',
    ...config,
  } as UsePrepareContractWriteConfig<typeof delegatorABI, 'getVoteCount'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"burnFees"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function usePrepareDelegatorBurnFees(
  config: Omit<
    UsePrepareContractWriteConfig<typeof delegatorABI, 'burnFees'>,
    'abi' | 'address' | 'functionName'
  > & {chainId?: keyof typeof delegatorAddress} = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'burnFees',
    ...config,
  } as UsePrepareContractWriteConfig<typeof delegatorABI, 'burnFees'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link delegatorABI}__ and `functionName` set to `"setVerusData"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x85a7dE2278E52327471e174AeeB280cdFdC6A68a)
 */
export function usePrepareDelegatorSetVerusData(
  config: Omit<
    UsePrepareContractWriteConfig<typeof delegatorABI, 'setVerusData'>,
    'abi' | 'address' | 'functionName'
  > & {chainId?: keyof typeof delegatorAddress} = {} as any
) {
  const {chain} = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: delegatorABI,
    address: delegatorAddress[chainId as keyof typeof delegatorAddress],
    functionName: 'setVerusData',
    ...config,
  } as UsePrepareContractWriteConfig<typeof delegatorABI, 'setVerusData'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc1155ABI}__.
 */
export function useErc1155Read<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof erc1155ABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof erc1155ABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any
) {
  return useContractRead({abi: erc1155ABI, ...config} as UseContractReadConfig<
    typeof erc1155ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc1155ABI}__ and `functionName` set to `"airlineCount"`.
 */
export function useErc1155AirlineCount<
  TFunctionName extends 'airlineCount',
  TSelectData = ReadContractResult<typeof erc1155ABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof erc1155ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: erc1155ABI,
    functionName: 'airlineCount',
    ...config,
  } as UseContractReadConfig<typeof erc1155ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc1155ABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useErc1155BalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof erc1155ABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof erc1155ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: erc1155ABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof erc1155ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc1155ABI}__ and `functionName` set to `"balanceOfBatch"`.
 */
export function useErc1155BalanceOfBatch<
  TFunctionName extends 'balanceOfBatch',
  TSelectData = ReadContractResult<typeof erc1155ABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof erc1155ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: erc1155ABI,
    functionName: 'balanceOfBatch',
    ...config,
  } as UseContractReadConfig<typeof erc1155ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc1155ABI}__ and `functionName` set to `"governance"`.
 */
export function useErc1155Governance<
  TFunctionName extends 'governance',
  TSelectData = ReadContractResult<typeof erc1155ABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof erc1155ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: erc1155ABI,
    functionName: 'governance',
    ...config,
  } as UseContractReadConfig<typeof erc1155ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc1155ABI}__ and `functionName` set to `"isApprovedForAll"`.
 */
export function useErc1155IsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof erc1155ABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof erc1155ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: erc1155ABI,
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<typeof erc1155ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc1155ABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useErc1155SupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof erc1155ABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof erc1155ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: erc1155ABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof erc1155ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc1155ABI}__ and `functionName` set to `"uri"`.
 */
export function useErc1155Uri<
  TFunctionName extends 'uri',
  TSelectData = ReadContractResult<typeof erc1155ABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof erc1155ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: erc1155ABI,
    functionName: 'uri',
    ...config,
  } as UseContractReadConfig<typeof erc1155ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc1155ABI}__.
 */
export function useErc1155Write<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof erc1155ABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof erc1155ABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any
) {
  return useContractWrite<typeof erc1155ABI, TFunctionName, TMode>({
    abi: erc1155ABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc1155ABI}__ and `functionName` set to `"addNewAirline"`.
 */
export function useErc1155AddNewAirline<
  TMode extends WriteContractMode = undefined
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc1155ABI,
          'addNewAirline'
        >['request']['abi'],
        'addNewAirline',
        TMode
      > & {functionName?: 'addNewAirline'}
    : UseContractWriteConfig<typeof erc1155ABI, 'addNewAirline', TMode> & {
        abi?: never
        functionName?: 'addNewAirline'
      } = {} as any
) {
  return useContractWrite<typeof erc1155ABI, 'addNewAirline', TMode>({
    abi: erc1155ABI,
    functionName: 'addNewAirline',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc1155ABI}__ and `functionName` set to `"safeBatchTransferFrom"`.
 */
export function useErc1155SafeBatchTransferFrom<
  TMode extends WriteContractMode = undefined
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc1155ABI,
          'safeBatchTransferFrom'
        >['request']['abi'],
        'safeBatchTransferFrom',
        TMode
      > & {functionName?: 'safeBatchTransferFrom'}
    : UseContractWriteConfig<
        typeof erc1155ABI,
        'safeBatchTransferFrom',
        TMode
      > & {
        abi?: never
        functionName?: 'safeBatchTransferFrom'
      } = {} as any
) {
  return useContractWrite<typeof erc1155ABI, 'safeBatchTransferFrom', TMode>({
    abi: erc1155ABI,
    functionName: 'safeBatchTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc1155ABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function useErc1155SafeTransferFrom<
  TMode extends WriteContractMode = undefined
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc1155ABI,
          'safeTransferFrom'
        >['request']['abi'],
        'safeTransferFrom',
        TMode
      > & {functionName?: 'safeTransferFrom'}
    : UseContractWriteConfig<typeof erc1155ABI, 'safeTransferFrom', TMode> & {
        abi?: never
        functionName?: 'safeTransferFrom'
      } = {} as any
) {
  return useContractWrite<typeof erc1155ABI, 'safeTransferFrom', TMode>({
    abi: erc1155ABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc1155ABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function useErc1155SetApprovalForAll<
  TMode extends WriteContractMode = undefined
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc1155ABI,
          'setApprovalForAll'
        >['request']['abi'],
        'setApprovalForAll',
        TMode
      > & {functionName?: 'setApprovalForAll'}
    : UseContractWriteConfig<typeof erc1155ABI, 'setApprovalForAll', TMode> & {
        abi?: never
        functionName?: 'setApprovalForAll'
      } = {} as any
) {
  return useContractWrite<typeof erc1155ABI, 'setApprovalForAll', TMode>({
    abi: erc1155ABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc1155ABI}__.
 */
export function usePrepareErc1155Write<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc1155ABI, TFunctionName>,
    'abi'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: erc1155ABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc1155ABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc1155ABI}__ and `functionName` set to `"addNewAirline"`.
 */
export function usePrepareErc1155AddNewAirline(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc1155ABI, 'addNewAirline'>,
    'abi' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: erc1155ABI,
    functionName: 'addNewAirline',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc1155ABI, 'addNewAirline'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc1155ABI}__ and `functionName` set to `"safeBatchTransferFrom"`.
 */
export function usePrepareErc1155SafeBatchTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc1155ABI, 'safeBatchTransferFrom'>,
    'abi' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: erc1155ABI,
    functionName: 'safeBatchTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof erc1155ABI,
    'safeBatchTransferFrom'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc1155ABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePrepareErc1155SafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc1155ABI, 'safeTransferFrom'>,
    'abi' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: erc1155ABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc1155ABI, 'safeTransferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc1155ABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePrepareErc1155SetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc1155ABI, 'setApprovalForAll'>,
    'abi' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: erc1155ABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc1155ABI, 'setApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc1155ABI}__.
 */
export function useErc1155Event<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof erc1155ABI, TEventName>,
    'abi'
  > = {} as any
) {
  return useContractEvent({
    abi: erc1155ABI,
    ...config,
  } as UseContractEventConfig<typeof erc1155ABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc1155ABI}__ and `eventName` set to `"ApprovalForAll"`.
 */
export function useErc1155ApprovalForAllEvent(
  config: Omit<
    UseContractEventConfig<typeof erc1155ABI, 'ApprovalForAll'>,
    'abi' | 'eventName'
  > = {} as any
) {
  return useContractEvent({
    abi: erc1155ABI,
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof erc1155ABI, 'ApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc1155ABI}__ and `eventName` set to `"TransferBatch"`.
 */
export function useErc1155TransferBatchEvent(
  config: Omit<
    UseContractEventConfig<typeof erc1155ABI, 'TransferBatch'>,
    'abi' | 'eventName'
  > = {} as any
) {
  return useContractEvent({
    abi: erc1155ABI,
    eventName: 'TransferBatch',
    ...config,
  } as UseContractEventConfig<typeof erc1155ABI, 'TransferBatch'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc1155ABI}__ and `eventName` set to `"TransferSingle"`.
 */
export function useErc1155TransferSingleEvent(
  config: Omit<
    UseContractEventConfig<typeof erc1155ABI, 'TransferSingle'>,
    'abi' | 'eventName'
  > = {} as any
) {
  return useContractEvent({
    abi: erc1155ABI,
    eventName: 'TransferSingle',
    ...config,
  } as UseContractEventConfig<typeof erc1155ABI, 'TransferSingle'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc1155ABI}__ and `eventName` set to `"URI"`.
 */
export function useErc1155UriEvent(
  config: Omit<
    UseContractEventConfig<typeof erc1155ABI, 'URI'>,
    'abi' | 'eventName'
  > = {} as any
) {
  return useContractEvent({
    abi: erc1155ABI,
    eventName: 'URI',
    ...config,
  } as UseContractEventConfig<typeof erc1155ABI, 'URI'>)
}
