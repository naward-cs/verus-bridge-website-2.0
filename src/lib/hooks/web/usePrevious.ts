import {useEffect, useRef} from 'react'

import type {MutableRefObject} from 'react'

export function usePrevious<T>(
  value: T
): MutableRefObject<T | undefined>['current'] {
  const ref = useRef<T>()
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}

export function usePreviousPersistent<T>(
  value: T
): MutableRefObject<T | undefined>['current'] {
  // initialise the ref with previous and current values
  const ref = useRef<{value: T; prev: T | undefined}>({
    value: value,
    prev: undefined,
  })
  const current = ref.current.value
  // if the value passed into hook doesn't match what we store as "current"
  // move the "current" to the "previous"
  // and store the passed value as "current"
  if (value !== current) {
    ref.current = {
      value: value,
      prev: current,
    }
  }
  // return the previous value only
  return ref.current.prev
}
