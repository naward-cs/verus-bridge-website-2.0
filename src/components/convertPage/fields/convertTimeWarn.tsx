import React, {useState} from 'react'
import {Tooltip} from '@nextui-org/react'

import {Icons} from '@/components/shared/icons'

import {WarnContent} from './submit'

const ConvertTimeWarn = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="flex items-center justify-start space-x-2.5 pt-2.5">
      <Icons.alertTriangle className="h-full w-6" />
      <p className=" text-xs text-[#686868]">
        This conversion can take up to 45 minutes.{' '}
        <Tooltip
          showArrow
          content={WarnContent()}
          isOpen={isOpen}
          onOpenChange={(open) => setIsOpen(open)}
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

export default ConvertTimeWarn
