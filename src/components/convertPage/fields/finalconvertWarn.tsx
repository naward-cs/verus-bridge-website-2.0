import React, {useState} from 'react'
import {Tooltip} from '@nextui-org/react'

import {Icons} from '@/components/shared/icons'

import {WarnContent} from './convertWarn'

export const FinalConvertWarn = () => {
  //TODO: fix tooltip for mobile unclick
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex items-center space-x-2.5 ">
      <Icons.alertTriangle className="h-full w-6" />
      <p className=" text-xs text-[#686868]">
        Estimation based on mempool. Can vary based on actual price.{' '}
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
            className="font-medium text-bluePrimary"
          >
            Why?
          </span>
        </Tooltip>
      </p>
    </div>
  )
}

export default FinalConvertWarn
