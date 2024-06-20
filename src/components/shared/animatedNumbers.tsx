import {useEffect, useRef, useState} from 'react'
import {motion} from 'framer-motion'

import usePreviousNumber from '@/lib/hooks/web/usePreviousNumber'
import {cn} from '@/lib/utils'

const formatForDisplay = (num = 0, fix: number) => {
  return parseFloat(Math.max(num, 0).toString())
    .toFixed(fix)
    .split('')
    .reverse()
}

const DecimalColumn = () => {
  return (
    <div>
      <span>.</span>
    </div>
  )
}

const CommaColumn = () => {
  return (
    <div>
      <span>,</span>
    </div>
  )
}

const NumberColumn = ({
  digit,
  delta,
  defaultClass,
}: {
  digit: string
  delta: string
  defaultClass: string
}) => {
  const [position, setPosition] = useState(0)
  const [animationClass, setAnimationClass] = useState('')
  const previousDigit = usePreviousNumber(digit)
  const columnContainer = useRef<HTMLDivElement>(null)

  const setColumnToNumber = (num: string) => {
    setPosition(
      (columnContainer?.current?.clientHeight || 0) * parseInt(num, 10)
    )
  }

  useEffect(
    () => setAnimationClass(previousDigit !== digit ? delta : ''),
    [digit, delta, previousDigit]
  )

  useEffect(() => setColumnToNumber(digit), [digit])

  return (
    <div ref={columnContainer} className="relative">
      <motion.div
        animate={{y: position}}
        className={cn(
          'absolute bottom-0 h-[1000%]',
          animationClass !== '' ? animationClass : defaultClass
        )}
        onAnimationComplete={() => setAnimationClass('')}
      >
        {[9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((n) => (
          <div key={n} className="h-[10%]">
            <span>{n}</span>
          </div>
        ))}
      </motion.div>
      <span className="invisible">0</span>
    </div>
  )
}

const AnimatedNumbers = ({
  value,
  fix = 2,
  defaultClass = '',
}: {
  value: number
  fix: number
  defaultClass: string
}) => {
  const numArray = formatForDisplay(value, fix)
  const previousNumber = usePreviousNumber(value)
  let delta = ''
  if (value > Number(previousNumber)) delta = 'text-green-500' //increase
  if (value < Number(previousNumber)) delta = 'text-red-500' //decrease

  return (
    <motion.div
      layout
      className="relative my-auto flex h-full flex-row-reverse overflow-hidden text-xs md:text-sm"
    >
      {numArray.map((n, i) =>
        n === '.' ? (
          <DecimalColumn key={i} />
        ) : n === ',' ? (
          <CommaColumn key={i} />
        ) : (
          <NumberColumn
            key={i}
            digit={n}
            delta={delta}
            defaultClass={defaultClass}
          />
        )
      )}
    </motion.div>
  )
}

export default AnimatedNumbers
