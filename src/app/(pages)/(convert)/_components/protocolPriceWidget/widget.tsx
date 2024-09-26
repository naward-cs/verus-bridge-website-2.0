'use client'

import {useState} from 'react'
import {Card, CardBody} from '@nextui-org/react'

import LiquidityRow from './liquidityRow'
import PriceRow from './priceRow'
import SelectProtocol from './selectProtocol'
import StatSections from './statSections'
import {WidgetContext} from './widgetProvider'

import type {Selection} from '@nextui-org/react'

const Widget = () => {
  const [fromValue, setFromValue] = useState<Selection>(
    new Set(['Bridge.vETH'])
  )
  const [toValue, setToValue] = useState<Selection>(new Set([]))
  return (
    <Card className="mx-1 bg-transparent shadow-none">
      <CardBody className="gap-2">
        <p className="text-sm">Protocol Price</p>
        <div className="flex flex-col gap-3">
          <WidgetContext.Provider
            value={{fromValue, setFromValue, toValue, setToValue}}
          >
            <SelectProtocol />
            <div className="flex min-w-64 flex-col gap-2 rounded-lg border border-[#DFDFDF] py-2">
              <PriceRow />
              <hr className="border-[#DFDFDF]" />
              <div className="px-2">
                <StatSections />
              </div>
              <hr className="border-[#DFDFDF]" />
              <LiquidityRow />
            </div>
          </WidgetContext.Provider>
        </div>
      </CardBody>
    </Card>
  )
}

export default Widget
