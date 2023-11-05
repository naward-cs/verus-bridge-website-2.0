import React, {useState} from 'react'
import {Tooltip} from '@nextui-org/react'

import {useFormValues} from '@/lib/hooks/formValues'
import {Icons} from '@/components/shared/icons'

const WarnContent = () => {
  return (
    <div className="max-w-xs space-y-3 py-2 text-xs">
      <p>
        This estimation is based on the Verus mempool. The amount can vary since
        new conversions can enter into the mempool.
      </p>
      <p>
        But rest assured, once a block with conversions is solved, everyone gets
        the same price!
      </p>
      {/* <Link className="text-xs" isExternal underline="always" href="/">
        Learn more
      </Link> */}
    </div>
  )
}
export const ConvertWarn = () => {
  //TODO: fix tooltip for mobile unclick
  const [isOpen, setIsOpen] = useState(false)
  const {toToken} = useFormValues()
  if (!toToken) return null
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

export default ConvertWarn
