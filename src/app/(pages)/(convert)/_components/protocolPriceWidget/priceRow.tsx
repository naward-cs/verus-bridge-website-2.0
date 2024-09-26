import {Select, SelectItem} from '@nextui-org/react'

import {useWidgetData} from '@/lib/hooks/web/useWidgetData'
import {CoinLogo} from '@/components/shared/coinLogo'

import {useWidgetContext} from './widgetProvider'

import type {SelectedItems} from '@nextui-org/react'

const PriceRow = () => {
  const {fromValue, toValue, setToValue} = useWidgetContext()
  const fromValueId = Object.values(fromValue)[0]?.toString()
  const toValueId = Object.values(toValue)[0]?.toString()
  const {data: bridgeInfo, isLoading} = useWidgetData(
    fromValueId || 'Bridge.vETH'
  )
  let rate
  if (bridgeInfo?.currencyPrices && toValueId) {
    rate = bridgeInfo.currencyPrices[toValueId].viaconversionprice || undefined
  }
  const tokenList = Object.values(
    bridgeInfo?.list || {}
  ) as unknown as TokenList[]
  return (
    <div className="flex items-center justify-between px-2">
      <p>
        <span className="text-xs text-[#565656]">Price</span>{' '}
        {rate && <span className="font-medium">{rate.toFixed(4)}</span>}
      </p>
      <Select
        items={Object.values(tokenList)}
        variant="flat"
        placeholder="Select Token"
        aria-label="Select Token"
        selectedKeys={toValue}
        isLoading={isLoading}
        className="max-w-[142px] text-bluePrimary"
        classNames={{
          trigger: ' h-10 shadow-none',
        }}
        onSelectionChange={setToValue}
        renderValue={(tokens: SelectedItems<TokenList>) => {
          return tokens.map((token) => (
            <div key={token.key} className="flex items-center gap-2 text-xs">
              <CoinLogo size={20} symbol={token!.data!.value} iAddr={'0x11'} />
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
  )
}

export default PriceRow
