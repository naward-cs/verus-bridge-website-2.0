import {createEnv} from '@t3-oss/env-nextjs'
import {z} from 'zod'

//TODO: does delegator contracts need to be options?
export const env = createEnv({
  server: {
    VERUS_MAINNET_API: z.string().url(),
    VERUS_TESTNET_API: z.string().url(),
  },
  shared: {
    NODE_ENV: z.enum(['development', 'production']),
  },
  client: {
    NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID: z.string({
      required_error:
        'You must have a walletconnect ID, go to https://cloud.walletconnect.com/sign-in to create an ID',
    }),

    NEXT_PUBLIC_INFURA_KEY: z.string().optional(),
    NEXT_PUBLIC_TESTNET_ONLY: z.coerce.boolean(),
    NEXT_PUBLIC_MAINNET_DELEGATOR: z.string(),
    NEXT_PUBLIC_TESTNET_DELEGATOR: z.string(),
  },
  experimental__runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID:
      process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
    NEXT_PUBLIC_INFURA_KEY: process.env.NEXT_PUBLIC_INFURA_KEY,
    NEXT_PUBLIC_MAINNET_DELEGATOR: process.env.NEXT_PUBLIC_MAINNET_DELEGATOR,
    NEXT_PUBLIC_TESTNET_DELEGATOR: process.env.NEXT_PUBLIC_TESTNET_DELEGATOR,
    NEXT_PUBLIC_TESTNET_ONLY: process.env.NEXT_PUBLIC_TESTNET_ONLY,
  },

  /**
   * By default, this library will feed the environment variables directly to
   * the Zod validator.
   *
   * This means that if you have an empty string for a value that is supposed
   * to be a number (e.g. `PORT=` in a ".env" file), Zod will incorrectly flag
   * it as a type mismatch violation. Additionally, if you have an empty string
   * for a value that is supposed to be a string with a default value (e.g.
   * `DOMAIN=` in an ".env" file), the default value will never be applied.
   *
   * In order to solve these issues, we recommend that all new projects
   * explicitly specify this option as true.
   */
  emptyStringAsUndefined: true,
})
