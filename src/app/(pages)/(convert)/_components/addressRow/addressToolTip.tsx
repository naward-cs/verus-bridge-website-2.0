import {Link} from '@nextui-org/react'

export const ToolTipText = (sendOnly: boolean) => {
  return (
    <div className="max-w-[280px] space-y-3 py-2 text-xs">
      <p>
        Use a Verus address to receive the currency on the Verus blockchain.{' '}
        <Link
          className="text-xs text-bluePrimary underline-offset-1"
          isExternal
          underline="always"
          href="https://docs.verus.io/guides/getwallet.html"
        >
          Get a Verus address
        </Link>
      </p>
      {sendOnly ? null : (
        <p>
          Use an Ethereum address to receive the currency on the Ethereum
          blockchain (as ETH or ERC-20). You pay for two transfers: from
          Ethereum to Verus & from Verus back to Ethereum. This can take up to
          two hours.
        </p>
      )}
    </div>
  )
}
