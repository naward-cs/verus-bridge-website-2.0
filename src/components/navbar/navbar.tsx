import React, {Suspense} from 'react'
import menuList from '@/data/navbar.json'
import {
  Link,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
} from '@nextui-org/react'

import {Logo} from '@/components/shared/icons'

import {Web3Skeleton} from '../skeletons/web3Skeleton'
import NavbarItemLink from './navbarItemLink'
import NavbarWrapper from './navbarWrapper'
import NetworkStatus from './networkStatus'
import Web3Button from './web3Button'

export const Navbar = () => {
  return (
    <NavbarWrapper>
      <NavbarContent>
        <NavbarBrand>
          <Logo height={28} className="text-bluePrimary" />

          <NetworkStatus />
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent
        className="hidden gap-4 font-medium md:flex lg:gap-8"
        justify="end"
      >
        {menuList.map((menu, index) => (
          <NavbarItem key={`${index}-${menu.title}-top`}>
            <NavbarItemLink {...menu} />
          </NavbarItem>
        ))}
        <NavbarItem>
          <Suspense fallback={<Web3Skeleton />}>
            <Web3Button />
          </Suspense>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="bg-[#f5f5f5] font-medium ">
        {menuList.map((menu, index) => (
          <NavbarMenuItem key={`${index}-${menu.title}-mobile`}>
            <Link
              className="w-full text-bluePrimary"
              href={menu.link}
              size="lg"
            >
              {menu.title}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NavbarWrapper>
  )
}
