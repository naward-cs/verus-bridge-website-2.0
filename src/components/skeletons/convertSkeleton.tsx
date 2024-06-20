import React from 'react'
import {Card, CardBody, CardHeader, Skeleton} from '@nextui-org/react'

export const ConvertSkeleton = () => {
  return (
    <Card radius="sm" className="mx-1 border border-black bg-transparent">
      <CardHeader className="pl-5">
        <Skeleton className="size-fit rounded-lg ">Convert/Send</Skeleton>
      </CardHeader>

      <CardBody className="pt-0">
        <form className="flex flex-col space-y-1">
          <Skeleton className="rounded-lg">
            <div className="h-[120px] w-[354px] rounded-lg md:w-[508px]" />
          </Skeleton>

          <div className="relative">
            <div className="absolute -top-4 left-1/2 z-20 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white bg-[#ddd] p-[3px] text-center align-middle">
              <Skeleton className="size-4 rounded-full" />
            </div>
          </div>

          <Skeleton className="rounded-lg">
            <div className="h-[120px] w-[354px] rounded-lg md:w-[508px]" />
          </Skeleton>
        </form>
      </CardBody>
    </Card>
  )
}
