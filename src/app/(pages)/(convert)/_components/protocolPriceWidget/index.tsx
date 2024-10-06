// import {useWindowSize} from 'usehooks-ts'

import {Suspense} from 'react'

import Widget from './widget'

export const PriceWidgetFullScreen = () => {
  // if (width < 850) return null

  return (
    // <div className="mx-auto flex w-fit flex-col min-[850px]:hidden"></div>
    <div className="absolute right-0 top-[-30px] mr-[100%] hidden min-[850px]:block">
      <Suspense>
        <Widget />
      </Suspense>
    </div>
  )
}
export const PriceWidgetMobileScreen = () => {
  // if (width > 850) return null
  return (
    // <div className="mx-auto flex w-fit flex-col min-[850px]:hidden"></div>
    <div className="mx-auto flex w-fit flex-col min-[850px]:hidden">
      <Suspense>
        <Widget />
      </Suspense>
    </div>
  )
}
