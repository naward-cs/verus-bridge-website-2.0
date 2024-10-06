import {Select, SelectItem} from '@nextui-org/react'

import {useWidgetData} from '@/lib/hooks/web/useWidgetData'
import {CoinLogo} from '@/components/shared/coinLogo'

import {useWidgetContext} from './widgetProvider'

import type {SelectedItems} from '@nextui-org/react'

const PriceRow = () => {
  const {fromValue, toValue, setToValue} = useWidgetContext()
  // const fromValueId = Object.values(fromValue)[0]?.toString()
  const fromValueId = new Set(fromValue).values().next().value?.toString()
  // const toValueId = Object.values(toValue)[0]?.toString()
  const toValueId = new Set(toValue).values().next().value?.toString()
  
  
  const {data: bridgeInfo, isLoading} = useWidgetData(
    fromValueId || 'Bridge.vETH'
  )
  let rate
  // console.log(bridgeInfo?.currencyPrices)
  if (bridgeInfo?.currencyPrices && toValueId) {
    rate = bridgeInfo.currencyPrices[toValueId].viaconversionprice || undefined
  }
  
  const tokenList = Object.values(
    bridgeInfo?.list || {}
  ) as unknown as TokenList[]
  
  return (
    <div className="flex items-center justify-between px-2">
      <p className="text-xs">
        <span className="text-[#565656]">Price</span>{' '}
        {rate && <span className="font-medium">
          {/* {rate.toFixed(2)} */}
          {Intl.NumberFormat('en-US', {
          style: 'decimal',
          maximumFractionDigits: 4,
          minimumFractionDigits: 2,
        }).format(rate || 0)}
          </span>}
      </p>
      <Select
        items={Object.values(tokenList)}
        variant="flat"
        placeholder="Select currency"
        aria-label="Select currency"
        selectedKeys={toValue}
        isLoading={isLoading}
        className="max-w-[152px]"
        classNames={{
          trigger: ' h-10 shadow-none text-bluePrimary',
          listboxWrapper: 'grow-1',
        }}
        onSelectionChange={setToValue}
        renderValue={(tokens: SelectedItems<TokenList>) => {
          return tokens.map((token) => (
            <div
              key={token.key}
              className="flex items-center justify-end gap-0.5 font-medium text-bluePrimary"
            >
              <CoinLogo size={20} symbol={token!.data!.value} iAddr={'0x11'} />
              <span className="truncate">
                {FormatTokenLabels(token!.data!.label)}
              </span>
            </div>
          ))
        }}
      >
        {(token) => (
          <SelectItem key={token.id} textValue={token.id}>
            <div className="flex items-center gap-2 text-xs">
              <CoinLogo size={20} symbol={token.value} iAddr={'0x11'} />
              {FormatTokenLabels(token.label)}
            </div>
          </SelectItem>
        )}
      </Select>
    </div>
  )
}

export default PriceRow

const FormatTokenLabels = (text: string) => {
  //lets check if not Bridge.vETH
  if (text == 'Bridge.vETH') return text

  if (text.startsWith('[')) {
    return text.split(']')[0] + ']'
  }

  return text.split('.')[0]
}
