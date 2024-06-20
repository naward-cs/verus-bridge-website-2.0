'use client'

import React, {useCallback, useMemo, useState} from 'react'
import {
  Checkbox,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react'
import {useController, useFormContext} from 'react-hook-form'
import {useAccount} from 'wagmi'

import {FromTokenName} from '@/lib/utils/correctTokenName'
import Search from '@/components/form/search'
import TokenButton from '@/components/form/tokenButton'

import Token from './token'

export const FromTokenModal = ({tokenList}: {tokenList: TokenList[]}) => {
  const {isConnected} = useAccount()
  const [filterValue, setFilterValue] = useState('')
  const hasSearchFilter = Boolean(filterValue)
  const [hideZero, setHideZero] = useState(isConnected ? true : false)

  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure()
  const {control, resetField} = useFormContext()

  const {field} = useController({
    control,
    name: 'fromToken',
    defaultValue: tokenList.find((t) => t.value === 'ETH'),
  })

  const filteredItems = useMemo(() => {
    let filteredTokens = [...tokenList]

    if (hasSearchFilter) {
      filteredTokens = filteredTokens.filter(
        (token) =>
          token.label.toLowerCase().includes(filterValue.toLowerCase()) ||
          token.erc20address.toLowerCase().includes(filterValue.toLowerCase())
      )
    }

    return filteredTokens
  }, [filterValue, hasSearchFilter, tokenList])

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

  const reset = () => onClear()
  const handleSelect = (token: TokenList) => {
    if (field.value.erc20address !== token.erc20address) {
      field.onChange(token)
      resetField('toToken')
      resetField('fromAmount')
    }

    onClose()
  }
  const correctField = FromTokenName(field.value?.label)

  return (
    <>
      <button
        className="flex h-fit min-w-fit items-center justify-center rounded-lg bg-white p-1 pr-3 text-xl font-medium hover:bg-[#EFEFEF] focus-visible:outline-none"
        onClick={(e) => {
          e.preventDefault()
          reset()
          onOpen()
        }}
      >
        <TokenButton
          label={correctField}
          symbol={field.value?.value}
          iAddr={field.value?.erc20address}
        />
      </button>
      <Modal
        isOpen={isOpen}
        backdrop="opaque"
        size="md"
        scrollBehavior="inside"
        placement="center"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader className="text-sm font-normal">
            Select a currency to convert/send
          </ModalHeader>
          <ModalBody>
            <Search
              onChange={handleSearch}
              onClear={onClear}
              searchTitle="Search name or paste contract address"
              text={filterValue}
            />
            <div className="-mx-6">
              {isConnected && (
                <div className="mx-6">
                  <Checkbox isSelected={hideZero} onValueChange={setHideZero}>
                    Hide tokens with 0 balance
                  </Checkbox>
                </div>
              )}
              <ul className="space-y-1 pb-2">
                {filteredItems?.map((token) => (
                  <li
                    onClick={() => handleSelect(token)}
                    key={token.iaddress}
                    className="text-[#818181] hover:bg-[#f3f3f3] hover:text-black"
                  >
                    <Token
                      token={token}
                
                      hideZero={hideZero}
                    />
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
