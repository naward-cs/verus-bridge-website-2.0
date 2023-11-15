'use client'

import React from 'react'

// import { erc721ABI, erc1155ABI, useDelegatorOnErc721Received, useErc721Event, useErc721TokenByIndex, useErc721TokenUri, useErc721TransferEvent, useErc721TransferFrom, useErc1155Uri } from '@/generated';
// import { Erc1155, useContract, useNFTs, useSDK } from '@thirdweb-dev/react';
// import { useContractRead } from 'wagmi';

// import ERC721 from '@/config/abi/ERC721AbiJson.json';
// import { erc1155 } from '@/config/abi/ERC1155Abi';
// import { useERC721contract, useERC1155contract } from '@/lib/hooks/contract';
// import { useGetNFTfromList } from '@/lib/hooks/delegator';
// import { getIdentityInfo, getVdxfId } from '@/lib/server/verusQueries';
// import { VerusRPC } from '@/lib/server/verusRPC';
// import { toBase58Check } from '@/lib/utils/convert';

const NFTsSection = () => {
  // const {data: list} = useGetNFTfromList()
  // console.log(list)

  // console.log(data)
  // const contract0 = useERC721contract(list[0].erc20address)
  // const contract1 = useERC721contract(list[1].erc20address)
  // const {data} = useErc721TokenUri({
  //   address: list[5].erc20address,
  //   args: [list[5].value],
  // })
  // console.log(data)
  // const contract2 = useErc1155Uri()
  // console.log(contract)

  // const c1 = useERC1155contract(list[4].erc20address)
  // console.log(c1)
  // const sdk = useSD K()
  const get = async () => {
    // console.log(list[4].erc20address)
    // const x = await contract0.queryFilter('Transfer', 0)
    // console.log('x', x)
    // const y = await contract1.queryFilter('Transfer', 0)
    // console.log('y', y)
    // const z = await getIdentityInfo(5, 'iJhCezBExJHvtyH3fGhNnt2NhU4Ztkf2yq@')
    // console.log(z.result)
    // const z = await getVdxfId(5, 'iH51dFy7vF3LTRuVQvCTVu6QSbYfhTjek8')
    // console.log(z)
    // console.log(x[0].args.tokenId)
    // const y = await contract.callStatic.tokenURI(x[0].args.tokenId)
    // console.log(y)
    // const x1 = await sdk?.getContract(list[2].erc20address, ERC721)
    // const y1 = await x1?.erc721.totalCount()
    // const y1 = await x1?.erc721.get(x[0].args.tokenId)
    // console.log('y', y1)
  }

  return (
    <div className="border-2 border-red-500 sm:flex sm:columns-2 md:columns-3 lg:columns-4">
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <button onClick={() => get()}>get</button>
    </div>
  )
}

export default NFTsSection
