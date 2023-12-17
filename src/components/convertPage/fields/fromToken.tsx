import React, {useCallback, useEffect, useState} from 'react'
import {AddressZero} from '@ethersproject/constants'
import {
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react'
import {useController, useFormContext} from 'react-hook-form'
import {useAccount, useBalance} from 'wagmi'

import {EtherScan} from '@/lib/hooks/etherScan'
import {useIsMounted} from '@/lib/hooks/mounted'
import {useGetTokens} from '@/lib/hooks/tokens'
import SearchInput from '@/components/formFields/searchField'
import CoinLogos from '@/components/shared/coinLogos'
import {Icons} from '@/components/shared/icons'

import ButtonText from './toFromTokenButtonText'

const Token = (token: TokenList) => {
  const etherScan = EtherScan()
  const {address: account} = useAccount()

  const {data: balance} = useBalance({
    address: account,
    token: token.erc20address !== AddressZero ? token.erc20address : undefined,
    enabled: !!account,
  })

  return (
    <>
      <div className="flex items-center space-x-2 ">
        <CoinLogos symbol={token.value} iAddr={token.iaddress} />

        <div className="flex flex-col">
          <p className=" text-base font-medium leading-none ">{token.label}</p>

          <div className="flex w-28 items-center justify-between">
            <p className="text-xs text-[#818181]">{token.value}</p>
            {token.erc20address !== AddressZero && (
              <Link
                isExternal
                className="text-xs underline"
                href={etherScan + 'address/' + token.erc20address}
              >
                {token.erc20address.slice(0, 5)}...
                {token.erc20address.slice(-3)}
              </Link>
            )}
          </div>
        </div>
      </div>
      <div>
        <p className="ml-4">
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

const FromTokenField = () => {
  const {control, resetField, setValue} = useFormContext()
  const isMounted = useIsMounted()
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure()
  const {tokenList} = useGetTokens()
  useEffect(() => {
    if (isMounted) {
      if (tokenList) {
        setValue(
          'fromToken',
          tokenList.find((token) => token.value === 'ETH')
        )
      }
    }
  }, [isMounted, setValue, tokenList])

  const [tokens, setTokens] = useState(tokenList)
  //search filter controller
  const handleSearch = useCallback(
    (text: string) => {
      const filteredToken = tokenList?.filter(
        (token) =>
          token.label.toLowerCase().includes(text.toLowerCase()) ||
          token.erc20address.toLowerCase().includes(text.toLowerCase())
      )
      setTokens(filteredToken)
    },
    [tokenList]
  )

  const {field} = useController({
    control,
    name: 'fromToken',
    defaultValue: tokenList?.find((token) => token.value === 'ETH'),
  })

  if (!isMounted)
    return (
      <button
        className="flex h-fit min-w-fit items-center justify-center rounded-lg bg-white px-3 py-1 text-xl font-medium"
        disabled
      >
        Select currency
        <Icons.chevronDown className="ml-2 h-4" />
      </button>
    )
  return (
    <>
      <button
        className="flex h-fit min-w-fit items-center justify-center rounded-lg bg-white pr-3 p-1 text-xl font-medium hover:bg-[#EFEFEF]"
        onClick={(e) => {
          e.preventDefault()
          setTokens(tokenList)
          onOpen()
        }}
      >
        <ButtonText
          label={field.value?.label}
          symbol={field.value?.value}
          iAddr={field.value?.iaddress}
        />
      </button>
      <Modal
        isOpen={isOpen}
        backdrop="opaque"
        size="md"
        scrollBehavior="inside"
        placement="center"
        onOpenChange={() => {
          onOpenChange()
        }}
      >
        <ModalContent>
          <ModalHeader className="text-sm font-normal">
            Select a currency to convert/send
          </ModalHeader>
          <ModalBody>
            <SearchInput
              onChange={handleSearch}
              searchTitle="Search name or paste contract address"
            />
            <div className="max-h-[410px] overflow-y-auto">
              <ul className="mr-1 space-y-1">
                {tokens?.map((token) => (
                  <li
                    onClick={() => {
                      if (field.value.id !== token.id) {
                        field.onChange(token)
                        resetField('toToken')
                        resetField('fromAmount')
                      }
                      setTokens(tokenList)
                      onClose()
                    }}
                    key={token.iaddress}
                    className="group flex cursor-pointer items-center justify-between py-2 pl-2 text-[#818181] hover:bg-[#f3f3f3] hover:text-black"
                  >
                    <Token {...token} />
                  </li>
                ))}
              </ul>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default FromTokenField
