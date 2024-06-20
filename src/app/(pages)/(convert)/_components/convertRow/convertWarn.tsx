'use client';

import React, { useState } from 'react';
import { Link, Tooltip } from '@nextui-org/react';



import { Icons } from '@/components/shared/icons';





export const WarnContent = () => {
  return (
    <div className="max-w-[280px] space-y-3 py-2 text-xs">
      <p>
        All conversions in one or more blocks are solved simultaneously. All
        conversions in those blocks get the same, fair protocol price. What you
        receive can be different based on new conversions entering the mempool.
      </p>
      <p>
        Verus DeFi is MEV-resistant because of its protocol design.{' '}
        <Link
          className="text-xs underline-offset-1"
          isExternal
          underline="always"
          href="https://docs.verus.io/sendcurrency/"
        >
          Learn more
        </Link>
      </p>
    </div>
  )
}
export const ConvertWarn = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex w-fit items-center space-x-2.5 rounded-2xl bg-[#F4EEEE] px-2 py-1 text-[#C58484] ">
      <Icons.iInfo className="h-full w-4 text-[#D95757] " />
      <p className=" text-xs ">
        What you receive (always for the fair price) can be different.{' '}
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
            className="cursor-help font-medium text-bluePrimary"
          >
            Why?
          </span>
        </Tooltip>
      </p>
    </div>
  )
}

export default ConvertWarn