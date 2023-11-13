import {Card, CardBody, CardHeader} from '@nextui-org/react'

export default function ClaimsPage() {
  return (
    <main className="container flex flex-col items-center justify-center ">
      <div className="flex flex-col">
        <Card radius="sm" className="mx-1 border border-black bg-transparent">
          <CardHeader className="pl-5">Claim</CardHeader>
          <CardBody className="pt-0">claim form</CardBody>
        </Card>
      </div>
    </main>
  )
}
