import React from 'react'
import {Link} from '@nextui-org/react'
import * as dn from 'dnum'

import {AddressZero} from '@/config/constants'
import {useERC20Balances} from '@/lib/hooks/wagmi/useErc20Balance'
import {useEtherScan} from '@/lib/hooks/web/useEtherScan'
import {FromTokenName} from '@/lib/utils/correctTokenName'
import {CoinLogo} from '@/components/shared/coinLogo'

const Token = ({token, hideZero}: {token: TokenList; hideZero: boolean}) => {
  const etherScan = useEtherScan()
  const label = FromTokenName(token.label)
  const balance = useERC20Balances(token.erc20address)

  if (hideZero && balance && balance.value === 0n) return null

  return (
    <div className="group mx-6 flex cursor-pointer items-center justify-between p-2">
      <div className="flex items-center space-x-2 ">
        <CoinLogo symbol={token.value} iAddr={token.erc20address.slice(2)} />

        <div className="flex flex-col">
          <p className=" text-base font-medium leading-none ">{label}</p>

          <div className="flex w-28 items-center justify-between">
            <p className="text-xs text-[#818181]">{token.value}</p>
            {token.erc20address !== AddressZero && (
              <Link
                isExternal
                className="text-xs underline"
                href={etherScan + '/address/' + token.erc20address}
              >
                {token.erc20address.slice(0, 5)}...
                {token.erc20address.slice(-3)}
              </Link>
            )}
          </div>
        </div>
      </div>
      <div>
        <p className="ml-4 font-medium ">
          {balance &&
            Intl.NumberFormat('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 8,
            }).format(
              parseFloat(dn.format([balance.value, balance.decimals], 8))
            )}
        </p>
      </div>
    </div>
  )
}

export default Token
