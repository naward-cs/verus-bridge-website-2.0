import {useChainId} from 'wagmi'

// const etherScanGoerli = 'https://goerli.etherscan.io/'
const etherScanMainnet = 'https://etherscan.io/'
const etherScanSepolia = 'https://sepolia.etherscan.io'
export const useEtherScan = () => {
  const chainId = useChainId()

  return chainId === 1 ? etherScanMainnet : etherScanSepolia
}