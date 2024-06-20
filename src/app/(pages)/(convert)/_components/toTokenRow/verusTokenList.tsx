import {ToTokenName} from '@/lib/utils/correctTokenName'
import {CoinLogo} from '@/components/shared/coinLogo'

export const VerusTokenList = (token: DestinationOption) => {
  const tokenInfo = ToTokenName(token.label)
  let tokenCurrency = token.currency
  //temp for VBRID resolve
  if (tokenInfo?.verusToken === 'VBRID') {
    tokenCurrency = tokenInfo.verusToken
  }
  return (
    <div className="flex items-center space-x-2 ">
      <CoinLogo symbol={tokenCurrency} iAddr={token.iaddress} />
      <div className="flex flex-col">
        <p className=" text-base font-medium leading-none ">
          {tokenInfo?.name || token.label}
        </p>
        <p className=" text-xs text-[#818181] ">
          {tokenInfo?.verusToken || token.currency}
        </p>
      </div>
    </div>
  )
}
