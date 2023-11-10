import { defineConfig } from '@wagmi/cli';
import {react} from '@wagmi/cli/plugins'

import DELEGATORABI from '@/config/abi/DelegatorAbi'



import type { Abi } from 'viem';


export const DelegatorAbi = DELEGATORABI as Abi
export default defineConfig({
  out: 'src/generated.ts',
  contracts: [
    {
      name: 'delegator',
      abi: DelegatorAbi,
      address: {
        1: '0x71518580f36feceffe0721f06ba4703218cd7f63',
        5: '0x85a7dE2278E52327471e174AeeB280cdFdC6A68a',
      },
    },
  ],
  plugins: [react()],
})