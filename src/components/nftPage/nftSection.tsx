import React from 'react'

import {useGetNFTfromList} from '@/lib/hooks/delegator'

const NFTsSection = () => {
  const {data: list} = useGetNFTfromList()
  console.log(list)
  return (
    <div className="border-2 border-red-500 sm:flex sm:columns-2 md:columns-3 lg:columns-4">
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
    </div>
  )
}

export default NFTsSection
