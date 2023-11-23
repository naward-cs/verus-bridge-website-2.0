import React, {useCallback, useState} from 'react'
import {
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react'
import {useController, useFormContext} from 'react-hook-form'

import {EtherScan} from '@/lib/hooks/etherScan'
import {useIsMounted} from '@/lib/hooks/mounted'
import {useGetTokens} from '@/lib/hooks/tokens'
import SearchInput from '@/components/formFields/searchField'
import {Icons} from '@/components/shared/icons'


const FromTokenField = () => {
  const {control, resetField} = useFormContext()
  const etherScan = EtherScan()
  const isMounted = useIsMounted()
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure()
  const {tokenList} = useGetTokens()
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
        className="flex h-fit min-w-fit items-center justify-center rounded-lg border border-black  bg-[#F1F1F1] p-3 text-xl font-medium"
        disabled
      >
        Select Coin
        <Icons.chevronDown className="ml-2 h-4" />
      </button>
    )
  return (
    <>
      <button
        className="flex h-fit min-w-fit items-center justify-center rounded-lg border border-black  bg-[#F1F1F1] p-3 text-xl font-medium"
        onClick={(e) => {
          e.preventDefault()
          setTokens(tokenList)
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
        }}
      >
        <ModalContent>
          <ModalHeader className="text-sm font-normal">
            Select a token to convert from
          </ModalHeader>
          <ModalBody>
            <SearchInput
              onChange={handleSearch}
              searchTitle="Search name or paste contract address"
            />
            <ul>
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
                  className="flex cursor-pointer justify-between hover:font-bold"
                >
                  <div>{token.label}</div>
                  <div className="flex w-2/5 justify-between">
                    <div>{/* {balance?.formatted} {token.value} */}</div>

                    <Link
                      isExternal
                      className="underline"
                      href={etherScan + 'address/' + token.erc20address}
                    >
                      contract
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default FromTokenField
