'use client'

import {extendVariants, Input as NextUiInput} from '@nextui-org/react'

export const Input = extendVariants(NextUiInput, {
  variants: {
    variant: {
      form: {
        input: [
          'bg-transparent',
          'text-black/90',
          'placeholder:text-default-700/50',
          'text-2xl',
        ],
        innerWrapper: 'bg-transparent',
        inputWrapper: [
          'shadow-none',
          'bg-transparent',
          'h-full',
          'group-data-[focus=true]:bg-tranparent',
          'data-[hover=true]:bg-transparent',
          '!cursor-text',
        ],
        errorMessage: 'font-medium',
      },
    },
    color: {
      transparent: {
        input: [
          'bg-transparent',
          'text-black/90',
          'placeholder:text-default-700/50',
          'text-[2rem]',
          'font-medium',
        ],
        innerWrapper: 'bg-transparent',
        inputWrapper: [
          'shadow-none',
          'bg-transparent',
          'h-full',
          'group-data-[focus=true]:bg-tranparent',
          'data-[hover=true]:bg-transparent',
          '!cursor-text',
          'pl-0',
        ],
      },
      background: {
        inputWrapper: [
          'border-[#787878]',
          'border',
          'rounded-lg',
          'bg-[#F3F3F3]',
        ],
        label: ['font-normal'],
      },
    },
  },
})
