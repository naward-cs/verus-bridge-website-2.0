import {Card, CardBody, Divider} from '@nextui-org/react'

import ConvertSection from './convertSection'
import StatSections from './statSections'

const PriceWidget = async () => {
  return (
    <>
 
      
      <Card radius="sm" className="mx-1 border border-slate-400 bg-transparent">
        <CardBody>
          <ConvertSection />
          <Divider className="my-4" />
          <StatSections />
        </CardBody>
      </Card>
      <p className='text-xs mt-1 mr-2 text-right text-[#828282]'>Percentages compared to Coinpaprika</p>
      
    </>
  )
}

export default PriceWidget
