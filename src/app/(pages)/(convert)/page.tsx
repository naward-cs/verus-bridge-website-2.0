import {Card, CardBody, CardHeader} from '@nextui-org/react'

import Blockheights from '@/components/convertPage/blockheights'
import ConvertForm from '@/components/convertPage/convertForm'

export default function ConvertPage() {
  return (
    <main className="container flex flex-col items-center justify-cente mt-20 ">
      <div className="flex flex-col">
        <Blockheights />

        <Card radius="sm" className="mx-1 border border-black bg-transparent">
          <CardHeader className="pl-5">Convert/Send</CardHeader>
          <CardBody className="pt-0">
            <ConvertForm />
          </CardBody>
        </Card>
      </div>
    </main>
  )
}
