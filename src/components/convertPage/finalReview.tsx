'use client';

import {useQueryClient} from '@tanstack/react-query'
import BigNumber from 'bignumber.js'
import {toast} from 'sonner'

import {useDelgatorContract} from '@/lib/hooks/contract'
import {Icons} from '@/components/shared/icons'

import FinalConvertWarn from './fields/finalconvertWarn'

interface FinalProps extends TxConfigType {
  setHash: (hash: `0x${string}`) => void
  closeModal: () => void
  account: `0x${string}`
}

const maxGas = 1000000
const FinalReview = (props: FinalProps) => {
  const {
    formValues,
    CReserveTransfer: cr,
    fee,
    account,
    setHash,
    closeModal,
  } = props
  let cRate = '0'
  const qQuery = useQueryClient()
  let qFetch: {value: string; destination: string}
  if (!formValues.sendOnly) {
    qFetch = qQuery
      .getQueryCache()
      .findAll([
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
  const contract = useDelgatorContract()

  const confirmSubmit = async () => {
    const timeoutDuration = 240000 // 240 seconds

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error('Transaction timeout exceeded.'))
      }, timeoutDuration)
    })

    const txResult = await contract.sendTransfer(cr, {
      from: account,
      gasLimit: maxGas.toString(),
      value: fee,
    })

    setHash(txResult.hash)
    const promiseRace = await Promise.race([txResult.wait(), timeoutPromise])
    if (promiseRace instanceof Error) {
      toast.error('Transaction timed out')
    }
    closeModal()
  }
  return (
    <div className="flex flex-col space-y-1">
      <div className="flex-col space-y-2 rounded-lg bg-[#DDD] p-4">
        <div className="flex flex-col items-center justify-between gap-1 md:flex-row">
          <p className=" px-3 text-2xl">{formValues.fromAmount.toString()}</p>
          <p className=" px-3 text-2xl">{formValues.fromToken.value}</p>
        </div>
      </div>
      <div className="relative">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 items-center justify-center rounded-full border-4 border-[#FFF] bg-[#ddd] p-[3px] text-center align-middle">
          <Icons.arrowDown className="h-4 w-4 text-[#969696]" />
        </div>
      </div>
      <div className="flex-col space-y-2 rounded-lg bg-[#DDD] p-4">
        <div className="flex flex-col items-center justify-between gap-1 md:flex-row">
          {formValues.sendOnly ? (
            <>
              <p className=" px-3 text-2xl">Sending</p>
              <p className=" px-3 text-2xl">
                {formValues.fromAmount.toString()} {formValues.toToken.currency}
              </p>
            </>
          ) : (
            <>
              <p className=" px-3 text-2xl">{cRate}</p>
              <p className=" px-3 text-2xl">{formValues.toToken.currency}</p>
            </>
          )}
        </div>
      </div>
      <div className=" flex items-center justify-between rounded-lg border border-gray-600 px-5 py-4 text-sm md:text-base">
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
              }).format(Number(formValues.gasPrice))}
            </>
          )}
        </span>
      </div>
      {!formValues.sendOnly && (
        <div className="flex-col space-y-2 rounded-lg bg-[#DDD] p-4">
          <div className="flex flex-col items-center justify-between gap-1 md:flex-row">
            <p className="w-full ">Current ${qFetch.destination} information</p>
            <div className="w-full items-center justify-between">
              <p className=" px-3 text-2xl">ETH in reserves</p>
              <p className=" px-3 text-2xl">X ETH</p>
            </div>
            <div className="w-full items-center justify-between">
              <p className=" px-3 text-2xl">${qFetch.destination} supply</p>
              <p className=" px-3 text-2xl">200,xxx</p>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col">
        <p>Receiving address</p>
        <div className=" flex items-center justify-between rounded-lg border border-gray-600 px-5 py-4 text-sm md:text-base">
          <p className=" px-3 text-2xl">{formValues.toAddress}</p>
        </div>
      </div>
      <FinalConvertWarn />
      <button
        onClick={() => confirmSubmit()}
        className="flex w-full items-center justify-center rounded-lg bg-bluePrimary px-4 py-3 text-center font-geo text-base font-normal text-white disabled:bg-[#969696] md:text-lg"
      >
        {formValues.sendOnly ? 'Confirm Send' : 'Confirm conversion'}
      </button>
    </div>
  )
}

export default FinalReview