import React from 'react'
import {Link} from '@nextui-org/react'

const FeesInfo = () => {
  return (
    <div className="container max-w-4xl  px-1.5">
      <div className="space-y-5 rounded-xl border-2 p-4">
        <h3 className="text-2xl font-medium">
          Claim bridging fees for miners and stakers
        </h3>
        <div>
          <h4 className="text-xl font-medium">What are bridging fees?</h4>
          <p>
            Solo miners and stakers can earn fees for bridging currencies to and
            from Ethereum. When they find a block that includes these bridging
            operations they earn a part of it.
          </p>
        </div>
        <div>
          <h4 className="text-xl font-medium">How to claim bridging fees?</h4>
          <p>
            There are two ways to claim bridging fees. The minimum amount to
            claim is 0.006 ETH to cover the costs.
          </p>
          <ol className="ml-4 mt-5 list-decimal space-y-5">
            <li>
              Etner the R- or i-address you mine or stake to on this page.If
              there are fees to claim you can click on "Claim". Now you pay for
              the gas that sends the fees to that R- or i-address.
            </li>
            <li>
              Import the R-address you mine and stake to into MetaMask and use
              the "Claim directly" option.{' '}
              <Link
                href=""
                className=" text-bluePrimary underline-offset-1"
                isExternal
                underline="always"
              >
                Learn how to
              </Link>
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}

export default FeesInfo
