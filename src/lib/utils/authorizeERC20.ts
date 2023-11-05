'use client'

import {toast} from 'sonner'
import {erc20ABI} from 'wagmi'
import {fetchToken, prepareWriteContract, writeContract} from 'wagmi/actions'

import warnToast from '@/components/shared/warnToast'

import type {Chain} from 'wagmi'

const ten = BigInt('10')
const maxGas2 = BigInt('100000')
export const AuthorizeTokenAmount = async ({
  token,
  amount,
  chain,
  delegatorAddr,
  account,
}: {
  token: TokenList
  amount: string
  chain: Chain
  delegatorAddr: `0x${string}`
  account?: `0x${string}`
}) => {
  warnToast(
    `Metamask will now pop up to allow the Verus Bridge Contract to spend ${amount} (${token.label}) from your ${chain?.name} balance.`
  )

  let tokenAddress: `0x${string}`
  let bigAmount = BigInt(0)
  try {
    const tokenInstContract = await fetchToken({
      address: token.erc20address as `0x${string}`,
    })
    const decimals = tokenInstContract.decimals
    const base = ten ** BigInt(decimals)
    const comps = amount.split('.')

    let whole: string | number | bigint = comps[0]
    let fraction: string | number | bigint = comps[1]
    if (!whole) {
      whole = '0'
    }
    if (!fraction) {
      fraction = '0'
    }

    while (fraction.length < decimals) {
      fraction += '0'
    }
    whole = BigInt(whole)
    fraction = BigInt(fraction)
    bigAmount = whole * base + fraction
    tokenAddress = tokenInstContract.address
  } catch (error) {
    toast.error('Something went wrong, try Again')
    return false
  }
  //Seperated the two try/catch to ensure what is being done are seperated
  if (tokenAddress) {
    try {
      const config = await prepareWriteContract({
        address: tokenAddress,
        abi: erc20ABI,
        functionName: 'approve',
        args: [delegatorAddr, bigAmount],
        account,
        gas: maxGas2,
      })
      await writeContract(config)
      toast.success(
        `Your ${chain?.name} account has authorized the bridge to spend ${token.label} token, the amount: ${amount}.\n Next, after this window please check the amount in your wallet is what you wish to send.`,
        {duration: 10000}
      )
      return true
    } catch (error) {
      toast.error(
        'Authorizing ERC20 Token Spend Failed, please check your balance.'
      )
      return false
    }
  } else {
    toast.error('Something went wrong, try again.')
    return false
  }
}
