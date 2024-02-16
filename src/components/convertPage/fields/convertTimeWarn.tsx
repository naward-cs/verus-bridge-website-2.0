import React, {useState} from 'react'
import {Tooltip} from '@nextui-org/react'

import {isETHAddress} from '@/lib/utils/rules'
import {Icons} from '@/components/shared/icons'

import {WarnContent} from './submit'

const ConvertTimeWarn = ({address}: {address: string}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex w-fit items-center space-x-2.5 rounded-2xl bg-[#F4EEEE] px-2 py-1 text-[#C58484]">
      <Icons.iInfo className="h-full w-4 text-[#D95757] " />
      <p className=" text-xs text-[#686868]">
        It can take up to
        {isETHAddress(address) ? ' 2 hours ' : ' 60 mins '}
        before you receive the currency.{' '}
        <Tooltip
          showArrow
          placement="bottom"
          content={WarnContent()}
          isOpen={isOpen}
          onOpenChange={(open) => setIsOpen(open)}
          delay={1000}
        >
          <span
            onClick={() => setIsOpen(!isOpen)}
            className="font-medium text-bluePrimary cursor-help"
          >
            Why?
          </span>
        </Tooltip>
      </p>
    </div>
  )
}

export default ConvertTimeWarn
