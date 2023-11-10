'use client'

import React, {useEffect} from 'react'
import {
  delegatorABI,
  delegatorConfig,
  useDelegatorSendTransfer,
  usePrepareDelegatorSendTransfer,
} from '@/generated'
import {toast} from 'sonner'
import {
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWalletClient,
} from 'wagmi'

import {maxGas} from '@/config/constants'
import {DelegatorAbi} from '@/lib/hooks/delegator'
import {useContract} from '@/lib/hooks/getContract'
import {useIsMounted} from '@/lib/hooks/mounted'
import {DelegatorAddress, NetworkChain} from '@/lib/hooks/network'
import {ethers} from 'ethers'

// const initConfig: TxConfigType = {
//   CReserveTransfer: {
//     version: 1,
//     currencyvalue: {
//       currency: '0x67460C2f56774eD27EeB8685f29f6CEC0B090B00',
//       amount: BigInt('10000000'),
//     },
//     flags: 3,
//     feecurrencyid: '0x67460C2f56774eD27EeB8685f29f6CEC0B090B00',
//     fees: BigInt('300000'),
//     destination: {
//       destinationtype: 201,
//       destinationaddress:
//         '0x1B4AA0EB4539D282357299e3cf9519d9C2de071C67460C2f56774eD27EeB8685f29f6CEC0B090B00000000000000000000000000000000000000000040420f00000000000116021439ff289021bab2fa64126947711c1bea46334b97',
//     },
//     destcurrencyid: '0xffEce948b8A38bBcC813411D2597f7f8485a0689',
//     destsystemid: '0x0000000000000000000000000000000000000000',
//     secondreserveid: '0x0000000000000000000000000000000000000000',
//   },
//   fee: 0n,
// }

// const {config, refetch} = usePrepareDelegatorSendTransfer({
//   address: delegatorAddr,
//   chainId: 5,
//   account: '0x1B4AA0EB4539D282357299e3cf9519d9C2de071C',
//   args: [initConfig.CReserveTransfer],
//   value: initConfig.fee,
//   gas: BigInt(maxGas),
// })
// // const [config, setConfig] = useState()

// const {data, write} = useDelegatorSendTransfer(config)
// useEffect(() => {
//   refetch()
// }, [refetch, txConfig])
// useEffect(() => {
//   console.log(config)
// }, [config])
interface FinalProps extends TxConfigType {
  setHash: (hash: string) => void
  account: `0x${string}`
  chain: number
}
const FinalReview = (props: FinalProps) => {
  const {formValues, CReserveTransfer: cr, fee, account, chain} = props
  const walletconnect = useWalletClient()
  const delegatorAddr = DelegatorAddress()
  const contract = new ethers.Contract(delegatorAddr, delegatorABI, walletconnect)
  const newSubmit = async()=>{
    const tx = await contract.sendTransfer(cr, {from:account, value:BigInt(fee)})
    console.log(tx)
  }
  return <div><button onClick={()=>newSubmit()}>test</button></div>
}

export default FinalReview
