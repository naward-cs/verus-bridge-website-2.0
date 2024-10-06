import {Select, SelectedItems, SelectItem} from '@nextui-org/react'

import {CoinLogo} from '@/components/shared/coinLogo'

import {useWidgetContext} from './widgetProvider'

const bridgeList = [
  {
    label: 'Bridge.vETH',
    currency: 'VBRID',
    default: 'iGBs4DWztRNvNEJBt4mqHszLxfKTNHTkhM',
  },
  {
    label: 'Bridge.vARRR',
    currency: 'vARRR',
    default: 'iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU',
  },
  {
    label: 'Bridge.vDEX',
    currency: 'vDEX',
    default: 'iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU',
  },
  {
    label: 'Pure',
    currency: 'PURE',
    default: 'iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU',
  },
  {
    label: 'Switch',
    currency: 'SWITCH',
    default: 'iGBs4DWztRNvNEJBt4mqHszLxfKTNHTkhM',
  },
  {
    label: 'NATI',
    currency: 'NATI',
    default: 'iL62spNN42Vqdxh8H5nrfNe8d6Amsnfkdx',
  },
  {
    label: 'NATI🦉',
    currency: 'NATI🦉',
    default: 'iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU',
  },
  {
    label: 'Kaiju',
    currency: 'KAIJU',
    default: 'iS8TfRPfVpKo5FVfSUzfHBQxo9KuzpnqLU',
  },
]
// i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV

const SelectProtocol = () => {
  const {fromValue, setFromValue, setToValue} = useWidgetContext()
  const setDefaultValue = (keys: string) => {
    setToValue(
      new Set([bridgeList.find((t) => t.label === keys)?.default || ''])
    )
  }
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
      onChange={(keys) => setDefaultValue(keys.target.value)}
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
