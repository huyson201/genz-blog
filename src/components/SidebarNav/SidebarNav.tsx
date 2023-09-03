
import React from 'react'
import { BiImage } from 'react-icons/bi'
import SidebarNavItem from './SidebarNavItem'
import SidebarMenu from './SidebarMenu'
type Props = {}

const SidebarNav = (props: Props) => {
    return (
        <div className='w-64 h-screen  hidden md:block sticky top-[100px]'>
            <aside id="default-sidebar" className="w-full h-full" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto border-[#c2d4ee]
                 bg-on_light_card_bg dark:bg-on_dark_card_bg border dark:border-on_dark_border rounded">
                    <ul className="space-y-2 font-medium">
                        <SidebarMenu />
                        <SidebarNavItem href='/me/gallery' title='Pictures' icon={<BiImage />} />
                    </ul>
                </div>
            </aside>
        </div>
    )
}

export default SidebarNav