import {Select, SelectedItems, SelectItem} from '@nextui-org/react'

import {CoinLogo} from '@/components/shared/coinLogo'

import {useWidgetContext} from './widgetProvider'

const bridgeList = [
  {label: 'Bridge.vETH', currency: 'VBRID'},
  {label: 'Bridge.vARRR', currency: 'vARRR'},
  {label: 'Pure', currency: 'PURE'},
  {label: 'Switch', currency: 'SWITCH'},
]

const SelectProtocol = () => {
  const {fromValue, setFromValue, setToValue} = useWidgetContext()
  return (
    <Select
      items={bridgeList}
      variant="bordered"
      placeholder="Select bridge"
      selectedKeys={fromValue}
      aria-label="Select Bridge"
      className="max-w-[252px]"
      classNames={{
        trigger:
          'border-small bg-white h-12 data-[hover=true]:border-default-200 data-[open=true]:border-default-200 data-[focus=true]:border-default-200',
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
          <div className="flex items-center gap-2">
            <CoinLogo symbol={token.currency} iAddr={'0x11'} />
            {token.label}
          </div>
        </SelectItem>
      )}
    </Select>
  )
}

export default SelectProtocol
