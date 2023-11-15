export const abi = [
  {
    inputs: [
      {
        internalType: 'address[]',
        name: '_notaries',
        type: 'address[]',
      },
      {
        internalType: 'address[]',
        name: '_notariesEthAddress',
        type: 'address[]',
      },
      {
        internalType: 'address[]',
        name: '_notariesColdStoreEthAddress',
        type: 'address[]',
      },
      {
        internalType: 'address[]',
        name: '_newContractAddress',
        type: 'address[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: '_readyExports',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'exportHash',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'prevExportHash',
        type: 'bytes32',
      },
      {
        internalType: 'uint64',
        name: 'endHeight',
        type: 'uint64',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'bestForks',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'bridgeConverterActive',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'cceLastEndHeight',
    outputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'cceLastStartHeight',
    outputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    name: 'claimableFees',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'contracts',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'exportHeights',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    name: 'lastImportInfo',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'hashOfTransfers',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'exporttxid',
        type: 'bytes32',
      },
      {
        internalType: 'uint32',
        name: 'exporttxoutnum',
        type: 'uint32',
      },
      {
        internalType: 'uint32',
        name: 'height',
        type: 'uint32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'lastTxIdImport',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'notaries',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'notaryAddressMapping',
    outputs: [
      {
        internalType: 'address',
        name: 'main',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'recovery',
        type: 'address',
      },
      {
        internalType: 'uint8',
        name: 'state',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    name: 'onERC1155BatchReceived',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    name: 'onERC1155Received',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    name: 'onERC721Received',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    name: 'processedTxids',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'refunds',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'rollingUpgradeVotes',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'rollingVoteIndex',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    name: 'saltsUsed',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    name: 'storageGlobal',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'tokenList',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'verusToERC20mapping',
    outputs: [
      {
        internalType: 'address',
        name: 'erc20ContractAddress',
        type: 'address',
      },
      {
        internalType: 'uint8',
        name: 'flags',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: 'tokenIndex',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'tokenID',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    stateMutability: 'payable',
    type: 'receive',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint32',
            name: 'version',
            type: 'uint32',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
              {
                internalType: 'uint64',
                name: 'amount',
                type: 'uint64',
              },
            ],
            internalType: 'struct VerusObjects.CCurrencyValueMap',
            name: 'currencyvalue',
            type: 'tuple',
          },
          {
            internalType: 'uint32',
            name: 'flags',
            type: 'uint32',
          },
          {
            internalType: 'address',
            name: 'feecurrencyid',
            type: 'address',
          },
          {
            internalType: 'uint64',
            name: 'fees',
            type: 'uint64',
          },
          {
            components: [
              {
                internalType: 'uint8',
                name: 'destinationtype',
                type: 'uint8',
              },
              {
                internalType: 'bytes',
                name: 'destinationaddress',
                type: 'bytes',
              },
            ],
            internalType: 'struct VerusObjectsCommon.CTransferDestination',
            name: 'destination',
            type: 'tuple',
          },
          {
            internalType: 'address',
            name: 'destcurrencyid',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'destsystemid',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'secondreserveid',
            type: 'address',
          },
        ],
        internalType: 'struct VerusObjects.CReserveTransfer',
        name: '_transfer',
        type: 'tuple',
      },
    ],
    name: 'sendTransfer',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'sendTransferDirect',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'uint8',
                name: 'version',
                type: 'uint8',
              },
              {
                internalType: 'uint8',
                name: 'typeC',
                type: 'uint8',
              },
              {
                components: [
                  {
                    internalType: 'uint8',
                    name: 'branchType',
                    type: 'uint8',
                  },
                  {
                    components: [
                      {
                        internalType: 'uint8',
                        name: 'CMerkleBranchBase',
                        type: 'uint8',
                      },
                      {
                        internalType: 'uint32',
                        name: 'nIndex',
                        type: 'uint32',
                      },
                      {
                        internalType: 'uint32',
                        name: 'nSize',
                        type: 'uint32',
                      },
                      {
                        internalType: 'uint8',
                        name: 'extraHashes',
                        type: 'uint8',
                      },
                      {
                        internalType: 'bytes32[]',
                        name: 'branch',
                        type: 'bytes32[]',
                      },
                    ],
                    internalType: 'struct VerusObjects.CMerkleBranch',
                    name: 'proofSequence',
                    type: 'tuple',
                  },
                ],
                internalType: 'struct VerusObjects.CTXProof[]',
                name: 'txproof',
                type: 'tuple[]',
              },
              {
                components: [
                  {
                    internalType: 'uint8',
                    name: 'elType',
                    type: 'uint8',
                  },
                  {
                    internalType: 'uint8',
                    name: 'elIdx',
                    type: 'uint8',
                  },
                  {
                    internalType: 'bytes',
                    name: 'elVchObj',
                    type: 'bytes',
                  },
                  {
                    components: [
                      {
                        internalType: 'uint8',
                        name: 'branchType',
                        type: 'uint8',
                      },
                      {
                        components: [
                          {
                            internalType: 'uint8',
                            name: 'CMerkleBranchBase',
                            type: 'uint8',
                          },
                          {
                            internalType: 'uint32',
                            name: 'nIndex',
                            type: 'uint32',
                          },
                          {
                            internalType: 'uint32',
                            name: 'nSize',
                            type: 'uint32',
                          },
                          {
                            internalType: 'uint8',
                            name: 'extraHashes',
                            type: 'uint8',
                          },
                          {
                            internalType: 'bytes32[]',
                            name: 'branch',
                            type: 'bytes32[]',
                          },
                        ],
                        internalType: 'struct VerusObjects.CMerkleBranch',
                        name: 'proofSequence',
                        type: 'tuple',
                      },
                    ],
                    internalType: 'struct VerusObjects.CTXProof[]',
                    name: 'elProof',
                    type: 'tuple[]',
                  },
                ],
                internalType: 'struct VerusObjects.CComponents[]',
                name: 'components',
                type: 'tuple[]',
              },
            ],
            internalType: 'struct VerusObjects.CPtransactionproof',
            name: 'partialtransactionproof',
            type: 'tuple',
          },
          {
            internalType: 'bytes',
            name: 'serializedTransfers',
            type: 'bytes',
          },
        ],
        internalType: 'struct VerusObjects.CReserveTransferImport',
        name: 'data',
        type: 'tuple',
      },
    ],
    name: 'submitImports',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_startBlock',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_endBlock',
        type: 'uint256',
      },
    ],
    name: 'getReadyExportsByRange',
    outputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'exportHash',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'prevExportHash',
            type: 'bytes32',
          },
          {
            internalType: 'uint64',
            name: 'startHeight',
            type: 'uint64',
          },
          {
            internalType: 'uint64',
            name: 'endHeight',
            type: 'uint64',
          },
          {
            components: [
              {
                internalType: 'uint32',
                name: 'version',
                type: 'uint32',
              },
              {
                components: [
                  {
                    internalType: 'address',
                    name: 'currency',
                    type: 'address',
                  },
                  {
                    internalType: 'uint64',
                    name: 'amount',
                    type: 'uint64',
                  },
                ],
                internalType: 'struct VerusObjects.CCurrencyValueMap',
                name: 'currencyvalue',
                type: 'tuple',
              },
              {
                internalType: 'uint32',
                name: 'flags',
                type: 'uint32',
              },
              {
                internalType: 'address',
                name: 'feecurrencyid',
                type: 'address',
              },
              {
                internalType: 'uint64',
                name: 'fees',
                type: 'uint64',
              },
              {
                components: [
                  {
                    internalType: 'uint8',
                    name: 'destinationtype',
                    type: 'uint8',
                  },
                  {
                    internalType: 'bytes',
                    name: 'destinationaddress',
                    type: 'bytes',
                  },
                ],
                internalType: 'struct VerusObjectsCommon.CTransferDestination',
                name: 'destination',
                type: 'tuple',
              },
              {
                internalType: 'address',
                name: 'destcurrencyid',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'destsystemid',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'secondreserveid',
                type: 'address',
              },
            ],
            internalType: 'struct VerusObjects.CReserveTransfer[]',
            name: 'transfers',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct VerusObjects.CReserveTransferSetCalled[]',
        name: 'returnedExports',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'serializedNotarization',
        type: 'bytes',
      },
      {
        internalType: 'bytes32',
        name: 'txid',
        type: 'bytes32',
      },
      {
        internalType: 'uint32',
        name: 'n',
        type: 'uint32',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'setLatestData',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'launchContractTokens',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'start',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'end',
        type: 'uint256',
      },
    ],
    name: 'getTokenList',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'iaddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'erc20ContractAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'launchSystemID',
            type: 'address',
          },
          {
            internalType: 'uint8',
            name: 'flags',
            type: 'uint8',
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'ticker',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'tokenID',
            type: 'uint256',
          },
        ],
        internalType: 'struct VerusObjects.setupToken[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '_imports',
        type: 'bytes32',
      },
    ],
    name: 'checkImport',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'claimfees',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint176',
        name: 'verusAddress',
        type: 'uint176',
      },
      {
        internalType: 'address',
        name: 'currency',
        type: 'address',
      },
    ],
    name: 'claimRefund',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'publicKeyX',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'publicKeyY',
        type: 'bytes32',
      },
    ],
    name: 'sendfees',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'proofHeightOptions',
        type: 'uint256',
      },
    ],
    name: 'getProof',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'proofOption',
        type: 'uint256',
      },
    ],
    name: 'getProofCosts',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'upgradeContracts',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newcontract',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'contractNo',
        type: 'uint256',
      },
    ],
    name: 'replacecontract',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'revokeWithMainAddress',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'revokeWithMultiSig',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'recoverWithRecoveryAddress',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'recoverWithMultiSig',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'contractsHash',
        type: 'address',
      },
    ],
    name: 'getVoteCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'burnFees',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
      {
        internalType: 'string',
        name: 'vdxfid',
        type: 'string',
      },
    ],
    name: 'setVerusData',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const
