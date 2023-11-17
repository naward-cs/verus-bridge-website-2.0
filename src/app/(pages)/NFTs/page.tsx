'use client';

import ConnectButton from '@/components/navbar/connectButton';
import NFTsSection from '@/components/nftPage/nftSection'





// import ThirdWeb from '@/components/providers/thirdWeb';

// import ThirdWeb from '@/components/providers/thirdWeb'

export default function NFTsPage() {
  const con = true
  if (!con) {
    return (
      <main className="container flex flex-col items-center justify-center ">
        <div className="flex flex-col space-y-4">
          <h1 className="text-center text-2xl font-medium">
            Tranfer your NFTs
          </h1>
          <h3 className="text-center text-base opacity-60 ">
            Connect your Ethereum wallet to see your transferrable NFTs
          </h3>
          <div className="mx-auto max-w-sm">
            <ConnectButton />
          </div>
        </div>
      </main>
    )
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container z-10 w-full max-w-5xl items-center justify-between space-y-4 ">
        <h1 className="text-center text-2xl font-medium">Tranfer your NFTs</h1>
        <p className="text-center">Comming soon</p>
        <NFTsSection />
        {/* <ThirdWeb>
        // <NFTsSection />
        </ThirdWeb> */}
      </div>
    </main>
  )
}