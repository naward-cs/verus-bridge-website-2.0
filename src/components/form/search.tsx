import React, {memo} from 'react'

import {Icons} from '@/components/shared/icons'

import {Input} from './input'

interface SearchProps {
  text: string
  onChange: (value?: string) => void
  onClear: () => void
  searchTitle: string
}
const Search = ({text, onChange, onClear, searchTitle}: SearchProps) => {
  return (
    <Input
      color="background"
      isClearable
      value={text}
      placeholder={searchTitle}
      onValueChange={onChange}
      onClear={onClear}
      startContent={
        <Icons.search className="pointer-events-none shrink-0 text-[#B6B6B6] " />
      }
    />
  )
}

export default memo(Search)
