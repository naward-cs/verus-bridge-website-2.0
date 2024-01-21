import {Card, CardBody, CardHeader} from '@nextui-org/react'

import ClaimForm from '@/components/claimPage/claimForm'

export default function ClaimsPage() {
  return (
    <main className="container flex flex-col items-center justify-center mt-20 ">
      <div className="flex flex-col">
        <Card radius="sm" className="mx-1 border border-black bg-transparent">
          <CardHeader className="pl-5">Claim Fees or Refunds</CardHeader>
          <CardBody className="pt-0">
            <ClaimForm />
          </CardBody>
        </Card>
      </div>
    </main>
  )
}
