import AssetsSecuredSection from '../_components/assetsSecuredSection'
import PriceTable from '../_components/priceTable/priceTable'

export default function PriceTableSection() {
  return (
    <div className="flex flex-col space-y-14 md:basis-7/12">
      <PriceTable />

      <div className="hidden rounded-xl border border-[#d1d1d1] p-8 md:block">
        <AssetsSecuredSection />
      </div>
    </div>
  )
}
