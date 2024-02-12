'use client';

import { useState } from 'react';
import { Link, ModalBody, ModalHeader, Spinner } from '@nextui-org/react';
import { useQueryClient } from '@tanstack/react-query';
import BigNumber from 'bignumber.js';
import { toast } from 'sonner';
import { formatEther } from 'viem';
import { useWaitForTransaction } from 'wagmi';



import { ETH_FEES } from '@/config/constants';
import { useDelgatorContract } from '@/lib/hooks/contract';
import { EtherScan } from '@/lib/hooks/etherScan';
import { isETHAddress } from '@/lib/utils/rules';
import CoinLogos from '@/components/shared/coinLogos';
import { Icons } from '@/components/shared/icons';



import ConvertWarn from './fields/convertWarn';
import FinalReviewInfo from './finalReviewInfo'
import FinalReviewInfoSendOnly from './finalReviewInfoSendOnly'





interface FinalProps extends TxConfigType {
  account: `0x${string}`
  onClose: () => void
  setStatus: React.Dispatch<React.SetStateAction<'completed' | 'failed' | null>>
}

const maxGas = 1000000
const FinalReview = (props: FinalProps) => {
  const {
    formValues,
    CReserveTransfer: cr,
    fee,
    account,
    onClose,
    setStatus,
  } = props
  const etherScan = EtherScan()
  const [pending, setPending] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [txError, setTxError] = useState(false)
  const [pendingTx, setPendingTx] = useState(false)
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
      setStatus('completed')
      setTimeout(() => {
        // setTx(undefined)
        onClose()
      }, 10_000)
    },
    onError: () => {
      setTxError(true)
      setStatus('failed')
      toast.error('Something went wrong with transaction')
    },
  })
  const gasFetch = qQuery.find(['ETHmarket'])?.state.data as {
    [key: string]: any
  }

  let gasRate
  if (isETHAddress(formValues.toAddress)) {
    gasRate = new BigNumber(formatEther(BigInt(formValues.gasPrice.WEICOST)))
      .times(new BigNumber(gasFetch.market_data.current_price?.usd.toString()))
      .decimalPlaces(2)
      .toString()
  } else {
    gasRate = new BigNumber(ETH_FEES.ETH)
      .times(new BigNumber(gasFetch.market_data.current_price?.usd.toString()))
      .decimalPlaces(2)
      .toString()
  }

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
        setPendingTx(true)
        await txResult.wait()

        setTx(txResult.hash)
        setPendingTx(false)
      }
      // setTx(
      //   '0xee6a66a92f75436d19956fd7a20b7cdff5ff4b6ca0f96c645886615b8040b4a9'
      // )
      setPending(false)
    } catch (e:any) {
      // console.log(error as BaseError)
      if (e?.message.includes('User denied transaction')) {
        toast.error('Transaction Stopped: User denied the transaction.')
      } else if (e?.message) {
        toast.error(
          `An error occurred while processing the transaction: ${e.message}`
        )
      } else {
        toast.error(
          'An error occurred while processing the transaction.'
        )
      }
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
              Sending {formValues.fromToken.value} to the Verus blockchain
            </p>
          ) : (
            <p>
              Converting {formValues.fromToken.value} to {qFetch.destination}
            </p>
          )}
          <p className="text-sm text-[686868]">
            {pendingTx
              ? 'Processing transaction'
              : 'Confirm this transaction in your wallet'}
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
  if (tx) {
    return (
      <ModalBody>
        <div className="mb-6 flex flex-col items-center justify-center space-y-2 py-4">
          <p className="text-bluePrimary">
            <Icons.checkmark height={75} />
          </p>
          <p className="text-center text-2xl font-medium">
            Transaction submitted
          </p>

          <p className="text-center">
            Can take up to{' '}
            {isETHAddress(formValues.toAddress) ? '2 hours' : '45 minutes'} to
            complete
          </p>
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
      <ModalHeader className="text-sm font-normal">
        Confirm {formValues.sendOnly ? 'send' : 'conversion'}
      </ModalHeader>
      <ModalBody>
        <div className="flex flex-col space-y-1">
          <div className="flex-col space-y-2 rounded-lg bg-[#DDD] p-4">
            <div className="flex flex-col     ">
              <p className="text-sm">You send</p>
              <div className="flex items-center justify-between  gap-1">
                <p className="text-3xl font-medium">
                  {formValues.fromAmount.toString()}
                </p>

                <div className="flex w-fit items-center rounded-lg bg-white p-0.5 pr-2">
                  <CoinLogos
                    symbol={formValues.fromToken.value}
                    iAddr={formValues.fromToken.erc20address.slice(2)}
                  />
                  <p className=" text-xl font-medium">
                    {formValues.fromToken.value}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 items-center justify-center rounded-full border-4 border-[#FFF] bg-[#ddd] p-[3px] text-center align-middle">
              <Icons.arrowDown className="size-4 text-[#969696]" />
            </div>
          </div>
          <div className=" flex-col space-y-2 rounded-lg bg-[#DDD] p-4">
            <div className="flex flex-col  ">
              <p className="text-sm">You receive</p>
              <div className="flex items-center justify-between gap-1">
                <p className="text-3xl font-medium">
                  {formValues.sendOnly
                    ? formValues.fromAmount.toString()
                    : cRate}
                </p>

                <div className="flex w-fit items-center rounded-lg bg-white p-0.5 pr-2">
                  <CoinLogos
                    symbol={formValues.toToken.currency}
                    iAddr={formValues.toToken.iaddress}
                  />
                  <p className=" text-xl font-medium">
                    {formValues.toToken.currency}
                  </p>
                </div>
              </div>
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
                  <Icons.gas className="mr-1.5 size-6 text-[#A5A5A5]" />≈{' '}
                  {Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(Number(gasRate))}
                </>
              )}
            </span>
          </div>
          {!formValues.sendOnly && <ConvertWarn />}
          <div className="pb-4 pt-2">
            {formValues.sendOnly ? (
              <FinalReviewInfoSendOnly />
            ) : (
              <FinalReviewInfo {...formValues} />
            )}
          </div>
          <div className="flex flex-col">
            <p className="my-1 pl-0.5 text-xs text-[#686868] ">
              Receiving address
            </p>
            <div className=" flex  rounded-lg border border-[#999] bg-[#ddd] py-4 text-sm md:text-base">
              <p className="break-all px-3 text-sm font-medium">
                {formValues.toAddress}
              </p>
            </div>
          </div>

          <div className="pb-4">
            <button
              onClick={() => confirmSubmit()}
              className="flex h-[60px] w-full items-center justify-center rounded-lg bg-bluePrimary text-center text-base font-medium text-white disabled:bg-[#969696] md:text-lg"
            >
              {formValues.sendOnly ? 'Send' : 'Convert'}
            </button>
          </div>
        </div>
      </ModalBody>
    </>
  )
}

export default FinalReview