import { defineConfig } from '@wagmi/cli';
import {erc, react} from '@wagmi/cli/plugins'

import {delegator} from '@/config/abi/DelegatorAbi'
import {erc1155} from '@/config/abi/ERC1155Abi'

// import type {Abi} from 'viem'

// export const DelegatorAbi = delegator as Abi
export default defineConfig({
  out: 'src/generated.ts',
  contracts: [
    {
      name: 'delegator',
      abi: delegator,
      address: {
        1: '0x71518580f36feceffe0721f06ba4703218cd7f63',
        5: '0x85a7dE2278E52327471e174AeeB280cdFdC6A68a',
      },
    },
    {
      name: 'erc1155',
      abi: erc1155,
    },
  ],
  plugins: [react(), erc({20: true, 721: true})],
})