'use client'

import {createContext, useContext} from 'react'

import type {Selection} from '@nextui-org/react'

type WidgetContextProps = {
  fromValue: Selection
  setFromValue: (fromValue: Selection) => void
  toValue: Selection
  setToValue: (toValue: Selection) => void
}
export const WidgetContext = createContext<WidgetContextProps>(
  {} as WidgetContextProps
)

export const useWidgetContext = () => useContext(WidgetContext)
