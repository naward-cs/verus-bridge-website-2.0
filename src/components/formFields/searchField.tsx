import React, { memo, useState } from 'react';



import { Icons } from '@/components/shared/icons';



import { InputField } from './inputField';





interface SearchProps {
  onChange: (text: string) => void
  searchTitle: string
  trackText?: React.MutableRefObject<string>
}
const SearchField = ({searchTitle, onChange, trackText}: SearchProps) => {
  const [text, setText] = useState('')

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
    if (trackText) {
      trackText.current = e.target.value
    }
  }

  const handleClearText = () => {
    setText('')
    if (trackText) {
      trackText.current = ''
    }
  }

  return (
    <InputField
      color="background"
      isClearable
      value={text}
      placeholder={searchTitle}
      onChange={handleTextChange}
      onValueChange={onChange}
      onClear={handleClearText}
      startContent={
        <Icons.search className="pointer-events-none shrink-0 text-[#B6B6B6] " />
      }
    />
  )
}

export default memo(SearchField)