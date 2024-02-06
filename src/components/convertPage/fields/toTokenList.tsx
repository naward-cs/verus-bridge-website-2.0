import React from 'react';
import { AddressZero } from '@ethersproject/constants';
import { Link } from '@nextui-org/react';
import { useAccount, useBalance } from 'wagmi';



import { EtherScan } from '@/lib/hooks/etherScan';
import { ToTokenName } from '@/lib/hooks/tokenName';
import { useGetTokens } from '@/lib/hooks/tokens';
import { isETHAddress } from '@/lib/utils/rules';
import CoinLogos from '@/components/shared/coinLogos';





type PROPS = {
  toAddress: any
  listType: 'verus' | 'eth'
  options?: DestinationOption[]
  verusList?: DestinationOption[]
  ethList?: DestinationOption[]
  fieldChange: (...event: any[]) => void
  setVerusOptions: (
    value: React.SetStateAction<DestinationOption[] | undefined>
  ) => void
  setEthOptions: (
    value: React.SetStateAction<DestinationOption[] | undefined>
  ) => void
  onClose: () => void
}

const VerusToken = (token: DestinationOption) => {
  const tokenInfo = ToTokenName(token.label)

  return (
    <div className="flex items-center space-x-2 ">
      <CoinLogos symbol={token.currency} iAddr={token.iaddress} />
      <div className="flex flex-col">
        <p className=" text-base font-medium leading-none ">
          {tokenInfo?.name || token.label}
        </p>
        <p className=" text-xs text-[#818181] ">
          {tokenInfo?.verusToken || token.currency}
        </p>
      </div>
    </div>
  )
}

const EthToken = (token: DestinationOption) => {
  const {tokenList} = useGetTokens()
  const tokenInfo = ToTokenName(token.label)
  const additionalInfo = tokenList?.filter(
    (t) => t.iaddress === token.iaddress
  )[0]
  const etherScan = EtherScan()
  const {address: account} = useAccount()
  const {data: balance} = useBalance({
    address: account,
    token:
      additionalInfo?.erc20address !== AddressZero
        ? additionalInfo?.erc20address
        : undefined,
    enabled: !!account,
  })
  return (
    <>
      <div className="flex items-center space-x-2 ">
        <CoinLogos symbol={token.currency} iAddr={token.iaddress} />
        <div className="flex flex-col">
          <p className=" text-base font-medium leading-none ">
            {tokenInfo?.name || token.label}
          </p>
          <div className="flex w-28 items-center justify-between">
            <p className="text-xs text-[#818181]">
              {tokenInfo?.ethToken || token.currency}
            </p>
            {additionalInfo && additionalInfo.erc20address !== AddressZero && (
              <Link
                isExternal
                className="text-xs underline"
                href={etherScan + 'address/' + additionalInfo.erc20address}
              >
                {additionalInfo.erc20address.slice(0, 5)}...
                {additionalInfo.erc20address.slice(-3)}
              </Link>
            )}
          </div>
        </div>
      </div>
      <div>
        <p className="ml-4 font-medium ">
          {balance &&
            Intl.NumberFormat('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 8,
            }).format(parseFloat(balance?.formatted))}
        </p>
      </div>
    </>
  )
}

const ToTokenList = (props: PROPS) => {
  const {
    toAddress,
    listType,
    options,
    verusList,
    ethList,
    fieldChange,
    setVerusOptions,
    setEthOptions,
    onClose,
  } = props
  if (listType === 'verus' && toAddress && isETHAddress(toAddress)) return null
  if (listType === 'eth' && toAddress && !isETHAddress(toAddress)) return null
  return (
    <>
      <div className="mx-6 flex items-center border-b-1 border-[#E5E5E5] py-0.5 font-medium [&>img]:mx-1 [&>img]:size-3.5">
        <p>On the</p>
        <CoinLogos symbol={listType === 'verus' ? 'VRSC' : 'ETH'} iAddr="" />
        <p>{listType === 'verus' ? 'Verus' : 'Ethereum'} blockchain</p>
      </div>

      <ul className="space-y-1 pb-2">
        {options?.map((token) => {
          return (
            <li
              onClick={() => {
                fieldChange(token)
                setVerusOptions(verusList)
                setEthOptions(ethList)
                onClose()
              }}
              key={token.iaddress}
              className="text-[#818181] hover:bg-[#f3f3f3] hover:text-black"
            >
              <div className="group mx-6 flex cursor-pointer items-center justify-between p-2">
                {listType === 'verus' ? (
                  <VerusToken {...token} />
                ) : (
                  <EthToken {...token} />
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default ToTokenList