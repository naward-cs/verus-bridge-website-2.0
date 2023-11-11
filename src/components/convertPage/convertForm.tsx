'use client';

import React, { useState } from 'react';
import {useDelegatorBridgeConverterActive} from '@/generated'
import {AddressZero} from '@ethersproject/constants'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react'
import {FormProvider, useForm} from 'react-hook-form'
import {toast} from 'sonner'
import {useAccount, useNetwork, useWaitForTransaction} from 'wagmi'

import {useEthers} from '@/lib/hooks/ethers'
import {DelegatorAddress, NetworkChain} from '@/lib/hooks/network'
import {useGetTokens} from '@/lib/hooks/tokens'
import {isValidVerusID} from '@/lib/server/verusQueries'
import {AuthorizeTokenAmount} from '@/lib/utils/authorizeERC20'
import {isETHAddress, isRAddress} from '@/lib/utils/rules'
import {getConfigOptions} from '@/lib/utils/txConfig'
import {Icons} from '@/components/shared/icons'

import warnToast from '../shared/warnToast'
import Address from './fields/address'
import Amount from './fields/amount'
import ConvertAmount from './fields/convertAmount'
import ConvertRate from './fields/convertRate'
import ConvertWarn from './fields/convertWarn'
import FromTokenField from './fields/fromToken'
import MaxAmountButton from './fields/maxButton'
import SubmitButton from './fields/submit'
import ToTokenField from './fields/toToken'
import FinalReview from './finalReview'





const ConvertForm = () => {
  const {address: account, isConnected} = useAccount()
  const chainId = NetworkChain()
  const {chain} = useNetwork()
  const {refundAddresses, error: signError, signMsg} = useEthers()

  const {data: isActive} = useDelegatorBridgeConverterActive({
    chainId: chainId,
    watch: true,
    staleTime: 2_000,
  })
  const delegatorAddr = DelegatorAddress()
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure()
  const {bridgeList} = useGetTokens()

  const [txConfig, setTxConfig] = useState<TxConfigType | undefined>(undefined)
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>()
  const formMethods = useForm<ConvertFormData>({
    defaultValues: {
      fromAmount: '',
      toToken: undefined,
      toAddress: '',
    },
    mode: 'onChange',
    reValidateMode: 'onSubmit',
  })

  const CheckIfReady = async (account: `0x${string}`) => {
    if (refundAddresses && account) {
      if (refundAddresses[account]) {
        return refundAddresses[account]
      }
    }
    warnToast(
      'You do not have a Verus Refund address. Please sign message to creating a Verus Refund address.'
    )
    await signMsg()
    if (signError) {
      toast.error(
        'You must agree to create a public key address for Verus Refunds before sending or converting'
      )
      return null
    } else {
      const keys = localStorage.getItem('refundAddresses')
      if (keys) {
        const publicKeyList = JSON.parse(keys)
        return publicKeyList[account!]
      }
    }
  }

  const onSubmit = async (values: ConvertFormData) => {
    //check to make sure if VerusID, it is valid before continuing
    let sendAddress = values.toAddress
    // let addressName: string | undefined
    if (!isETHAddress(sendAddress) && !isRAddress(sendAddress)) {
      const isValid = await isValidVerusID(chain!.id, sendAddress)
      if (isValid.error) {
        formMethods.setError('toAddress', {
          type: 'custom',
          message: isValid.error.message,
        })
      }
      sendAddress = isValid.result!.identityaddress as string
    }

    const rAddress = await CheckIfReady(account!)

    if (rAddress) {
      if (values.fromToken.erc20address !== AddressZero) {
        //if ERC-20 Token, get approval to spend
        await AuthorizeTokenAmount({
          token: values.fromToken,
          amount: values.fromAmount.toString(), //to string just in case
          chain: chain!,
          account: account,
          delegatorAddr: delegatorAddr,
        })
      }
      const txConfigs = await getConfigOptions({
        formInput: values,
        toAddress: sendAddress,
        poolAvailable: Boolean(isActive),
        bounceBackAddr: rAddress,
        bridgeList: bridgeList!,
        chain: chain!.id,
      })

      if (txConfigs) {
        setTxConfig({formValues: values, ...txConfigs})
        onOpen()
      }
    }
  }

  useWaitForTransaction({
    hash: txHash,
    enabled: !!txHash,
    timeout: 240_000, //4 minutes
    onReplaced(data) {
      toast(`Transaction change of ${data.reason}`)
    },
    onSuccess(data) {
      toast.success(`Transaction successful ${data.transactionHash}`)
      setTxHash(undefined)
    },
    onError(err) {
      console.error('Transaction Error', err)
      toast.error('Something went wrong with transaction')
    },
  })

  return (
    <>
      <FormProvider {...formMethods}>
        <form
          className="flex flex-col space-y-1"
          onSubmit={formMethods.handleSubmit(onSubmit)}
        >
          <div className="flex-col space-y-2 rounded-lg bg-[#DDD] p-4">
            <div className="flex flex-col gap-1 md:flex-row">
              <Amount />
              <FromTokenField />
            </div>
            <MaxAmountButton />
          </div>
          <div className="relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 items-center justify-center rounded-full border-4 border-[#F1F1F1] bg-[#ddd] p-[3px] text-center align-middle">
              <Icons.arrowDown className="h-4 w-4 text-[#969696]" />
            </div>
          </div>
          <div className="flex  flex-col justify-center  space-y-2 rounded-lg bg-[#DDD] p-4 py-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <ConvertAmount />
              <ToTokenField />
            </div>
            <ConvertWarn />
          </div>
          <ConvertRate />
          {isConnected && <Address />}
          <SubmitButton />
        </form>
      </FormProvider>
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
            Confirm conversion
          </ModalHeader>
          <ModalBody>
            {txConfig && (
              <FinalReview
                setHash={setTxHash}
                closeModal={onClose}
                account={account!}
                {...txConfig}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ConvertForm