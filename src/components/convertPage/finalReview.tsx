import React from 'react'
import {
  useDelegatorSendTransfer,
  usePrepareDelegatorSendTransfer,
} from '@/generated'
import {
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
} from 'wagmi'

import {maxGas} from '@/config/constants'
import {DelegatorAbi} from '@/lib/hooks/delegator'
import {DelegatorAddress, NetworkChain} from '@/lib/hooks/network'

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
}
const FinalReview = (props: FinalProps) => {
  const {address: account} = useAccount()
  const chain = NetworkChain()
  const {formValues, CReserveTransfer: cr, fee} = props

  // const {data, write} = useDelegatorSendTransfer({
  //   address: delegatorAddr,
  //   account,
  //   args: [cr],
  //   value: fee,
  //   gas: BigInt(maxGas),
  // })
  const {config} = usePrepareDelegatorSendTransfer({
    account,
    chainId: chain,
    args: [
      {
        version: cr.version,
        currencyvalue: {
          currency: cr.currencyvalue.currency,
          amount: BigInt(cr.currencyvalue.amount),
        },
        flags: cr.flags,
        feecurrencyid: cr.feecurrencyid,
        fees: BigInt(cr.fees),
        destination: {
          destinationtype: cr.destination.destinationtype,
          destinationaddress: cr.destination.destinationaddress,
        },
        destcurrencyid: cr.destcurrencyid,
        destsystemid: cr.destsystemid,
        secondreserveid: cr.secondreserveid,
      },
    ],
    value: BigInt(fee),
    gas: BigInt(maxGas),
  })
  // const {config} = usePrepareContractWrite({
  //   address: delegatorAddr,
  //   abi: DelegatorAbi,
  //   functionName: 'sendTransfer',
  //   account,
  //   args: [cr],
  //   value: fee,
  //   gas: BigInt(maxGas),
  // })
  const {data, write} = useContractWrite(config)
  return (
    <div>
      FinalReview{' '}
      <button
        disabled={!write}
        onClick={() => write?.()}
        className="bg-blue-400 disabled:bg-slate-400"
      >
        write
      </button>
      <p>{data?.hash}</p>
    </div>
  )
}

export default FinalReview
