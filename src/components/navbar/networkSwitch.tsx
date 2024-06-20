import {useEffect} from 'react'
import {useRouter} from 'next/navigation'
import {useSwitchChain} from 'wagmi'

const NetworkSwitch = ({
  chainID,
  close,
}: {
  chainID: number
  close: () => void
}) => {
  const {chains, switchChain, isPending, isSuccess} = useSwitchChain()
  const router = useRouter()
  useEffect(() => {
    if (isSuccess) {
      // window.location.reload() //last resort for window reload to refresh page
      router.refresh()
      close()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])
  return (
    <>
      {chains.map((chain) => (
        <button
          key={chain.id}
          onClick={() => switchChain({chainId: chain.id})}
          disabled={chain.id === chainID || isPending}
          className="min-h-[42px] min-w-[232px] rounded-xl bg-bluePrimary p-2.5 text-center text-white disabled:bg-[#969696] "
        >
          {chain.name}
        </button>
      ))}
    </>
  )
}

export default NetworkSwitch
