'use client';

import {useState} from 'react'
import {Link, ModalBody, ModalHeader, Spinner} from '@nextui-org/react'
import {useQueryClient} from '@tanstack/react-query'
import BigNumber from 'bignumber.js'
import {toast} from 'sonner'
import {formatEther} from 'viem'
import {useWaitForTransaction} from 'wagmi'

import {useDelgatorContract} from '@/lib/hooks/contract'
import {EtherScan} from '@/lib/hooks/etherScan'
import {Icons} from '@/components/shared/icons'

import ConvertTimeWarn from './fields/convertTimeWarn'
import FinalConvertWarn from './fields/finalconvertWarn'

interface FinalProps extends TxConfigType {
  account: `0x${string}`
}

const maxGas = 1000000
const FinalReview = (props: FinalProps) => {
  const {formValues, CReserveTransfer: cr, fee, account} = props
  const etherScan = EtherScan()
  const [pending, setPending] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [txError, setTxError] = useState(false)
  const [tx, setTx] = useState<`0x${string}` | undefined>(undefined)
  let cRate = '0'
  const qQuery = useQueryClient().getQueryCache()
  let qFetch: {value: string; destination: string}
  if (!formValues.sendOnly) {
    qFetch = qQuery.findAll([
      'convertRate',
      formValues.fromToken.value,
      formValues.toToken.value,
    ])[0].state.data as {value: string; destination: string}

    cRate = new BigNumber(qFetch.value)
      .times(new BigNumber(formValues.fromAmount as string))
      .decimalPlaces(5)
      .toString()
  } else {
    qFetch = {value: '0', destination: ''}
  }
  useWaitForTransaction({
    hash: tx,
    enabled: !!tx,
    timeout: 240_000, //4 minutes
    onReplaced(data) {
      toast(`Transaction change of ${data.reason}`)
    },
    onSuccess(data) {
      toast.success(`Transaction successful ${data.transactionHash}`)
      setTx(undefined)
    },
    onError: () => {
      setTxError(true)
      toast.error('Something went wrong with transaction')
    },
  })
  const gasFetch = qQuery.find(['ETHmarket'])?.state.data as {
    [key: string]: any
  }
  const gasRate = new BigNumber(
    gasFetch.market_data.current_price?.usd.toString()
  )
    .times(new BigNumber(formatEther(BigInt(formValues.gasPrice.WEICOST))))
    .decimalPlaces(2)
    .toString()

  const contract = useDelgatorContract()

  const confirmSubmit = async () => {
    setPending(true)

    try {
      const txResult = await contract.sendTransfer(cr, {
        from: account,
        gasLimit: maxGas.toString(),
        value: fee,
      })
      if (txResult) {
        await txResult.wait()
        setTx(txResult.hash)
      }
      setPending(false)
    } catch (e) {
      // console.log(error as BaseError)
      setTxError(true)

      setPending(false)
    }
    setCompleted(true)
  }
  if (!completed && pending) {
    return (
      <ModalBody>
        <div className="mb-6 flex flex-col items-center justify-center space-y-2 py-4">
          <Spinner size="lg" />
          <p className="text-center text-2xl font-medium">
            Waiting for confirmation
          </p>
          {formValues.sendOnly ? (
            <p className="break-all">
              Sending {formValues.fromToken.value} to Verus Chain
            </p>
          ) : (
            <p>
              Converting {formValues.fromToken.value} to {qFetch.destination}
            </p>
          )}
          <p className="text-sm text-[686868]">
            Confirm this transaction in your wallet
          </p>
        </div>
      </ModalBody>
    )
  }
  if (completed && txError) {
    return (
      <ModalBody>
        <div className="mb-6 flex flex-col items-center justify-center space-y-2 py-4">
          <p className="text-red-600">
            <Icons.errormark height={75} />
          </p>
          <p className="text-center text-2xl font-medium">Transaction error</p>
          {tx && (
            <>
              <p className="text-center">Transaction timed out</p>
              <Link
                size="sm"
                underline="always"
                isExternal
                href={etherScan + 'tx/' + tx}
              >
                View on explorer
              </Link>
            </>
          )}
        </div>
      </ModalBody>
    )
  }
  if (completed && tx) {
    return (
      <ModalBody>
        <div className="mb-6 flex flex-col items-center justify-center space-y-2 py-4">
          <p className="text-bluePrimary">
            <Icons.checkmark height={75} />
          </p>
          <p className="text-center text-2xl font-medium">
            Transaction submitted
          </p>

          <p className="text-center">Can take up to 45 minute to complete</p>
          <Link
            size="sm"
            underline="always"
            isExternal
            href={etherScan + 'tx/' + tx}
          >
            View on explorer
          </Link>
        </div>
      </ModalBody>
    )
  }
  return (
    <>
      {' '}
      <ModalHeader className="text-sm font-normal">
        Confirm conversion
      </ModalHeader>
      <ModalBody>
        <div className="flex flex-col space-y-1">
          <div className="flex-col space-y-2 rounded-lg bg-[#DDD] p-4">
            <div className="flex  items-center justify-between gap-1 ">
              <p className=" px-3 text-2xl">
                {formValues.fromAmount.toString()}
              </p>
              <p className=" px-3 text-2xl">{formValues.fromToken.value}</p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 items-center justify-center rounded-full border-4 border-[#FFF] bg-[#ddd] p-[3px] text-center align-middle">
              <Icons.arrowDown className="h-4 w-4 text-[#969696]" />
            </div>
          </div>
          <div className=" flex-col space-y-2 rounded-lg bg-[#DDD] p-4">
            <div className="flex  items-center justify-between gap-1">
              {formValues.sendOnly ? (
                <>
                  <p className=" px-3 text-2xl">Sending</p>
                  <p className=" px-3 text-2xl">
                    {formValues.fromAmount.toString()}{' '}
                    {formValues.toToken.currency}
                  </p>
                </>
              ) : (
                <>
                  <p className=" px-3 text-2xl">{cRate}</p>
                  <p className=" px-3 text-2xl">
                    {formValues.toToken.currency}
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-gray-600 px-5 py-4 text-sm md:text-base">
            <span>
              {cRate !== '0' && (
                <>
                  1 {qFetch.destination} ≈ {Number(cRate).toFixed(4)}{' '}
                  {formValues.fromToken.value}
                </>
              )}
            </span>
            <span className="flex">
              {formValues.gasPrice && (
                <>
                  <Icons.gas className="mr-1.5 h-6 w-6 text-[#A5A5A5]" />≈{' '}
                  {Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(Number(gasRate))}
                </>
              )}
            </span>
          </div>
          {/* {!formValues.sendOnly && (
        <div className="flex-col space-y-2 rounded-lg bg-[#DDD] p-4">
          <div className="flex flex-col items-center justify-between gap-1 ">
            <p className="w-full text-[#808080] ">
              Current {qFetch.destination} Information
            </p>
            <div className=" flex w-full items-center justify-between pr-3">
              <p>ETH in reserves</p>
              <p>X ETH</p>
            </div>
            <div className=" flex w-full items-center justify-between pr-3">
              <p>{qFetch.destination} supply</p>
              <p>200,xxx</p>
            </div>
          </div> 
        </div>
      )} */}
          <div className="flex flex-col py-2">
            <p className="my-1 text-xs text-[#686868] ">Receiving address</p>
            <div className=" flex items-center justify-between rounded-lg border border-gray-600 px-5 py-4 text-sm md:text-base">
              <p className="break-all px-3 text-2xl">{formValues.toAddress}</p>
            </div>
          </div>
          <div className=" space-y-2 ">
            <FinalConvertWarn />
            <ConvertTimeWarn />
          </div>
          <div className="py-4">
            <button
              onClick={() => confirmSubmit()}
              className="flex w-full items-center justify-center rounded-lg bg-bluePrimary px-4 py-3 text-center font-geo text-base font-normal text-white disabled:bg-[#969696] md:text-lg"
            >
              {formValues.sendOnly ? 'Confirm Send' : 'Confirm conversion'}
            </button>
          </div>
        </div>
      </ModalBody>
    </>
  )
}

export default FinalReview