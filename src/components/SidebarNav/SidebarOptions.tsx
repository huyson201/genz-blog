"use client"
import React from 'react'
import { BiImage } from 'react-icons/bi'
import SidebarNavItem from './SidebarNavItem'
import SidebarMenu from './SidebarMenu'
import { FaHome } from 'react-icons/fa'
import { useSession } from 'next-auth/react'
import { Role } from '@/types/type'
type Props = {}

const SidebarOptions = (props: Props) => {
  const { data: session } = useSession()
  return (
    <ul className="space-y-2 font-medium">
      <SidebarNavItem href='/me' title='Home' icon={<FaHome />} />
      {session && session.user.role === Role.Admin && <SidebarMenu />}
      <SidebarNavItem href='/me/gallery' title='Pictures' icon={<BiImage />} />
    </ul>
  )
}

export default SidebarOptions

