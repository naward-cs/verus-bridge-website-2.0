'use client'

import {useState} from 'react'
import {Modal, ModalContent, useDisclosure} from '@nextui-org/react'
import {FormProvider, useForm} from 'react-hook-form'
import {toast} from 'sonner'
import {useAccount, useChainId} from 'wagmi'
import {watchChainId} from 'wagmi/actions'

import {config} from '@/config/wagmi'
import AuthorizeTokenAmount from '@/lib/actions/authorizeTokenAmount'
import {getConfigOptions} from '@/lib/server/actions/getConfigOptions'
import {isValidVerusID} from '@/lib/server/validations/validVerusId'
import {isETHAddress, isRAddress} from '@/lib/utils'

import {ReviewForm} from './reviewForm'

const BaseForm = ({children}: {children: React.ReactNode}) => {
  const {address: account} = useAccount()

  const [txConfig, setTxConfig] = useState<TxConfigType | undefined>(undefined)
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure()
  const [, setStatus] = useState<'completed' | 'failed' | null>(null)
  const formMethods = useForm<ConvertFormData>({
    defaultValues: {
      fromAmount: '',
      toToken: undefined,
      toAddress: '',
      sendOnly: false,
      rAddress: '',
    },
    mode: 'onChange',
    reValidateMode: 'onSubmit',
  })
  //reset the form when switching between Mainnet and Testnet
  watchChainId(config, {
    onChange(chainId, prevChainId) {
      if (chainId !== prevChainId) formMethods.reset()
    },
  })
  const chainId = useChainId()

  const onSubmit = async (values: ConvertFormData) => {
    //check to make sure if VerusID, it is a valid before continuing
    let sendAddress = values.toAddress
    // let addressName: string | undefined
    if (!isETHAddress(sendAddress) && !isRAddress(sendAddress)) {
      const isValid = await isValidVerusID(chainId, sendAddress)
      if (isValid.error) {
        formMethods.setError('toAddress', {
          type: 'custom',
          message: isValid.error.message,
        })
      }
      sendAddress = isValid.result!.identityaddress as string
    }

    if (values.rAddress) {
      const authorize = await AuthorizeTokenAmount({
        fromToken: values.fromToken,
        amount: values.fromAmount.toString(),
        account: account!,
      })
      const txConfigs = await getConfigOptions({
        formInput: values,
        toAddress: sendAddress,
      })
      if (txConfigs?.error) {
        toast.error(txConfigs.error)
      } else {
        if (txConfigs && authorize) {
          const configs = txConfigs as Omit<TxConfigType, 'formValues'>
          setTxConfig({formValues: values, ...configs})
          onOpen()
        }
      }
    }
  }

  return (
    <>
      <FormProvider {...formMethods}>
        <form
          onSubmit={formMethods.handleSubmit(onSubmit)}
          className="flex flex-col space-y-1"
        >
          {children}
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
        isDismissable={false}
      >
        <ModalContent>
          {txConfig && (
            <ReviewForm
              onClose={onClose}
              setStatus={setStatus}
              account={account!}
              {...txConfig}
            />
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default BaseForm
