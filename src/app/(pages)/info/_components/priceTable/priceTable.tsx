import LiquidityPoolRow from './liquidityPoolRow'
import PricesTable from './pricesTable'
import TotalRow from './totalRow'

const PriceTable = () => {
  return (
    <div className="flex flex-col space-y-14 md:basis-7/12">
      <LiquidityPoolRow />
      <PricesTable />
      <TotalRow />
    </div>
  )
}

export default PriceTable
