import {getTokenList} from '@/lib/server/actions/getTokenList'

import ClaimForm from './_components/claimForm'

export default async function ClaimsPage() {
  const tokenList = await getTokenList()
  return (
    <main className="container my-20 flex flex-col items-center justify-center ">
      <ClaimForm tokenList={tokenList} />
      {/* <div className="flex flex-col">
        <Card radius="sm" className="mx-1 border border-black bg-transparent">
          <CardHeader className="pl-5">Claim Fees or Refunds</CardHeader>
          <CardBody className="pt-0">
            <ClaimForm />
          </CardBody>
        </Card>
      </div> */}
    </main>
  )
}
