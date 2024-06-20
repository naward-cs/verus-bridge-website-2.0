import React from 'react'
import {Link, ModalBody} from '@nextui-org/react'

import {useEtherScan} from '@/lib/hooks/web/useEtherScan'
import {Icons} from '@/components/shared/icons'

const CompletedWithErrors = ({tx}: {tx: `0x${string}`}) => {
  const etherScan = useEtherScan()
  return (
    <ModalBody>
      <div className="mb-6 flex flex-col items-center justify-center space-y-2 py-4">
        <p className="text-red-600">
          <Icons.errormark height={75} />
        </p>
        <p className="text-center text-2xl font-medium">Transaction error</p>
        {tx && (
          <>
            <p className="text-center">Transaction timed out</p>
            <Link
              size="sm"
              underline="always"
              isExternal
              href={etherScan + 'tx/' + tx}
            >
              View on explorer
            </Link>
          </>
        )}
      </div>
    </ModalBody>
  )
}

export default CompletedWithErrors
