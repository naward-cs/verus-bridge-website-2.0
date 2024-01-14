import React from 'react'

import {useFormValues} from '@/lib/hooks/formValues'

import ConvertWarn from './convertWarn'

const ConvertWarnForm = () => {
  const {fromToken, toToken} = useFormValues()

  if (fromToken?.iaddress === toToken?.iaddress) return null
  return <ConvertWarn />
}

export default ConvertWarnForm
