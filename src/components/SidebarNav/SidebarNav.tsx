
import React from 'react'
import SidebarOptions from './SidebarOptions'

type Props = {}

const SidebarNav = (props: Props) => {
    return (
        <div className='w-64 h-screen  hidden md:block sticky top-[100px]'>
            <aside id="default-sidebar" className="w-full h-full" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto shadow dark:shadow-on_dark_border/40
                 bg-on_light_card_bg dark:bg-on_dark_card_bg/20   rounded">
                    <SidebarOptions />
                </div>
            </aside>
        </div>
    )
}

export default SidebarNav

