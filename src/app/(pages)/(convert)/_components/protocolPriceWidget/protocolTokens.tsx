import {Skeleton} from '@nextui-org/react'

import {useWidgetBridgeInfo} from '@/lib/hooks/verus/useSelectWidgetBridgeInfo'

import TokenPriceRow from './tokenPriceRow'
import {useWidgetContext} from './widgetProvider'

const ProtocolTokens = () => {
  const {fromValue, toValue} = useWidgetContext()
  const fromValueId = new Set(fromValue).values().next().value?.toString()
  const toToken = new Set(toValue).values().next().value?.toString()
  const {list, isLoading} = useWidgetBridgeInfo(
    fromValueId || 'Bridge.vETH',
    toToken!
  )

  if (isLoading)
    return (
      <div className="flex flex-col gap-2">
        <Skeleton className="h-2 rounded-lg" />
        <Skeleton className="h-2 rounded-lg" />
        <Skeleton className="h-2 rounded-lg" />
        <Skeleton className="h-2 rounded-lg" />
      </div>
    )
  if (!list) return null
  return list.map((c) => <TokenPriceRow key={c.name} {...c} />)
}

export default ProtocolTokens
