import {isETHAddress} from '@/lib/utils'
import {CoinLogo} from '@/components/shared/coinLogo'

import {EthTokenList} from './ethTokenList'
import {VerusTokenList} from './verusTokenList'

type TokenListProps = {
  listType: 'verus' | 'eth'
  tokens: DestinationOption[]
  toAddress: string
  select: (token: DestinationOption) => void
  tokenList?: TokenList[]
}

export const ToTokenList = (props: TokenListProps) => {
  const {listType, tokens, select, toAddress, tokenList} = props
  if (listType === 'verus' && toAddress && isETHAddress(toAddress)) return null
  if (listType === 'eth' && !tokenList && toAddress && !isETHAddress(toAddress))
    return null
  return (
    <>
      <div className="mx-6 flex items-center border-b-1 border-[#E5E5E5] py-0.5 font-medium [&>img]:mx-1 [&>img]:size-3.5">
        <p>On the</p>
        <CoinLogo symbol={listType === 'verus' ? 'VRSC' : 'ETH'} iAddr="" />
        <p>{listType === 'verus' ? 'Verus' : 'Ethereum'} blockchain</p>
      </div>

      <ul className="space-y-1 pb-2">
        {tokens?.map((token) => {
          return (
            <li
              onClick={() => select(token)}
              key={token.iaddress}
              className="text-[#818181] hover:bg-[#f3f3f3] hover:text-black"
            >
              <div className="group mx-6 flex cursor-pointer items-center justify-between p-2">
                {listType === 'verus' ? (
                  <VerusTokenList {...token} />
                ) : (
                  <EthTokenList token={token} tokenList={tokenList!} />
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </>
  )
}
