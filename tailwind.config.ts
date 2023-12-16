import {nextui} from '@nextui-org/react'

import type {Config} from 'tailwindcss'

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        bluePrimary: 'hsl(var(--blue-primary) / <alpha-value>)',
        blueSecondary: 'hsl(var(--blue-secondary)/<alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        robo: ['var(--font-robo)'],
        geo: ['var(--font-geo)'],
      },
      listStyleImage: {
        checkmark: 'url("/images/check-mark-button.png")',
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
}
export default config
