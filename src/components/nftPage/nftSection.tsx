'use client'

import React from 'react'
// import {
//   erc721ABI,
//   erc1155ABI,
//   useDelegatorOnErc721Received,
//   useErc721BalanceOf,
//   useErc721Event,
//   useErc721OwnerOf,
//   useErc721TokenByIndex,
//   useErc721TokenUri,
//   useErc721TransferEvent,
//   useErc721TransferFrom,
//   useErc1155Uri,
// } from '@/generated'
// import {useContractRead} from 'wagmi'

// import {Erc1155, useContract, useNFTs, useSDK} from '@thirdweb-dev/react'

// import { useContractRead } from 'wagmi'

// import ERC721 from '@/config/abi/ERC721AbiJson.json'
// import { erc1155 } from '@/config/abi/ERC1155Abi'
// import {useERC721contract, useERC1155contract} from '@/lib/hooks/contract'
// import {useGetNFTfromList} from '@/lib/hooks/delegator'

// import { getIdentityInfo, getVdxfId } from '@/lib/server/verusQueries'
// import { VerusRPC } from '@/lib/server/verusRPC'
// import { toBase58Check } from '@/lib/utils/convert'

const NFTsSection = () => {
  // const {data: list} = useGetNFTfromList()
  // console.log(list)

  // // console.log(data)
  // const contract0 = useERC721contract(list[2].erc20address)
  // const contract1 = useERC721contract(list![1].erc20address)

  // const {data} = useErc721TokenUri({
  //   address: list[3].erc20address,
  //   args: [list[3].value],
  // })
  // const {data} = useErc721TokenUri({
  //   account: '0x85a7dE2278E52327471e174AeeB280cdFdC6A68a',
  //   address: list![3].erc20address,
  // })
  // const {data} = useErc721OwnerOf({
  //   account: '0xc2c3c5597e0ef59a92f04a70c8af9f8b8cb342e9', 0x39Ec448b891c476e166b3C3242A90830DB556661
  //   address: list![3].erc20address,
  // })
  // const {data} = useErc721BalanceOf({
  //   address: list![2].erc20address,
  //   args: ['0xabadb5e4010aad8370a37986dfe571bac03a2add'],
  // })
  // const {data: d1} = useContractRead({
  //   address: list![2].erc20address,
  //   abi: erc721ABI,
  //   functionName: 'tokenByIndex',
  //   chainId: 5,
  //   args: ['0xabadb5e4010aad8370a37986dfe571bac03a2add', 0n],
  // })

  // const {nftcontract} = useContract(list![2].erc20address)
  // console.log(nftcontract)
  // const {data: d1} = useErc721TokenByIndex({
  //   address: list![2].erc20address,
  //   args: ['0xabadb5e4010aad8370a37986dfe571bac03a2add', 0n],
  // })
  // const {data: d1} = useErc721TokenUri({
  //   address: list![2].erc20address,
  //   args: [98417n],
  // })
  // const {data: d1} = useErc721OwnerOf({
  //   address: list![2].erc20address,
  //   // args: ['0xabadb5e4010aad8370a37986dfe571bac03a2add'],
  // })
  // const {data: d1} = useErc721TokenByIndex({
  //   address: list![2].erc20address,
  //   args: ['0xbaDb9B3bf898bc73830AABB6bDB6A88aC2E8D811', 0n],
  // })
  // const {data} = useErc721OwnerOf({
  //   address: list![2].erc20address,
  //   args: [6n],
  // })
  // console.log(list[5].erc20address)
  // console.log('data', data)
  // console.log('d1', d1)
  // const contract2 = useErc1155Uri()
  // console.log(contract)

  // const c1 = useERC1155contract(list[4].erc20address)
  // console.log(c1)
  // const sdk = useSD K()
  // const get = async () => {
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
    // const x = await contract0.callStatic.tokenByIndex(
    //   '0xbaDb9B3bf898bc73830AABB6bDB6A88aC2E8D811',
    //   0n
    // )
    // console.log("x",x)
  // }

  // {JSON.stringify(
  //         list,
  //         (_, v) => (typeof v === 'bigint' ? v.toString() : v),
  //         2
  //       )}
  return (
    <div className="border-2 border-red-500 sm:flex sm:columns-2 md:columns-3 lg:columns-4">
      {/* <pre>
        {JSON.stringify(
          list,
          (_, v) => (typeof v === 'bigint' ? v.toString() : v),
          2
        )}
      </pre> */}
      {/* <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <button onClick={() => get()}>get</button> */}
      {/* <div className="flex flex-col">
            {list?.map((erc) => (
          <NFT key={`${erc.erc20address}-${erc.value}`} {...erc} />
        ))}
      </div>         */}
    </div>
  )
}

// const NFT = (erc) => {
//   const {data: erc721} = useErc721TokenUri({
//     address: erc.erc20address,
//     args: [erc.value],
//     enabled: erc.ercNum === 721,
//   })
//   const {data: erc1155} = useErc1155Uri({
//     address: erc.erc20address,
//     args: [erc.value],
//     enabled: erc.ercNum === 1155,
//   })
//   console.log('e', erc1155)
//   return (
//     <div>
//       <p>json for erc</p>
//       <pre>
//         {JSON.stringify(
//           erc,
//           (_, v) => (typeof v === 'bigint' ? v.toString() : v),
//           2
//         )}
//       </pre>
//       <p>NFT URI for above ERC JSON</p>
//       <p>{erc721 === undefined ? 'Unknown NFT info' : erc721}</p>
//     </div>
//   )
// }

export default NFTsSection
