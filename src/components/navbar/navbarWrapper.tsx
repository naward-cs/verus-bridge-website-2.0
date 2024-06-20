'use client'

import React, {useEffect, useState} from 'react'
import {usePathname} from 'next/navigation'
import {Navbar, NavbarContent, NavbarMenuToggle} from '@nextui-org/react'

const NavbarWrapper = ({children}: {children: React.ReactNode}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathName = usePathname()
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathName])

  return (
    <Navbar
      maxWidth="2xl"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      classNames={{base: 'bg-[#f5f5f5] fixed'}}
      isBlurred={false}
    >
      <NavbarContent className="md:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        />
      </NavbarContent>
      {children}
    </Navbar>
  )
}

export default NavbarWrapper
