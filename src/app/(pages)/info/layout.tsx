import PageTop from './_components/pageTop'

const InfoLayout = (props: {
  children: React.ReactNode
  pricetable: React.ReactNode
}) => {
  return (
    <main className="mb-28 flex min-h-screen flex-col items-center justify-between space-y-16 pt-16 transition-[padding] ease-in-out md:pt-20 lg:pt-40">
      <div className="flex w-full max-w-5xl flex-col items-stretch justify-center space-y-10 text-sm md:p-4 lg:p-0">
        <PageTop />
      </div>
      <div className="w-full max-w-5xl items-start justify-between gap-4 space-y-10 p-4 text-sm md:flex md:space-y-0 lg:p-0 ">
        {props.pricetable}
        {props.children}
      </div>
    </main>
  )
}

export default InfoLayout
