import {Link} from '@nextui-org/react'
import * as dn from 'dnum'

import {AddressZero} from '@/config/constants'
import {useERC20Balances} from '@/lib/hooks/wagmi/useErc20Balance'
import {useEtherScan} from '@/lib/hooks/web/useEtherScan'
import {ToTokenName} from '@/lib/utils/correctTokenName'
import {CoinLogo} from '@/components/shared/coinLogo'

export const EthTokenList = ({
  token,
  tokenList,
}: {
  token: DestinationOption
  tokenList: TokenList[]
}) => {
  const etherScan = useEtherScan()
  const tokenInfo = ToTokenName(token.label)
  const additionalInfo = tokenList.find((t) => t.iaddress === token.iaddress)
  const balance = useERC20Balances(additionalInfo?.erc20address)
  return (
    <>
      <div className="flex items-center space-x-2 ">
        <CoinLogo symbol={token.currency} iAddr={token.iaddress} />
        <div className="flex flex-col">
          <p className=" text-base font-medium leading-none ">
            {tokenInfo?.name || token.label}
          </p>
          <div className="flex w-28 items-center justify-between">
            <p className="text-xs text-[#818181]">
              {tokenInfo?.ethToken || token.currency}
            </p>
            {additionalInfo && additionalInfo.erc20address !== AddressZero && (
              <Link
                isExternal
                className="text-xs underline"
                href={etherScan + 'address/' + additionalInfo.erc20address}
              >
                {additionalInfo.erc20address.slice(0, 5)}...
                {additionalInfo.erc20address.slice(-3)}
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
    </>
  )
}
