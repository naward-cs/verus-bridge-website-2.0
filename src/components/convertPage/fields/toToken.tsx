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
import {GetSendList} from '@/lib/utils/splitTokenList'
import SearchInput from '@/components/formFields/searchField'

import ButtonText from './toFromTokenButtonText'
import ToTokenList from './toTokenList'

const ToTokenField = () => {
  const {bridgeList, tokenList} = useGetTokens()
  const chain = NetworkChain()
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure()
  const {selectedFromToken, toAddress} = useFormValues()
  const [verusList, setVerusList] = useState<DestinationOption[]>()
  const [verusOptions, setVerusOptions] = useState(verusList)
  const [ethList, setEthList] = useState<DestinationOption[] | undefined>()
  const [ethOptions, setEthOptions] = useState(ethList)
  const {control} = useFormContext()
  const {field} = useController({
    control,
    name: 'toToken',
    defaultValue: null,
  })

  const handleSearch = useCallback(
    (text: string) => {
      const filteredVerusOptions = verusList!.filter(
        (option) =>
          option.iaddress.toLowerCase().includes(text.toLowerCase()) ||
          option.label.toLowerCase().includes(text.toLowerCase())
      )
      let filteredEthOptions
      if (ethList) {
        filteredEthOptions = ethList.filter(
          (option) =>
            option.iaddress.toLowerCase().includes(text.toLowerCase()) ||
            option.label.toLowerCase().includes(text.toLowerCase())
        )
      }

      setVerusOptions(filteredVerusOptions)
      setEthOptions(filteredEthOptions)
    },
    [ethList, verusList]
  )

  useEffect(() => {
    if (selectedFromToken && bridgeList) {
      const sendList = GetSendList(tokenList!, chain)
      const {vOptions, eOptions} = DestinationOptions({
        from: selectedFromToken,
        sendList,
        bridge: bridgeList,
      })
      setVerusList(vOptions)
      setEthList(eOptions)
      setVerusOptions(vOptions)
      setEthOptions(eOptions)
    }
  }, [selectedFromToken, bridgeList, tokenList, chain])
  return (
    <>
      <button
        className={cn(
          'flex h-fit min-w-fit items-center justify-center rounded-lg border p-1 pr-3 text-xl font-medium',
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
          setVerusOptions(verusList)
          setEthOptions(ethList)
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
            <div className="-mx-6 max-h-[410px] overflow-y-auto">
              {/* this section for verus chain */}
              <ToTokenList
                toAddress={toAddress}
                listType="verus"
                options={verusOptions}
                verusList={verusList}
                ethList={ethList}
                fieldChange={field.onChange}
                setVerusOptions={setVerusOptions}
                setEthOptions={setEthOptions}
                onClose={onClose}
              />

              {/* this section for eth chain */}
              <ToTokenList
                toAddress={toAddress}
                listType="eth"
                options={ethOptions}
                verusList={verusList}
                ethList={ethList}
                fieldChange={field.onChange}
                setVerusOptions={setVerusOptions}
                setEthOptions={setEthOptions}
                onClose={onClose}
              />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ToTokenField
