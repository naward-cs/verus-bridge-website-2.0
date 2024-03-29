import React, {useCallback, useEffect, useState} from 'react'
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
import {useGetTokens} from '@/lib/hooks/tokens'
import {DestinationOptions} from '@/lib/utils/destinationOptions'
import SearchInput from '@/components/formFields/searchField'
import CoinLogos from '@/components/shared/coinLogos'

import ButtonText from './toFromTokenButtonText'

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
          'flex h-fit min-w-fit items-center justify-center rounded-lg border pr-3 p-1 text-xl font-medium',
          field.value
            ? 'bg-white  text-black hover:bg-[#EFEFEF]'
            : 'bg-bluePrimary pl-3 text-white hover:bg-[#417DFF]'
        )}
        onClick={(e) => {
          e.preventDefault()
          onOpen()
        }}
      >
        <ButtonText
          label={field.value?.label}
          symbol={field.value?.currency}
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
                    <div className="flex items-center space-x-2 ">
                      <CoinLogos
                        symbol={token.currency}
                        iAddr={token.iaddress}
                      />

                      <p className=" text-base font-medium leading-none ">
                        {token.label}
                      </p>
                    </div>
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
