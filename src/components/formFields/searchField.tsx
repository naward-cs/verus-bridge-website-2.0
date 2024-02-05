import React, {memo, useState} from 'react'

import {Icons} from '@/components/shared/icons'

import {InputField} from './inputField'

interface SearchProps {
  onChange: (text: string) => void
  searchTitle: string
}
const SearchField = ({searchTitle, onChange}: SearchProps) => {
  const [text, setText] = useState('')
  return (
    <InputField
      color="background"
      isClearable
      value={text}
      placeholder={searchTitle}
      onChange={(e) => setText(e.target.value)}
      onValueChange={onChange}
      onClear={() => setText('')}
      startContent={
        <Icons.search className="pointer-events-none shrink-0 text-[#B6B6B6] " />
      }
    />
  )
}

export default memo(SearchField)
