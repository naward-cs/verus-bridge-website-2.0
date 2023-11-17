import React from 'react'

const InfoLayout = (props: {
  children: React.ReactNode
  pricetable: React.ReactNode
}) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 pt-24 sm:p-24 md:pt-40">
      <div className="z-10  w-full max-w-5xl items-start justify-between gap-4 space-y-10 text-sm md:flex md:space-y-0 ">
        {props.pricetable}
        {props.children}
      </div>
    </main>
  )
}

export default InfoLayout
