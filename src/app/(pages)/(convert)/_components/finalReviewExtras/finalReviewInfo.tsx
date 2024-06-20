import {useState} from 'react'
import {Tooltip} from '@nextui-org/react'

import {useFormValues} from '@/lib/hooks/form'
import {useBridgeInfo} from '@/lib/hooks/verus/useSelectBridgeInfo'
import {isETHAddress} from '@/lib/utils'
import {TokenToBridgeToken} from '@/lib/utils/converters/tokenToBridgeToken'
import {Icons} from '@/components/shared/icons'

import {WarnContent} from '../convertRow/convertWarn'

const FinalReviewInfo = () => {
  const [isOpen, setIsOpen] = useState(false)
  const {toToken, fromToken, toAddress} = useFormValues()
  let fromTokenAmount: number | undefined
  let toTokenAmount: number | undefined
  let toFromBridge: 'to' | 'from' | 'neither' = 'neither'

  const {list, bridge} = useBridgeInfo()
  //two different ways to Bridge.vETH or from Bridge.vETH format
  if (fromToken.label.toLowerCase() === 'bridge.veth') {
    toFromBridge = 'from'
    toTokenAmount = TokenToBridgeToken(
      toToken.currency.toLowerCase(),
      list
    )?.amount
  } else if (toToken.value === 'bridgeBridge') {
    toFromBridge = 'to'
    fromTokenAmount = TokenToBridgeToken(
      fromToken.value.toLowerCase(),
      list
    )?.amount
  } else {
    fromTokenAmount = TokenToBridgeToken(
      fromToken.value.toLowerCase(),
      list
    )?.amount
    toTokenAmount = TokenToBridgeToken(
      toToken.currency.toLowerCase(),
      list
    )?.amount
  }
  return (
    <div className="rounded-lg border border-[#999] ">
      <div className="flex-col space-y-2 p-4">
        <p className="text-xs font-medium text-[#808080]">
          Current Bridge.vETH (liquidity pool) information
        </p>
        <div className="flex items-center justify-between">
          <p>
            <span className="font-medium">
              {toFromBridge === 'from'
                ? 'Bridge.vETH supply'
                : `${fromToken.value} in reserves`}
            </span>
          </p>
          <p className="font-medium">
            {toFromBridge === 'from'
              ? bridge.amount
                ? Intl.NumberFormat('en-US', {
                    style: 'decimal',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 3,
                  }).format(bridge.amount)
                : 'Error'
              : fromTokenAmount
                ? Intl.NumberFormat('en-US', {
                    style: 'decimal',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 3,
                  }).format(fromTokenAmount)
                : 'Loading...'}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p>
            <span className="font-medium">
              {toFromBridge === 'to'
                ? 'Bridge.vETH supply'
                : `${toToken.currency} in reserves`}
            </span>
          </p>
          <p className="font-medium">
            {toFromBridge === 'to'
              ? bridge.amount
                ? Intl.NumberFormat('en-US', {
                    style: 'decimal',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 3,
                  }).format(bridge.amount)
                : 'Error'
              : toTokenAmount
                ? Intl.NumberFormat('en-US', {
                    style: 'decimal',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 3,
                  }).format(toTokenAmount)
                : 'Loading...'}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between border-t-1 border-[#999] p-4 text-xs">
        <div className="flex items-center space-x-1 ">
          <Icons.clock height={24} opacity="37%" />
          <p>Ethereum</p>
          <Icons.rightArrow width={8} />
          <p>Verus</p>
          {isETHAddress(toAddress) && (
            <>
              <Icons.rightArrow width={8} />
              <p>Ethereum</p>
            </>
          )}
        </div>

        <p>
          <span className="font-medium">
            up to {isETHAddress(toAddress) ? ' 120 ' : ' 60 '} mins
          </span>{' '}
          <Tooltip
            showArrow
            placement="left"
            content={WarnContent()}
            isOpen={isOpen}
            onOpenChange={(open) => setIsOpen(open)}
            delay={1000}
            isDismissable={true}
          >
            <span
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-help font-medium text-bluePrimary"
            >
              Why?
            </span>
          </Tooltip>
        </p>
      </div>
    </div>
  )
}

export default FinalReviewInfo

// — if to Verus network or back to ETH
// DAI -> VRSC (DAI in reserves, VRSC in reserves)
// DAI -> ETH (DAI in reserves, ETH in reserves)
// DAI -> MKR (DAI in reserves, MKR in reserves)
// DAI -> Bridge.vETH (DAI in reserves, Bridge.vETH supply)

// — if to Verus network or back to ETH
// ETH -> VRSC (ETH in reserves, VRSC in reserves)
// ETH -> DAI (ETH in reserves, DAI in reserves)
// ETH -> MKR (ETH in reserves, MKR in reserves)
// ETH -> Bridge.vETH (ETH in reserves, Bridge.vETH supply)

// — if to Verus network or back to ETH
// MKR -> VRSC (MKR in reserves, VRSC in reserves)
// MKR -> DAI (MKR in reserves, DAI in reserves)
// MKR -> ETH (MKR in reserves, ETH in reserves)
// MKR -> Bridge.vETH (MKR in reserves, Bridge.vETH supply)

// — if to Verus network or back to ETH
// VRSC -> ETH (VRSC in reserves, ETH in reserves)
// VRSC -> DAI (VRSC in reserves, DAI in reserves)
// VRSC -> MKR (VRSC in reserves, MKR in reserves)
// VRSC -> Bridge.vETH (VRSC in reserves, Bridge.vETH supply)

// — if to Verus network or back to ETH
// VBRID (=Bridge.vETH) -> ETH (ETH in reserves, Bridge.vETH supply)
// VBRID -> DAI (DAI in reserves, Bridge.vETH supply)
// VBRID -> MKR (MKR in reserves, Bridge.vETH supply)
// VBRID -> VRSC (VRSC in reserves, Bridge.vETH supply)

// — if to Verus network
// ETH -> ETH.vETH (no stats)
// DAI -> DAI.vETH (no stats)
// MKR -> MKR.vETH (no stats)
// VRSC -> VRSC (no stats)
// Bridge.vETH (VBRID) -> Bridge.vETH (no stats)
