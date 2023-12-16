import React, {useCallback, useEffect, useState} from 'react'
import Image from 'next/image'
import CoinLogoList from '@/data/coinLogoList.json'
import {
  cn,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react'
import {useController, useFormContext} from 'react-hook-form'

import {useFormValues} from '@/lib/hooks/formValues'
import {NetworkChain} from '@/lib/hooks/network'
import {useGetLogo, useGetTokenRef} from '@/lib/hooks/tokenLogos'
import {useGetTokens} from '@/lib/hooks/tokens'
import {DestinationOptions} from '@/lib/utils/destinationOptions'
import SearchInput from '@/components/formFields/searchField'
import RenderPbassCurrencyLogo from '@/components/shared/altLogos'

import ButtonText from './toFromTokenButtonText'

const Token = (token: DestinationOption & {logoRef: string}) => {
  const {data: logo} = useGetLogo(token.logoRef)
  const isCommon = CoinLogoList.filter(
    (t) => t.symbol === token.currency.toLowerCase()
  )[0]?.image
  return (
    <>
      <div className="flex items-center space-x-2 ">
        {isCommon ? (
          <Image
            src={isCommon}
            alt={token.label}
            height={36}
            width={36}
            className="rounded-full bg-[#DCDEEA] "
          />
        ) : logo ? (
          <Image
            src={logo}
            alt={token.label}
            height={36}
            width={36}
            className="rounded-full bg-[#DCDEEA] "
          />
        ) : (
          <RenderPbassCurrencyLogo iAddr={token.iaddress} />
        )}

        <p className=" text-base font-medium leading-none ">{token.label}</p>
      </div>
    </>
  )
}

const ToTokenField = () => {
  const {bridgeList} = useGetTokens()
  const chain = NetworkChain()
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure()
  const [list, setList] = useState<DestinationOption[]>()
  const [options, setOptions] = useState(list)
  const {fromToken} = useFormValues()
  const {control} = useFormContext()
  const {field} = useController({
    control,
    name: 'toToken',
    defaultValue: null,
  })
  const {data: logoList} = useGetTokenRef()
  const handleSearch = useCallback(
    (text: string) => {
      const filteredOptions = list!.filter(
        (option) =>
          option.iaddress.toLowerCase().includes(text.toLowerCase()) ||
          option.label.toLowerCase().includes(text.toLowerCase())
      )
      setOptions(filteredOptions)
    },
    [list]
  )

  useEffect(() => {
    if (fromToken && bridgeList) {
      const optionslist = DestinationOptions({
        from: fromToken,
        bridge: bridgeList,
        chain: chain,
      })

      setList(optionslist)
      setOptions(optionslist)
    }
  }, [fromToken, bridgeList, setList, chain])

  return (
    <>
      <button
        className={cn(
          'flex h-fit min-w-fit items-center justify-center rounded-lg border p-3 text-xl font-medium',
          field.value
            ? 'bg-[#F1F1F1] px-3  text-black'
            : 'bg-bluePrimary px-4 py-3 text-white hover:bg-[#417DFF]'
        )}
        onClick={(e) => {
          e.preventDefault()
          onOpen()
        }}
      >
        <ButtonText
          label={field.value?.label}
          logoRef={
            logoList?.filter(
              (t: {id: string; symbol: string; name: string}) =>
                t.symbol === field.value?.value.toUpperCase()
            )[0]?.id || ''
          }
          symbol={field.value?.currency}
          iAddr={field.value?.iaddress}
        />
        {/* {field.value?.label || 'Select Coin'}{' '}
        <Icons.chevronDown className="ml-2 h-4" /> */}
      </button>
      <Modal
        isOpen={isOpen}
        backdrop="opaque"
        size="md"
        scrollBehavior="inside"
        placement="center"
        onOpenChange={() => {
          onOpenChange()
          setOptions(list)
        }}
      >
        <ModalContent>
          <ModalHeader className="text-sm font-normal">
            Select a currency to receive
          </ModalHeader>
          <ModalBody>
            <SearchInput
              onChange={handleSearch}
              searchTitle="Search name or paste contract address"
            />

            <ul className="mr-1 space-y-1">
              {options?.map((token) => {
                return (
                  <li
                    onClick={() => {
                      field.onChange(token)
                      setOptions(list)
                      onClose()
                    }}
                    key={token.iaddress}
                    className="group flex cursor-pointer items-center justify-between py-2 pl-2 text-[#818181] hover:bg-[#f3f3f3] hover:text-black"
                  >
                    <Token
                      {...token}
                      logoRef={
                        logoList?.filter(
                          (t: {id: string; symbol: string; name: string}) =>
                            t.symbol === token.currency.toUpperCase()
                        )[0]?.id || ''
                      }
                    />
                    {/* {token.label} */}
                  </li>
                )
              })}
            </ul>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ToTokenField