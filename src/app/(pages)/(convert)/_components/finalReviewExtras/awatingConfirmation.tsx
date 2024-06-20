import React from 'react'
import {ModalBody, Spinner} from '@nextui-org/react'

const AwatingConfirmation = ({
  formValues,
  pendingTx,
  destination,
}: {
  formValues: ConvertFormData
  pendingTx: boolean
  destination?: string
}) => {
  return (
    <ModalBody>
      <div className="mb-6 flex flex-col items-center justify-center space-y-2 py-4">
        <Spinner size="lg" />
        <p className="text-center text-2xl font-medium">
          Waiting for confirmation
        </p>
        {formValues.sendOnly ? (
          <p className="break-all">
            Sending {formValues.fromToken.value} to the Verus blockchain
          </p>
        ) : (
          <p>
            Converting {formValues.fromToken.value} to {destination}
          </p>
        )}
        <p className="text-sm text-[686868]">
          {pendingTx
            ? 'Processing transaction'
            : 'Confirm this transaction in your wallet'}
        </p>
      </div>
    </ModalBody>
  )
}

export default AwatingConfirmation
