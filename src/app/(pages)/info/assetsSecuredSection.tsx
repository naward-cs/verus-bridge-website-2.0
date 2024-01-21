import React from 'react'
import {Link} from '@nextui-org/react'

const AssetsSecuredSection = () => {
  return (
    <div className="space-y-4 ">
      <p className="text-xl font-medium  md:text-2xl">
        Assets secured by miners and stakers
      </p>
      <p className="text-xs text-[#444] md:text-sm">
        The Verus-Ethereum Bridge allows for the secure transfer and conversion
        of cryptocurrencies between Verus and Ethereum.
      </p>
      <p className="text-xs text-[#444] md:text-sm">
        It’s trustless, decentralized and non-custodial, meaning it doesn’t
        require users to trust a third party with their funds, and no single
        entity has control over the assets being transferred.
      </p>
      <p className="text-xs text-[#444] md:text-sm">
        All assets on the bridge (the Ethereum smart contract) are secured by
        the worldwide Verus network of miners and stakers. Nothing is
        transferred over the bridge until it is proven and verified by consensus
        on the Verus side.
      </p>
      <Link
        isExternal
        href="https://docs.verus.io/eth-bridge"
        showAnchorIcon
        className="text-bluePrimary"
      >
        Learn more on docs.verus.io/eth-bridge
      </Link>
    </div>
  )
}

export default AssetsSecuredSection
