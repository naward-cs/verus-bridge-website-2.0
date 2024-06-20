'use client'

import React from 'react'
import {usePathname} from 'next/navigation'
import {Link} from '@nextui-org/react'

import {cn} from '@/lib/utils'

type NavMenu = {
  title: string
  link: string
}

const NavbarItemLink = (props: NavMenu) => {
  const {title, link} = props
  const pathName = usePathname()
  return (
    <Link
      href={link}
      className={cn(
        'text-bluePrimary hover:text-blue-700 hover:underline hover:opacity-100',
        pathName === link && 'underline underline-offset-2'
      )}
    >
      {title}
    </Link>
  )
}

export default NavbarItemLink
