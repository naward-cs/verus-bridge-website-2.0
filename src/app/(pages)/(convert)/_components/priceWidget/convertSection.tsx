'use client'

import React, {useState} from 'react'
import {Select, SelectItem} from '@nextui-org/react'

import {useWidgetData} from '@/lib/hooks/web/useWidgetData'
import {CoinLogo} from '@/components/shared/coinLogo'

import type {SelectedItems, Selection} from '@nextui-org/react'

const bridgeList = [
  {label: 'Bridge.vETH', currency: 'VBRID'},
  {label: 'Bridge.vARRR', currency: 'vARRR'},
  {label: 'Pure', currency: 'PURE'},
  {label: 'Switch', currency: 'SWITCH'},
]

const ConvertSection = () => {
  const [fromValue, setFromValue] = useState<Selection>(
    new Set(['Bridge.vETH'])
  )
  const [toValue, setToValue] = useState<Selection>(new Set([]))
  const fromValueId = Object.values(fromValue)[0]?.toString()
  const toValueId = Object.values(toValue)[0]?.toString()

  const {data: bridgeInfo, isLoading} = useWidgetData(
    fromValueId || 'Bridge.vETH'
  )
  const tokenList = Object.values(
    bridgeInfo?.list || {}
  ) as unknown as TokenList[]

  let rate
  if (bridgeInfo?.currencyPrices && toValueId) {
    rate = bridgeInfo.currencyPrices[toValueId].viaconversionprice || undefined
  }

  return (
    <div className="flex min-w-64 flex-col gap-2">
      <Select
        items={bridgeList}
        variant="bordered"
        placeholder="Select bridge"
        selectedKeys={fromValue}
        aria-label="Select Bridge"
        className="max-w-[252px]"
        classNames={{
          trigger:
            'bg-white h-12 data-[hover=true]:border-default-200 data-[open=true]:border-default-200 data-[focus=true]:border-default-200',
        }}
        onChange={() => setToValue(new Set([]))}
        onSelectionChange={setFromValue}
        renderValue={(
          tokens: SelectedItems<{label: string; currency: string}>
        ) => {
          return tokens.map((token) => (
            <div key={token.key} className="flex items-center gap-2">
              <CoinLogo symbol={token!.data!.currency} iAddr={'0x11'} />
              {token!.data!.label}
            </div>
          ))
        }}
      >
        {(token) => (
          <SelectItem key={token.label} textValue={token.label}>
            <div className="flex items-center gap-2 ">
              <CoinLogo symbol={token.currency} iAddr={'0x11'} />
              {token.label}
            </div>
          </SelectItem>
        )}
      </Select>
      <div className="flex items-center justify-between">
        <p className=" text-sm text-[#565656]">
          Price {rate && <span className="font-medium">{rate.toFixed(4)}</span>}
        </p>

        <Select
          items={Object.values(tokenList)}
          variant="bordered"
          placeholder="Select Token"
          aria-label="Select Token"
          selectedKeys={toValue}
          isLoading={isLoading}
          className="max-w-[142px]"
          classNames={{
            trigger:
              'bg-[#DDDDDD] h-10 data-[hover=true]:border-default-200 data-[open=true]:border-default-200 data-[focus=true]:border-default-200',
          }}
          onSelectionChange={setToValue}
          renderValue={(tokens: SelectedItems<TokenList>) => {
            return tokens.map((token) => (
              <div key={token.key} className="flex items-center gap-2 text-xs">
                <CoinLogo
                  size={20}
                  symbol={token!.data!.value}
                  iAddr={'0x11'}
                />
                {token!.data!.label}
              </div>
            ))
          }}
        >
          {(token) => (
            <SelectItem key={token.id} textValue={token.id}>
              <div className="flex items-center gap-2 text-xs">
                <CoinLogo size={20} symbol={token.value} iAddr={'0x11'} />
                {token.label}
              </div>
            </SelectItem>
          )}
        </Select>
      </div>
    </div>
  )
}

export default ConvertSection
