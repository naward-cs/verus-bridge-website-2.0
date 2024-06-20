import React from 'react'
import {Link, ModalBody} from '@nextui-org/react'

import {useEtherScan} from '@/lib/hooks/web/useEtherScan'
import {isETHAddress} from '@/lib/utils'
import {Icons} from '@/components/shared/icons'

const TxCompleted = ({
  toAddress,
  tx,
}: {
  toAddress: string
  tx: `0x${string}`
}) => {
  const etherScan = useEtherScan()
  return (
    <ModalBody>
      <div className="mb-6 flex flex-col items-center justify-center space-y-2 py-4">
        <p className="text-bluePrimary">
          <Icons.checkmark height={75} />
        </p>
        <p className="text-center text-2xl font-medium">
          Transaction submitted
        </p>

        <p className="text-center">
          Can take up to {isETHAddress(toAddress) ? '2 hours' : '60 minutes'} to
          complete
        </p>
        <Link
          size="sm"
          underline="always"
          isExternal
          href={etherScan + 'tx/' + tx}
        >
          View on explorer
        </Link>
      </div>
    </ModalBody>
  )
}

export default TxCompleted
