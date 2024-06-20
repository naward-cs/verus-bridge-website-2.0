'use client'

import React from 'react'
import {ModalBody, ModalHeader} from '@nextui-org/react'
import BigNumber from 'bignumber.js'

import {isETHAddress} from '@/lib/utils'
import {ToTokenName} from '@/lib/utils/correctTokenName'
import {CoinLogo} from '@/components/shared/coinLogo'
import {Icons} from '@/components/shared/icons'

import ConvertWarn from '../convertRow/convertWarn'
import {FinalConvertRate} from './finalConvertRate'
import FinalReviewInfo from './finalReviewInfo'
import FinalReviewInfoSendOnly from './finalReviewInfoSendOnly'

const FinalReview = ({
  formInfo,
  currencyRate,
  confirmSubmit,
}: {
  formInfo: ConvertFormData
  currencyRate?: string
  confirmSubmit: () => void
}) => {
  const {fromAmount, fromToken, toToken, toAddress, sendOnly} = formInfo
  const conversion =
    currencyRate && fromAmount
      ? new BigNumber(currencyRate)
          .times(new BigNumber(fromAmount.toString()))
          .decimalPlaces(5)
          .toString()
      : '0.00'
  const correctField = ToTokenName(toToken.label) || undefined
  //temp fix
  let tokenCurrency = toToken.currency
  if (correctField?.verusToken === 'VBRID') {
    tokenCurrency = correctField.verusToken
  }
  return (
    <>
      <ModalHeader className="text-sm font-normal">
        Confirm {sendOnly ? 'send' : 'conversion'}
      </ModalHeader>
      <ModalBody>
        <div className="flex flex-col space-y-1">
          <div className="flex-col space-y-2 rounded-lg bg-[#DDD] p-4">
            <div className="flex flex-col     ">
              <p className="text-sm">You send</p>
              <div className="flex items-center justify-between  gap-1">
                <p className="text-3xl font-medium">{fromAmount.toString()}</p>

                <div className="flex w-fit items-center rounded-lg bg-white p-0.5 pr-2">
                  <CoinLogo
                    symbol={fromToken.value}
                    iAddr={fromToken.erc20address.slice(2)}
                  />
                  <p className="text-xl font-medium">{fromToken.value}</p>
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
                  {sendOnly ? fromAmount.toString() : conversion}
                </p>

                <div className="flex w-fit items-center rounded-lg bg-white p-0.5 pr-2">
                  <CoinLogo
                    symbol={toToken.currency}
                    iAddr={toToken.iaddress}
                  />
                  <p className=" text-xl font-medium">
                    {isETHAddress(toAddress)
                      ? correctField?.ethToken || tokenCurrency
                      : correctField?.verusToken || tokenCurrency}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <FinalConvertRate
            fromToken={fromToken}
            toToken={toToken}
            toAddress={toAddress}
          />
          {!sendOnly && <ConvertWarn />}
          <div className="pb-4 pt-2">
            {sendOnly ? <FinalReviewInfoSendOnly /> : <FinalReviewInfo />}
          </div>
          <div className="flex flex-col">
            <p className="my-1 pl-0.5 text-xs text-[#686868] ">
              Receiving address
            </p>
            <div className=" flex  rounded-lg border border-[#999] bg-[#ddd] py-4 text-sm md:text-base">
              <p className="break-all px-3 text-sm font-medium">{toAddress}</p>
            </div>
          </div>

          <div className="pb-4">
            <button
              type="button"
              onClick={() => {
                confirmSubmit()
              }}
              className="flex h-[60px] w-full items-center justify-center rounded-lg bg-bluePrimary text-center text-base font-medium text-white disabled:bg-[#969696] md:text-lg"
            >
              {sendOnly ? 'Send' : 'Convert'}
            </button>
          </div>
        </div>
      </ModalBody>
    </>
  )
}

export default FinalReview
