import {toast} from 'sonner'
import {erc20Abi} from 'viem'
import {
  getChainId,
  getChains,
  readContract,
  simulateContract,
  writeContract,
} from 'wagmi/actions'

import {ETHaddress} from '@/config/constants'
import {config} from '@/config/wagmi'
import warnToast from '@/components/shared/warnToast'

import {useDelegatorAddress} from '../hooks/delegator/useDelegatorAddress'

const ten = BigInt('10')
const maxGas2 = BigInt('100000')

const AuthorizeTokenAmount = async ({
  fromToken,
  amount,
  account,
}: {
  fromToken: FromList
  amount: string
  account: `0x${string}`
}) => {
  const chainId = getChainId(config)
  const chains = getChains(config)
  const delegatorAddr = useDelegatorAddress(chainId)

  if (fromToken.erc20address === ETHaddress) {
    return true
  }

  const chainName = chains[chainId].name
  warnToast(
    `Metamask will now pop up to allow the Verus Bridge Contract to spend ${amount} (${fromToken.label}) from your ${chainName} balance.`
  )
  let tokenAddress: `0x${string}`
  let bigAmount = BigInt(0)
  try {
    const tokenDecimals = await readContract(config, {
      address: fromToken.erc20address as `0x${string}`,
      abi: erc20Abi,
      functionName: 'decimals',
    })
    const base = ten ** BigInt(tokenDecimals)
    const comps = amount.split('.')
    let whole: string | number | bigint = comps[0]
    let fraction: string | number | bigint = comps[1]
    if (!whole) {
      whole = '0'
    }
    if (!fraction) {
      fraction = '0'
    }

    while (fraction.length < tokenDecimals) {
      fraction += '0'
    }
    whole = BigInt(whole)
    fraction = BigInt(fraction)
    bigAmount = whole * base + fraction
    tokenAddress = fromToken.erc20address as `0x${string}`
  } catch (error) {
    toast.error('Something went wrong, try Again')
    return false
  }

  if (tokenAddress) {
    try {
      const contractConfig = await simulateContract(config, {
        address: tokenAddress,
        abi: erc20Abi,
        functionName: 'approve',
        args: [delegatorAddr, bigAmount],
        account,
        gas: maxGas2,
      })

      await writeContract(config, contractConfig.request)
      toast.success(
        `Your ${chainName} account has authorized the bridge to spend ${fromToken.label} token, the amount: ${amount}.\n Next, after this window please check the amount in your wallet is what you wish to send.`,
        {duration: 10000}
      )
      return true
    } catch (error: any) {
      if (error?.message.includes('User denied transaction')) {
        toast.error(
          'Authorizing ERC20 token spend failed, you must authorize for conversion'
        )
      } else if (error?.message.include('insufficient funds')) {
        toast.error(
          'Authorizing ERC20 token spend failed, please check your balance.'
        )
      } else {
        toast.error(
          'An error occurred while processing the authorization of this transaction.'
        )
      }

      return false
    }
  }
  toast.error('Something went wrong, try again.')
  return false
}

export default AuthorizeTokenAmount