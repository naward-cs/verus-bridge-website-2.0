import React, {Suspense} from 'react'
import {Card, CardBody, CardHeader} from '@nextui-org/react'

import {Icons} from '@/components/shared/icons'
import {ConvertSkeleton} from '@/components/skeletons/convertSkeleton'

import Address from './addressRow/address'
import {ConvertRate} from './convertRow/convertRate'
import {ConvertWarn} from './convertRow/convertWarn'
import BaseForm from './forms/baseForm'
import SubmitButton from './forms/submitButton'
import {FromTokenRow} from './fromTokenRow/fromTokenRow'
import {ToTokenRow} from './toTokenRow/toTokenRow'

//The reason for bringing BaseForm is to maximize server components
//and only use client components when needed
const ConvertForm = () => {
  return (
    <Suspense fallback={<ConvertSkeleton />}>
      <Card radius="sm" className="mx-1 border border-black bg-transparent">
        <CardHeader className="pl-5">Convert/Send</CardHeader>
        <CardBody className="pt-0">
          <BaseForm>
            <FromTokenRow />

            <div className="relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white bg-[#ddd] p-[3px] text-center align-middle">
                <Icons.arrowDown className="size-4 text-[#969696]" />
              </div>
            </div>
            <ToTokenRow />
            <ConvertRate />
            <ConvertWarn />
            <Address />
            <SubmitButton />
          </BaseForm>
        </CardBody>
      </Card>
    </Suspense>
  )
}

export default ConvertForm
