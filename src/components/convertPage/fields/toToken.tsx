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
import {Icons} from '@/components/shared/icons'

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
          'flex h-fit min-w-fit items-center justify-center rounded-lg border p-3 text-xl font-medium',
          field.value
            ? 'border-black bg-[#F1F1F1] px-3  text-black'
            : 'bg-bluePrimary px-4 py-3  text-white'
        )}
        onClick={(e) => {
          e.preventDefault()
          onOpen()
        }}
      >
        {field.value?.label || 'Select Coin'}{' '}
        <Icons.chevronDown className="ml-2 h-4" />
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
            Select a token to convert to/destination
          </ModalHeader>
          <ModalBody>
            <SearchInput
              onChange={handleSearch}
              searchTitle="Search name or paste contract address"
            />

            <ul>
              {options?.map((token) => (
                <li
                  onClick={() => {
                    field.onChange(token)
                    setOptions(list)
                    onClose()
                  }}
                  key={token.iaddress}
                  className="flex cursor-pointer justify-between hover:font-bold"
                >
                  {token.label}
                </li>
              ))}
            </ul>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ToTokenField
