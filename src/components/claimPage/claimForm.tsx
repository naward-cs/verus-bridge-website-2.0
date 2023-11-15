'use client'

import React from 'react'
import {FormProvider, useForm} from 'react-hook-form'

import RadioField from './radioField'

const ClaimForm = () => {
  const formMethods = useForm({
    defaultValues: {
      claimMethod: 'claimType',
      toAddress: '',
      token: '',
    },
    mode: 'onChange',
    reValidateMode: 'onSubmit',
  })

  const onSubmit = async () => {
    return
  }
  return (
    <>
      <FormProvider {...formMethods}>
        <form
          className="flex flex-col space-y-1"
          onSubmit={formMethods.handleSubmit(onSubmit)}
        >
          <RadioField />
        </form>
      </FormProvider>
    </>
  )
}

export default ClaimForm
