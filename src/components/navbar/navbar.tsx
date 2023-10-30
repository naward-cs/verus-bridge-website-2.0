'use client'

import React, {useState} from 'react'
import NextLink from 'next/link'
import {usePathname} from 'next/navigation'
import menuList from '@/data/navbar.json'
import {
  Link,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
  Skeleton,
} from '@nextui-org/react'

import {cn} from '@/lib/utils/tailwindUtil'
import {Logo} from '@/components/shared/icons'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  return (
    <NextUINavbar
      maxWidth="2xl"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      classNames={{base: 'bg-[#f5f5f5] fixed'}}
      isBlurred={false}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        />
      </NavbarContent>
      <NavbarContent>
        <NavbarBrand>
          <Logo height={28} className="text-bluePrimary" />
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden gap-4 font-medium sm:flex" justify="end">
        {menuList.map((menu, index) => (
          <NavbarItem key={`${index}-${menu.title}-top`}>
            <Link
              href={menu.link}
              as={NextLink}
              className={cn(
                'text-bluePrimary hover:text-blue-700 hover:underline hover:opacity-100',
                pathname === menu.link && 'underline underline-offset-2'
              )}
            >
              {menu.title}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarMenu className="bg-[#f5f5f5] ">
        {menuList.map((menu, index) => (
          <NavbarMenuItem key={`${index}-${menu.title}-mobile`}>
            <Link className="w-full" href={menu.link} as={NextLink} size="lg">
              {menu.title}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NextUINavbar>
  )
}

export default Navbar
