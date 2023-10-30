import {env} from '@/config/env.mjs'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'

import TailwindIndicator from './tailwindIndicator'

const DevProvider = () => {
  if (env.NODE_ENV === 'production') return null
  return (
    <>
      <TailwindIndicator />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  )
}

export default DevProvider
