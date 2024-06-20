import {Card, CardBody, Divider} from '@nextui-org/react'

import ConvertSection from './convertSection'
import StatSections from './statSections'

const PriceWidget = async () => {
  return (
    <div className="absolute right-0 top-0 mr-[100%]  ">
      <Card radius="sm" className="mx-1 border border-black bg-transparent">
        <CardBody>
          <ConvertSection />
          <Divider className="my-4" />
          <StatSections />
        </CardBody>
      </Card>
      <p className='text-xs mt-1 mr-2 text-right text-[#828282]'>Percentages compared to Coinpaprika</p>
    </div>
  )
}

export default PriceWidget
