import React, {memo} from 'react'

import {Icons} from '@/components/shared/icons'

import {InputField} from './inputField'

interface SearchProps {
  onChange: (text: string) => void
  searchTitle: string
}
const SearchField = ({searchTitle, onChange}: SearchProps) => {
  return (
    <InputField
      color="background"
      isClearable
      placeholder={searchTitle}
      onChange={(e) => onChange(e.target.value)}
      onValueChange={onChange}
      startContent={
        <Icons.search className="pointer-events-none shrink-0 text-[#B6B6B6] " />
      }
    />
  )
}

export default memo(SearchField)
