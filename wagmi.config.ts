import {defineConfig} from '@wagmi/cli'
import {actions, react} from '@wagmi/cli/plugins'

import {delegator} from '@/config/abi/DelegatorAbi'

export default defineConfig({
  out: 'src/generated.ts',
  contracts: [
    {
      name: 'delegator',
      abi: delegator,
      address: {
        1: '0x71518580f36feceffe0721f06ba4703218cd7f63',
        // 5: '0x85a7dE2278E52327471e174AeeB280cdFdC6A68a',
        11155111: '0x84fd35f61D1D66C233A461D69dfF03E6753fc9eb',
      },
    },
  ],
  plugins: [actions(), react()],
})
