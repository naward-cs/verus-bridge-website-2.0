import {useEffect, useRef} from 'react'

const usePreviousNumber = (value: string | number) => {
  const ref = useRef<string | number>()
  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

export default usePreviousNumber
