import {getWagmiCookie} from '@/lib/actions/getWagmiCookie'
import {erc20BalanceQuery} from '@/lib/hooks/wagmi/useErc20Balance'

import type {QueryClient} from '@tanstack/react-query'

export const prefetchERC20Balances = async (
  queryClient: QueryClient,
  tokenList: TokenList[]
) => {
  const wagmiInfo = getWagmiCookie()
  if (wagmiInfo?.current) {
    const account = wagmiInfo.connections.get(wagmiInfo.current)?.accounts[0]
    const queries = tokenList.map((token) =>
      queryClient.prefetchQuery(erc20BalanceQuery(token.erc20address, account))
    )
    await Promise.all(queries)
  }
}
