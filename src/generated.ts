import {
  createReadContract,
  createWriteContract,
  createSimulateContract,
} from 'wagmi/codegen'

import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// delegator
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const delegatorAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_notaries', internalType: 'address[]', type: 'address[]' },
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
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: '_readyExports',
    outputs: [
      { name: 'exportHash', internalType: 'bytes32', type: 'bytes32' },
      { name: 'prevExportHash', internalType: 'bytes32', type: 'bytes32' },
      { name: 'endHeight', internalType: 'uint64', type: 'uint64' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'bestForks',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'bridgeConverterActive',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'cceLastEndHeight',
    outputs: [{ name: '', internalType: 'uint64', type: 'uint64' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'cceLastStartHeight',
    outputs: [{ name: '', internalType: 'uint64', type: 'uint64' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    name: 'claimableFees',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'contracts',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'exportHeights',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    name: 'lastImportInfo',
    outputs: [
      { name: 'hashOfTransfers', internalType: 'bytes32', type: 'bytes32' },
      { name: 'exporttxid', internalType: 'bytes32', type: 'bytes32' },
      { name: 'exporttxoutnum', internalType: 'uint32', type: 'uint32' },
      { name: 'height', internalType: 'uint32', type: 'uint32' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'lastTxIdImport',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'notaries',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'notaryAddressMapping',
    outputs: [
      { name: 'main', internalType: 'address', type: 'address' },
      { name: 'recovery', internalType: 'address', type: 'address' },
      { name: 'state', internalType: 'uint8', type: 'uint8' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155BatchReceived',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC721Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    name: 'processedTxids',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'bytes32', type: 'bytes32' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'refunds',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'rollingUpgradeVotes',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'rollingVoteIndex',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    name: 'saltsUsed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    name: 'storageGlobal',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenList',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'verusToERC20mapping',
    outputs: [
      {
        name: 'erc20ContractAddress',
        internalType: 'address',
        type: 'address',
      },
      { name: 'flags', internalType: 'uint8', type: 'uint8' },
      { name: 'tokenIndex', internalType: 'uint256', type: 'uint256' },
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'tokenID', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  { type: 'receive', stateMutability: 'payable' },
  {
    type: 'function',
    inputs: [
      {
        name: '_transfer',
        internalType: 'struct VerusObjects.CReserveTransfer',
        type: 'tuple',
        components: [
          { name: 'version', internalType: 'uint32', type: 'uint32' },
          {
            name: 'currencyvalue',
            internalType: 'struct VerusObjects.CCurrencyValueMap',
            type: 'tuple',
            components: [
              { name: 'currency', internalType: 'address', type: 'address' },
              { name: 'amount', internalType: 'uint64', type: 'uint64' },
            ],
          },
          { name: 'flags', internalType: 'uint32', type: 'uint32' },
          { name: 'feecurrencyid', internalType: 'address', type: 'address' },
          { name: 'fees', internalType: 'uint64', type: 'uint64' },
          {
            name: 'destination',
            internalType: 'struct VerusObjectsCommon.CTransferDestination',
            type: 'tuple',
            components: [
              { name: 'destinationtype', internalType: 'uint8', type: 'uint8' },
              {
                name: 'destinationaddress',
                internalType: 'bytes',
                type: 'bytes',
              },
            ],
          },
          { name: 'destcurrencyid', internalType: 'address', type: 'address' },
          { name: 'destsystemid', internalType: 'address', type: 'address' },
          { name: 'secondreserveid', internalType: 'address', type: 'address' },
        ],
      },
    ],
    name: 'sendTransfer',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes', type: 'bytes' }],
    name: 'sendTransferDirect',
    outputs: [],
    stateMutability: 'payable',
  },
  {
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
              { name: 'version', internalType: 'uint8', type: 'uint8' },
              { name: 'typeC', internalType: 'uint8', type: 'uint8' },
              {
                name: 'txproof',
                internalType: 'struct VerusObjects.CTXProof[]',
                type: 'tuple[]',
                components: [
                  { name: 'branchType', internalType: 'uint8', type: 'uint8' },
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
                      { name: 'nSize', internalType: 'uint32', type: 'uint32' },
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
                  { name: 'elType', internalType: 'uint8', type: 'uint8' },
                  { name: 'elIdx', internalType: 'uint8', type: 'uint8' },
                  { name: 'elVchObj', internalType: 'bytes', type: 'bytes' },
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
          { name: 'serializedTransfers', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'submitImports',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_startBlock', internalType: 'uint256', type: 'uint256' },
      { name: '_endBlock', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getReadyExportsByRange',
    outputs: [
      {
        name: 'returnedExports',
        internalType: 'struct VerusObjects.CReserveTransferSetCalled[]',
        type: 'tuple[]',
        components: [
          { name: 'exportHash', internalType: 'bytes32', type: 'bytes32' },
          { name: 'prevExportHash', internalType: 'bytes32', type: 'bytes32' },
          { name: 'startHeight', internalType: 'uint64', type: 'uint64' },
          { name: 'endHeight', internalType: 'uint64', type: 'uint64' },
          {
            name: 'transfers',
            internalType: 'struct VerusObjects.CReserveTransfer[]',
            type: 'tuple[]',
            components: [
              { name: 'version', internalType: 'uint32', type: 'uint32' },
              {
                name: 'currencyvalue',
                internalType: 'struct VerusObjects.CCurrencyValueMap',
                type: 'tuple',
                components: [
                  {
                    name: 'currency',
                    internalType: 'address',
                    type: 'address',
                  },
                  { name: 'amount', internalType: 'uint64', type: 'uint64' },
                ],
              },
              { name: 'flags', internalType: 'uint32', type: 'uint32' },
              {
                name: 'feecurrencyid',
                internalType: 'address',
                type: 'address',
              },
              { name: 'fees', internalType: 'uint64', type: 'uint64' },
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
              {
                name: 'destsystemid',
                internalType: 'address',
                type: 'address',
              },
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
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'serializedNotarization', internalType: 'bytes', type: 'bytes' },
      { name: 'txid', internalType: 'bytes32', type: 'bytes32' },
      { name: 'n', internalType: 'uint32', type: 'uint32' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'setLatestData',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes', type: 'bytes' }],
    name: 'launchContractTokens',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'start', internalType: 'uint256', type: 'uint256' },
      { name: 'end', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getTokenList',
    outputs: [
      {
        name: '',
        internalType: 'struct VerusObjects.setupToken[]',
        type: 'tuple[]',
        components: [
          { name: 'iaddress', internalType: 'address', type: 'address' },
          {
            name: 'erc20ContractAddress',
            internalType: 'address',
            type: 'address',
          },
          { name: 'launchSystemID', internalType: 'address', type: 'address' },
          { name: 'flags', internalType: 'uint8', type: 'uint8' },
          { name: 'name', internalType: 'string', type: 'string' },
          { name: 'ticker', internalType: 'string', type: 'string' },
          { name: 'tokenID', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_imports', internalType: 'bytes32', type: 'bytes32' }],
    name: 'checkImport',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'claimfees',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'verusAddress', internalType: 'uint176', type: 'uint176' },
      { name: 'currency', internalType: 'address', type: 'address' },
    ],
    name: 'claimRefund',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'publicKeyX', internalType: 'bytes32', type: 'bytes32' },
      { name: 'publicKeyY', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'sendfees',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'proofHeightOptions', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getProof',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: 'proofOption', internalType: 'uint256', type: 'uint256' }],
    name: 'getProofCosts',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes', type: 'bytes' }],
    name: 'upgradeContracts',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newcontract', internalType: 'address', type: 'address' },
      { name: 'contractNo', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'replacecontract',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes', type: 'bytes' }],
    name: 'revokeWithMainAddress',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes', type: 'bytes' }],
    name: 'revokeWithMultiSig',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes', type: 'bytes' }],
    name: 'recoverWithRecoveryAddress',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes', type: 'bytes' }],
    name: 'recoverWithMultiSig',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'contractsHash', internalType: 'address', type: 'address' },
    ],
    name: 'getVoteCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes', type: 'bytes' }],
    name: 'burnFees',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'data', internalType: 'bytes', type: 'bytes' },
      { name: 'vdxfid', internalType: 'string', type: 'string' },
    ],
    name: 'setVerusData',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const delegatorAddress = {
  1: '0x71518580f36FeCEFfE0721F06bA4703218cD7F63',
  11155111: '0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb',
} as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const delegatorConfig = {
  address: delegatorAddress,
  abi: delegatorAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Action
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link delegatorAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const readDelegator = /*#__PURE__*/ createReadContract({
  abi: delegatorAbi,
  address: delegatorAddress,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"_readyExports"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const readDelegatorReadyExports = /*#__PURE__*/ createReadContract({
  abi: delegatorAbi,
  address: delegatorAddress,
  functionName: '_readyExports',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"bestForks"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const readDelegatorBestForks = /*#__PURE__*/ createReadContract({
  abi: delegatorAbi,
  address: delegatorAddress,
  functionName: 'bestForks',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"bridgeConverterActive"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const readDelegatorBridgeConverterActive =
  /*#__PURE__*/ createReadContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'bridgeConverterActive',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"cceLastEndHeight"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const readDelegatorCceLastEndHeight = /*#__PURE__*/ createReadContract({
  abi: delegatorAbi,
  address: delegatorAddress,
  functionName: 'cceLastEndHeight',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"cceLastStartHeight"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const readDelegatorCceLastStartHeight = /*#__PURE__*/ createReadContract(
  {
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'cceLastStartHeight',
  },
)

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"claimableFees"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const readDelegatorClaimableFees = /*#__PURE__*/ createReadContract({
  abi: delegatorAbi,
  address: delegatorAddress,
  functionName: 'claimableFees',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"contracts"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const readDelegatorContracts = /*#__PURE__*/ createReadContract({
  abi: delegatorAbi,
  address: delegatorAddress,
  functionName: 'contracts',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"exportHeights"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const readDelegatorExportHeights = /*#__PURE__*/ createReadContract({
  abi: delegatorAbi,
  address: delegatorAddress,
  functionName: 'exportHeights',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"lastImportInfo"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const readDelegatorLastImportInfo = /*#__PURE__*/ createReadContract({
  abi: delegatorAbi,
  address: delegatorAddress,
  functionName: 'lastImportInfo',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"lastTxIdImport"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const readDelegatorLastTxIdImport = /*#__PURE__*/ createReadContract({
  abi: delegatorAbi,
  address: delegatorAddress,
  functionName: 'lastTxIdImport',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"notaries"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const readDelegatorNotaries = /*#__PURE__*/ createReadContract({
  abi: delegatorAbi,
  address: delegatorAddress,
  functionName: 'notaries',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"notaryAddressMapping"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const readDelegatorNotaryAddressMapping =
  /*#__PURE__*/ createReadContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'notaryAddressMapping',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const readDelegatorOwner = /*#__PURE__*/ createReadContract({
  abi: delegatorAbi,
  address: delegatorAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"processedTxids"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const readDelegatorProcessedTxids = /*#__PURE__*/ createReadContract({
  abi: delegatorAbi,
  address: delegatorAddress,
  functionName: 'processedTxids',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"refunds"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const readDelegatorRefunds = /*#__PURE__*/ createReadContract({
  abi: delegatorAbi,
  address: delegatorAddress,
  functionName: 'refunds',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"rollingUpgradeVotes"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const readDelegatorRollingUpgradeVotes =
  /*#__PURE__*/ createReadContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'rollingUpgradeVotes',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"rollingVoteIndex"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const readDelegatorRollingVoteIndex = /*#__PURE__*/ createReadContract({
  abi: delegatorAbi,
  address: delegatorAddress,
  functionName: 'rollingVoteIndex',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"saltsUsed"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const readDelegatorSaltsUsed = /*#__PURE__*/ createReadContract({
  abi: delegatorAbi,
  address: delegatorAddress,
  functionName: 'saltsUsed',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"storageGlobal"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const readDelegatorStorageGlobal = /*#__PURE__*/ createReadContract({
  abi: delegatorAbi,
  address: delegatorAddress,
  functionName: 'storageGlobal',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const readDelegatorSupportsInterface = /*#__PURE__*/ createReadContract({
  abi: delegatorAbi,
  address: delegatorAddress,
  functionName: 'supportsInterface',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"tokenList"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const readDelegatorTokenList = /*#__PURE__*/ createReadContract({
  abi: delegatorAbi,
  address: delegatorAddress,
  functionName: 'tokenList',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"verusToERC20mapping"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const readDelegatorVerusToErc20mapping =
  /*#__PURE__*/ createReadContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'verusToERC20mapping',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"checkImport"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const readDelegatorCheckImport = /*#__PURE__*/ createReadContract({
  abi: delegatorAbi,
  address: delegatorAddress,
  functionName: 'checkImport',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link delegatorAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const writeDelegator = /*#__PURE__*/ createWriteContract({
  abi: delegatorAbi,
  address: delegatorAddress,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"onERC1155BatchReceived"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const writeDelegatorOnErc1155BatchReceived =
  /*#__PURE__*/ createWriteContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'onERC1155BatchReceived',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"onERC1155Received"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const writeDelegatorOnErc1155Received =
  /*#__PURE__*/ createWriteContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'onERC1155Received',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"onERC721Received"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const writeDelegatorOnErc721Received = /*#__PURE__*/ createWriteContract(
  {
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'onERC721Received',
  },
)

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"sendTransfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const writeDelegatorSendTransfer = /*#__PURE__*/ createWriteContract({
  abi: delegatorAbi,
  address: delegatorAddress,
  functionName: 'sendTransfer',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"sendTransferDirect"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const writeDelegatorSendTransferDirect =
  /*#__PURE__*/ createWriteContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'sendTransferDirect',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"submitImports"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const writeDelegatorSubmitImports = /*#__PURE__*/ createWriteContract({
  abi: delegatorAbi,
  address: delegatorAddress,
  functionName: 'submitImports',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"getReadyExportsByRange"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const writeDelegatorGetReadyExportsByRange =
  /*#__PURE__*/ createWriteContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'getReadyExportsByRange',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"setLatestData"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const writeDelegatorSetLatestData = /*#__PURE__*/ createWriteContract({
  abi: delegatorAbi,
  address: delegatorAddress,
  functionName: 'setLatestData',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"launchContractTokens"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const writeDelegatorLaunchContractTokens =
  /*#__PURE__*/ createWriteContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'launchContractTokens',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"getTokenList"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const writeDelegatorGetTokenList = /*#__PURE__*/ createWriteContract({
  abi: delegatorAbi,
  address: delegatorAddress,
  functionName: 'getTokenList',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"claimfees"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const writeDelegatorClaimfees = /*#__PURE__*/ createWriteContract({
  abi: delegatorAbi,
  address: delegatorAddress,
  functionName: 'claimfees',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"claimRefund"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const writeDelegatorClaimRefund = /*#__PURE__*/ createWriteContract({
  abi: delegatorAbi,
  address: delegatorAddress,
  functionName: 'claimRefund',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"sendfees"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const writeDelegatorSendfees = /*#__PURE__*/ createWriteContract({
  abi: delegatorAbi,
  address: delegatorAddress,
  functionName: 'sendfees',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"getProof"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const writeDelegatorGetProof = /*#__PURE__*/ createWriteContract({
  abi: delegatorAbi,
  address: delegatorAddress,
  functionName: 'getProof',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"getProofCosts"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const writeDelegatorGetProofCosts = /*#__PURE__*/ createWriteContract({
  abi: delegatorAbi,
  address: delegatorAddress,
  functionName: 'getProofCosts',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"upgradeContracts"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const writeDelegatorUpgradeContracts = /*#__PURE__*/ createWriteContract(
  {
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'upgradeContracts',
  },
)

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"replacecontract"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const writeDelegatorReplacecontract = /*#__PURE__*/ createWriteContract({
  abi: delegatorAbi,
  address: delegatorAddress,
  functionName: 'replacecontract',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"revokeWithMainAddress"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const writeDelegatorRevokeWithMainAddress =
  /*#__PURE__*/ createWriteContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'revokeWithMainAddress',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"revokeWithMultiSig"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const writeDelegatorRevokeWithMultiSig =
  /*#__PURE__*/ createWriteContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'revokeWithMultiSig',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"recoverWithRecoveryAddress"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const writeDelegatorRecoverWithRecoveryAddress =
  /*#__PURE__*/ createWriteContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'recoverWithRecoveryAddress',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"recoverWithMultiSig"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const writeDelegatorRecoverWithMultiSig =
  /*#__PURE__*/ createWriteContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'recoverWithMultiSig',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"getVoteCount"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const writeDelegatorGetVoteCount = /*#__PURE__*/ createWriteContract({
  abi: delegatorAbi,
  address: delegatorAddress,
  functionName: 'getVoteCount',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"burnFees"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const writeDelegatorBurnFees = /*#__PURE__*/ createWriteContract({
  abi: delegatorAbi,
  address: delegatorAddress,
  functionName: 'burnFees',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"setVerusData"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const writeDelegatorSetVerusData = /*#__PURE__*/ createWriteContract({
  abi: delegatorAbi,
  address: delegatorAddress,
  functionName: 'setVerusData',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link delegatorAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const simulateDelegator = /*#__PURE__*/ createSimulateContract({
  abi: delegatorAbi,
  address: delegatorAddress,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"onERC1155BatchReceived"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const simulateDelegatorOnErc1155BatchReceived =
  /*#__PURE__*/ createSimulateContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'onERC1155BatchReceived',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"onERC1155Received"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const simulateDelegatorOnErc1155Received =
  /*#__PURE__*/ createSimulateContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'onERC1155Received',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"onERC721Received"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const simulateDelegatorOnErc721Received =
  /*#__PURE__*/ createSimulateContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'onERC721Received',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"sendTransfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const simulateDelegatorSendTransfer =
  /*#__PURE__*/ createSimulateContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'sendTransfer',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"sendTransferDirect"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const simulateDelegatorSendTransferDirect =
  /*#__PURE__*/ createSimulateContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'sendTransferDirect',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"submitImports"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const simulateDelegatorSubmitImports =
  /*#__PURE__*/ createSimulateContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'submitImports',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"getReadyExportsByRange"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const simulateDelegatorGetReadyExportsByRange =
  /*#__PURE__*/ createSimulateContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'getReadyExportsByRange',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"setLatestData"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const simulateDelegatorSetLatestData =
  /*#__PURE__*/ createSimulateContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'setLatestData',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"launchContractTokens"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const simulateDelegatorLaunchContractTokens =
  /*#__PURE__*/ createSimulateContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'launchContractTokens',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"getTokenList"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const simulateDelegatorGetTokenList =
  /*#__PURE__*/ createSimulateContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'getTokenList',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"claimfees"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const simulateDelegatorClaimfees = /*#__PURE__*/ createSimulateContract({
  abi: delegatorAbi,
  address: delegatorAddress,
  functionName: 'claimfees',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"claimRefund"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const simulateDelegatorClaimRefund =
  /*#__PURE__*/ createSimulateContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'claimRefund',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"sendfees"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const simulateDelegatorSendfees = /*#__PURE__*/ createSimulateContract({
  abi: delegatorAbi,
  address: delegatorAddress,
  functionName: 'sendfees',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"getProof"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const simulateDelegatorGetProof = /*#__PURE__*/ createSimulateContract({
  abi: delegatorAbi,
  address: delegatorAddress,
  functionName: 'getProof',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"getProofCosts"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const simulateDelegatorGetProofCosts =
  /*#__PURE__*/ createSimulateContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'getProofCosts',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"upgradeContracts"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const simulateDelegatorUpgradeContracts =
  /*#__PURE__*/ createSimulateContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'upgradeContracts',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"replacecontract"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const simulateDelegatorReplacecontract =
  /*#__PURE__*/ createSimulateContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'replacecontract',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"revokeWithMainAddress"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const simulateDelegatorRevokeWithMainAddress =
  /*#__PURE__*/ createSimulateContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'revokeWithMainAddress',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"revokeWithMultiSig"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const simulateDelegatorRevokeWithMultiSig =
  /*#__PURE__*/ createSimulateContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'revokeWithMultiSig',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"recoverWithRecoveryAddress"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const simulateDelegatorRecoverWithRecoveryAddress =
  /*#__PURE__*/ createSimulateContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'recoverWithRecoveryAddress',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"recoverWithMultiSig"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const simulateDelegatorRecoverWithMultiSig =
  /*#__PURE__*/ createSimulateContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'recoverWithMultiSig',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"getVoteCount"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const simulateDelegatorGetVoteCount =
  /*#__PURE__*/ createSimulateContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'getVoteCount',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"burnFees"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const simulateDelegatorBurnFees = /*#__PURE__*/ createSimulateContract({
  abi: delegatorAbi,
  address: delegatorAddress,
  functionName: 'burnFees',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"setVerusData"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const simulateDelegatorSetVerusData =
  /*#__PURE__*/ createSimulateContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'setVerusData',
  })

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link delegatorAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useReadDelegator = /*#__PURE__*/ createUseReadContract({
  abi: delegatorAbi,
  address: delegatorAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"_readyExports"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useReadDelegatorReadyExports = /*#__PURE__*/ createUseReadContract(
  {
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: '_readyExports',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"bestForks"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useReadDelegatorBestForks = /*#__PURE__*/ createUseReadContract({
  abi: delegatorAbi,
  address: delegatorAddress,
  functionName: 'bestForks',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"bridgeConverterActive"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useReadDelegatorBridgeConverterActive =
  /*#__PURE__*/ createUseReadContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'bridgeConverterActive',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"cceLastEndHeight"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useReadDelegatorCceLastEndHeight =
  /*#__PURE__*/ createUseReadContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'cceLastEndHeight',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"cceLastStartHeight"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useReadDelegatorCceLastStartHeight =
  /*#__PURE__*/ createUseReadContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'cceLastStartHeight',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"claimableFees"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useReadDelegatorClaimableFees =
  /*#__PURE__*/ createUseReadContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'claimableFees',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"contracts"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useReadDelegatorContracts = /*#__PURE__*/ createUseReadContract({
  abi: delegatorAbi,
  address: delegatorAddress,
  functionName: 'contracts',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"exportHeights"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useReadDelegatorExportHeights =
  /*#__PURE__*/ createUseReadContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'exportHeights',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"lastImportInfo"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useReadDelegatorLastImportInfo =
  /*#__PURE__*/ createUseReadContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'lastImportInfo',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"lastTxIdImport"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useReadDelegatorLastTxIdImport =
  /*#__PURE__*/ createUseReadContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'lastTxIdImport',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"notaries"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useReadDelegatorNotaries = /*#__PURE__*/ createUseReadContract({
  abi: delegatorAbi,
  address: delegatorAddress,
  functionName: 'notaries',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"notaryAddressMapping"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useReadDelegatorNotaryAddressMapping =
  /*#__PURE__*/ createUseReadContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'notaryAddressMapping',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useReadDelegatorOwner = /*#__PURE__*/ createUseReadContract({
  abi: delegatorAbi,
  address: delegatorAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"processedTxids"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useReadDelegatorProcessedTxids =
  /*#__PURE__*/ createUseReadContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'processedTxids',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"refunds"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useReadDelegatorRefunds = /*#__PURE__*/ createUseReadContract({
  abi: delegatorAbi,
  address: delegatorAddress,
  functionName: 'refunds',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"rollingUpgradeVotes"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useReadDelegatorRollingUpgradeVotes =
  /*#__PURE__*/ createUseReadContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'rollingUpgradeVotes',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"rollingVoteIndex"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useReadDelegatorRollingVoteIndex =
  /*#__PURE__*/ createUseReadContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'rollingVoteIndex',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"saltsUsed"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useReadDelegatorSaltsUsed = /*#__PURE__*/ createUseReadContract({
  abi: delegatorAbi,
  address: delegatorAddress,
  functionName: 'saltsUsed',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"storageGlobal"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useReadDelegatorStorageGlobal =
  /*#__PURE__*/ createUseReadContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'storageGlobal',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useReadDelegatorSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"tokenList"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useReadDelegatorTokenList = /*#__PURE__*/ createUseReadContract({
  abi: delegatorAbi,
  address: delegatorAddress,
  functionName: 'tokenList',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"verusToERC20mapping"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useReadDelegatorVerusToErc20mapping =
  /*#__PURE__*/ createUseReadContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'verusToERC20mapping',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"checkImport"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useReadDelegatorCheckImport = /*#__PURE__*/ createUseReadContract({
  abi: delegatorAbi,
  address: delegatorAddress,
  functionName: 'checkImport',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link delegatorAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useWriteDelegator = /*#__PURE__*/ createUseWriteContract({
  abi: delegatorAbi,
  address: delegatorAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"onERC1155BatchReceived"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useWriteDelegatorOnErc1155BatchReceived =
  /*#__PURE__*/ createUseWriteContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'onERC1155BatchReceived',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"onERC1155Received"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useWriteDelegatorOnErc1155Received =
  /*#__PURE__*/ createUseWriteContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'onERC1155Received',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"onERC721Received"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useWriteDelegatorOnErc721Received =
  /*#__PURE__*/ createUseWriteContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'onERC721Received',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"sendTransfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useWriteDelegatorSendTransfer =
  /*#__PURE__*/ createUseWriteContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'sendTransfer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"sendTransferDirect"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useWriteDelegatorSendTransferDirect =
  /*#__PURE__*/ createUseWriteContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'sendTransferDirect',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"submitImports"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useWriteDelegatorSubmitImports =
  /*#__PURE__*/ createUseWriteContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'submitImports',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"getReadyExportsByRange"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useWriteDelegatorGetReadyExportsByRange =
  /*#__PURE__*/ createUseWriteContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'getReadyExportsByRange',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"setLatestData"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useWriteDelegatorSetLatestData =
  /*#__PURE__*/ createUseWriteContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'setLatestData',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"launchContractTokens"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useWriteDelegatorLaunchContractTokens =
  /*#__PURE__*/ createUseWriteContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'launchContractTokens',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"getTokenList"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useWriteDelegatorGetTokenList =
  /*#__PURE__*/ createUseWriteContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'getTokenList',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"claimfees"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useWriteDelegatorClaimfees = /*#__PURE__*/ createUseWriteContract({
  abi: delegatorAbi,
  address: delegatorAddress,
  functionName: 'claimfees',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"claimRefund"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useWriteDelegatorClaimRefund =
  /*#__PURE__*/ createUseWriteContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'claimRefund',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"sendfees"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useWriteDelegatorSendfees = /*#__PURE__*/ createUseWriteContract({
  abi: delegatorAbi,
  address: delegatorAddress,
  functionName: 'sendfees',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"getProof"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useWriteDelegatorGetProof = /*#__PURE__*/ createUseWriteContract({
  abi: delegatorAbi,
  address: delegatorAddress,
  functionName: 'getProof',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"getProofCosts"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useWriteDelegatorGetProofCosts =
  /*#__PURE__*/ createUseWriteContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'getProofCosts',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"upgradeContracts"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useWriteDelegatorUpgradeContracts =
  /*#__PURE__*/ createUseWriteContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'upgradeContracts',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"replacecontract"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useWriteDelegatorReplacecontract =
  /*#__PURE__*/ createUseWriteContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'replacecontract',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"revokeWithMainAddress"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useWriteDelegatorRevokeWithMainAddress =
  /*#__PURE__*/ createUseWriteContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'revokeWithMainAddress',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"revokeWithMultiSig"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useWriteDelegatorRevokeWithMultiSig =
  /*#__PURE__*/ createUseWriteContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'revokeWithMultiSig',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"recoverWithRecoveryAddress"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useWriteDelegatorRecoverWithRecoveryAddress =
  /*#__PURE__*/ createUseWriteContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'recoverWithRecoveryAddress',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"recoverWithMultiSig"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useWriteDelegatorRecoverWithMultiSig =
  /*#__PURE__*/ createUseWriteContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'recoverWithMultiSig',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"getVoteCount"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useWriteDelegatorGetVoteCount =
  /*#__PURE__*/ createUseWriteContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'getVoteCount',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"burnFees"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useWriteDelegatorBurnFees = /*#__PURE__*/ createUseWriteContract({
  abi: delegatorAbi,
  address: delegatorAddress,
  functionName: 'burnFees',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"setVerusData"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useWriteDelegatorSetVerusData =
  /*#__PURE__*/ createUseWriteContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'setVerusData',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link delegatorAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useSimulateDelegator = /*#__PURE__*/ createUseSimulateContract({
  abi: delegatorAbi,
  address: delegatorAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"onERC1155BatchReceived"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useSimulateDelegatorOnErc1155BatchReceived =
  /*#__PURE__*/ createUseSimulateContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'onERC1155BatchReceived',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"onERC1155Received"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useSimulateDelegatorOnErc1155Received =
  /*#__PURE__*/ createUseSimulateContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'onERC1155Received',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"onERC721Received"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useSimulateDelegatorOnErc721Received =
  /*#__PURE__*/ createUseSimulateContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'onERC721Received',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"sendTransfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useSimulateDelegatorSendTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'sendTransfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"sendTransferDirect"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useSimulateDelegatorSendTransferDirect =
  /*#__PURE__*/ createUseSimulateContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'sendTransferDirect',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"submitImports"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useSimulateDelegatorSubmitImports =
  /*#__PURE__*/ createUseSimulateContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'submitImports',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"getReadyExportsByRange"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useSimulateDelegatorGetReadyExportsByRange =
  /*#__PURE__*/ createUseSimulateContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'getReadyExportsByRange',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"setLatestData"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useSimulateDelegatorSetLatestData =
  /*#__PURE__*/ createUseSimulateContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'setLatestData',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"launchContractTokens"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useSimulateDelegatorLaunchContractTokens =
  /*#__PURE__*/ createUseSimulateContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'launchContractTokens',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"getTokenList"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useSimulateDelegatorGetTokenList =
  /*#__PURE__*/ createUseSimulateContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'getTokenList',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"claimfees"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useSimulateDelegatorClaimfees =
  /*#__PURE__*/ createUseSimulateContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'claimfees',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"claimRefund"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useSimulateDelegatorClaimRefund =
  /*#__PURE__*/ createUseSimulateContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'claimRefund',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"sendfees"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useSimulateDelegatorSendfees =
  /*#__PURE__*/ createUseSimulateContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'sendfees',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"getProof"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useSimulateDelegatorGetProof =
  /*#__PURE__*/ createUseSimulateContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'getProof',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"getProofCosts"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useSimulateDelegatorGetProofCosts =
  /*#__PURE__*/ createUseSimulateContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'getProofCosts',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"upgradeContracts"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useSimulateDelegatorUpgradeContracts =
  /*#__PURE__*/ createUseSimulateContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'upgradeContracts',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"replacecontract"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useSimulateDelegatorReplacecontract =
  /*#__PURE__*/ createUseSimulateContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'replacecontract',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"revokeWithMainAddress"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useSimulateDelegatorRevokeWithMainAddress =
  /*#__PURE__*/ createUseSimulateContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'revokeWithMainAddress',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"revokeWithMultiSig"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useSimulateDelegatorRevokeWithMultiSig =
  /*#__PURE__*/ createUseSimulateContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'revokeWithMultiSig',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"recoverWithRecoveryAddress"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useSimulateDelegatorRecoverWithRecoveryAddress =
  /*#__PURE__*/ createUseSimulateContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'recoverWithRecoveryAddress',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"recoverWithMultiSig"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useSimulateDelegatorRecoverWithMultiSig =
  /*#__PURE__*/ createUseSimulateContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'recoverWithMultiSig',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"getVoteCount"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useSimulateDelegatorGetVoteCount =
  /*#__PURE__*/ createUseSimulateContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'getVoteCount',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"burnFees"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useSimulateDelegatorBurnFees =
  /*#__PURE__*/ createUseSimulateContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'burnFees',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link delegatorAbi}__ and `functionName` set to `"setVerusData"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x71518580f36feceffe0721f06ba4703218cd7f63)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb)
 */
export const useSimulateDelegatorSetVerusData =
  /*#__PURE__*/ createUseSimulateContract({
    abi: delegatorAbi,
    address: delegatorAddress,
    functionName: 'setVerusData',
  })
