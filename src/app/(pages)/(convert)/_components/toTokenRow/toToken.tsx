'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { cn, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/react';
import { useController, useFormContext } from 'react-hook-form';



import { useFormValues } from '@/lib/hooks/form';
import { isETHAddress } from '@/lib/utils';
import { createOptionsList } from '@/lib/utils/converters/createToTokenList';
import { ToTokenName } from '@/lib/utils/correctTokenName';
import Search from '@/components/form/search';
import TokenButton from '@/components/form/tokenButton';



import { ToTokenList } from './tokenList';





type TokenModalProps = {
  sendList: Record<string, DestinationOption[]>
  bridgeList: Record<string, DestinationOption>
  tokenList: TokenList[]
}

const ToTokenModal = (props: TokenModalProps) => {
  const {control} = useFormContext()
  const [filterValue, setFilterValue] = useState('')
  const hasSearchFilter = Boolean(filterValue)
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure()
  const {fromToken, toAddress} = useFormValues()

  const optionsList = createOptionsList({
    from: fromToken,
    sendList: props.sendList,
    bridge: props.bridgeList,
  })

  const {field} = useController({
    control,
    name: 'toToken',
    defaultValue: null,
  })

  const filteredItems = useMemo(() => {
    let filteredEthTokens = [...optionsList.eOptions]
    let filteredVerusTokens = [...optionsList.vOptions]
    if (hasSearchFilter) {
      filteredEthTokens = filteredEthTokens.filter(
        (token) =>
          token.label.toLowerCase().includes(filterValue.toLowerCase()) ||
          token.iaddress.toLowerCase().includes(filterValue.toLowerCase())
      )
      filteredVerusTokens = filteredVerusTokens.filter(
        (token) =>
          token.label.toLowerCase().includes(filterValue.toLowerCase()) ||
          token.iaddress.toLowerCase().includes(filterValue.toLowerCase())
      )
    }
    return {eOptions: filteredEthTokens, vOptions: filteredVerusTokens}
  }, [filterValue, hasSearchFilter, optionsList.eOptions, optionsList.vOptions])

  const handleSearch = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value)
    } else {
      setFilterValue('')
    }
  }, [])

  const onClear = useCallback(() => {
    setFilterValue('')
  }, [])

  const handleSelect = (token: DestinationOption) => {
    field.onChange(token)
    onClose()
  }

  const correctField = ToTokenName(field.value?.label) || undefined
  //temp fix
  let tokenCurrency = field.value?.currency
  if (correctField?.verusToken === 'VBRID') {
    tokenCurrency = correctField.verusToken
  }

  const subButtonValue = toAddress
    ? isETHAddress(toAddress)
      ? correctField?.ethToken
      : correctField?.verusToken
    : correctField?.verusToken
  return (
    <>
      <button
        className={cn(
          'flex h-fit min-w-fit flex-col rounded-lg border p-1 pr-3 text-xl font-medium',
          field.value
            ? 'bg-white  text-black hover:bg-[#EFEFEF]'
            : 'bg-bluePrimary pl-3 text-white hover:bg-[#417DFF]'
        )}
        onClick={(e) => {
          e.preventDefault()
          onOpen()
        }}
      >
        <TokenButton
          label={correctField?.name}
          symbol={tokenCurrency}
          iAddr={field.value?.iaddress}
        />

        <span className="text-xs text-[#818181]">{subButtonValue}</span>
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
            Select a currency to receive
          </ModalHeader>
          <ModalBody>
            <Search
              onChange={handleSearch}
              onClear={onClear}
              searchTitle="Search name or paste contract address"
              text={filterValue}
            />
            <div className="-mx-6 max-h-[410px] overflow-y-auto">
              {/* this section for verus chain */}
              {filteredItems.vOptions.length > 0 && (
                <ToTokenList
                  listType="verus"
                  toAddress={toAddress}
                  tokens={filteredItems.vOptions}
                  select={handleSelect}
                />
              )}
              {/* this section for eth chain */}
              {filteredItems.eOptions.length > 0 && (
                <ToTokenList
                  listType="eth"
                  toAddress={toAddress}
                  tokens={filteredItems.eOptions}
                  select={handleSelect}
                  tokenList={props.tokenList}
                />
              )}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ToTokenModal