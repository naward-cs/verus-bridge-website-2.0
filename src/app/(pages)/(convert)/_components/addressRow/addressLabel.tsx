import {useState} from 'react'
import {Tooltip} from '@nextui-org/react'

import {ToolTipText} from './addressToolTip'

export const AddressLabel = (sendOnly: boolean) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      Use Verus (VerusID@, R-, i-address) {sendOnly ? null : 'or Ethereum '}
      address.{' '}
      <Tooltip
        showArrow
        placement="bottom"
        content={ToolTipText(sendOnly)}
        isOpen={isOpen}
        onOpenChange={(open) => setIsOpen(open)}
        delay={1000}
        isDismissable={true}
      >
        <span
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-help text-xs font-medium text-bluePrimary underline"
        >
          How it works
        </span>
      </Tooltip>
    </>
  )
}
