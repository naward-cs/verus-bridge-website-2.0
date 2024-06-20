import {useMarket} from '@/lib/hooks/web/useMarketData'
import {cn} from '@/lib/utils'
import {Icons} from '@/components/shared/icons'

const Ticker = (coin: CoinList) => {
  const {data: market} = useMarket(coin.value!)
  let errorState = false
  let rate, percent
  if (market) {
    rate =
      coin.daiPrice < market
        ? 'less'
        : coin.daiPrice > market
          ? 'greater'
          : 'equal'

    percent = Math.abs(coin.daiPrice / market) - 1
  } else {
    errorState = true
    rate = 'less'
    percent = 0
  }

  return (
    <p
      className={cn(
        'flex items-center justify-end text-xs text-[#939393] md:text-sm',
        rate === 'less' && 'text-red-600',
        rate === 'greater' && 'text-green-600'
      )}
    >
      {errorState ? (
        'no data'
      ) : (
        <>
          <Icons.ticker
            height={8}
            width={12}
            className={cn(
              'mr-2',
              rate === 'greater' && 'rotate-180',
              rate === 'equal' && 'hidden'
            )}
          />
          {Intl.NumberFormat('en-US', {
            style: 'percent',
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          }).format(Math.abs(percent))}
        </>
      )}
    </p>
  )
}

export default Ticker
