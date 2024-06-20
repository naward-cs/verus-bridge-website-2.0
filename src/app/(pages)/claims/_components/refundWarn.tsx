import React from 'react'
import {useAccount} from 'wagmi'

import {Icons} from '@/components/shared/icons'

const RefundWarn = () => {
  const {isConnected} = useAccount()
  return (
    <div className="flex w-fit items-center space-x-2.5 rounded-2xl bg-[#F4EEEE] px-2 py-1 text-[#C58484] ">
      <Icons.iInfo className="h-full w-4 text-[#D95757] " />
      <p className=" text-xs ">
        {}
        What you receive (always for the fair price) can be different.{' '}
      </p>
    </div>
  )
}

export default RefundWarn
