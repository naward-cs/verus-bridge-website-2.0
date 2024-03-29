'use client'

import React, {useState} from 'react'
import {Tooltip} from '@nextui-org/react'

import {Icons} from '../shared/icons'
import {WarnContent} from './fields/submit'

const FinalReviewInfoSendOnly = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="rounded-lg border border-[#999] ">
      <div className="flex items-center justify-between p-4 text-xs">
        <div className="flex items-center space-x-1 ">
          <Icons.clock height={24} opacity="37%" />
          <p>Ethereum</p>
          <Icons.rightArrow width={8} />
          <p>Verus</p>
        </div>

        <p>
          <span className="font-medium">up to 60 mins</span>{' '}
          <Tooltip
            showArrow
            placement="left"
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
    </div>
  )
}

export default FinalReviewInfoSendOnly
