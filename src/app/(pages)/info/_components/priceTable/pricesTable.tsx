import {Tooltip} from '@nextui-org/react'

import {Icons} from '@/components/shared/icons'

import {MarketTip, ReserveDaiTip} from '../tooltips'
import PriceRows from './priceRows'

const PricesTable = () => {
  return (
    <div className="space-y-1">
      <div className="grid grid-cols-4 items-end px-2 text-[10px] font-medium leading-normal text-[#595959] sm:text-xs">
        <p>
          Bridge.vETH
          <br />
          reserve currencies
        </p>
        <p className="self-end text-right">In reserves</p>
        <p className="flex items-center justify-end self-end">
          Price in DAI
          <Tooltip content={ReserveDaiTip()} delay={1000} isDismissable={true}>
            <span className="cursor-help">
              <Icons.info className="ml-1 text-[#81A0E2]" height={12} />
            </span>
          </Tooltip>
        </p>
        <p className=" flex items-end justify-end ">
          Compared to
          <br />
          Coinpaprika
          <Tooltip
            radius="sm"
            size="sm"
            content={MarketTip()}
            delay={1000}
            isDismissable={true}
          >
            <span className="cursor-help">
              <Icons.info className="mb-0.5 text-[#81A0E2]" height={12} />
            </span>
          </Tooltip>
        </p>
      </div>

      <PriceRows />
    </div>
  )
}

export default PricesTable
