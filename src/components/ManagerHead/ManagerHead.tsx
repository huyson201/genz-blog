"use"
import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { AiOutlineMenuUnfold } from 'react-icons/ai'
import SidebarMenu from '@/components/SidebarNav/SidebarMenu'
import SidebarNavItem from '@/components/SidebarNav/SidebarNavItem'
import { BiImage } from 'react-icons/bi'
import { usePathname } from 'next/navigation'

type Props = {}

const headTitle = {
    "gallery": "Your Pictures",
    "drafts": "Drafts",
    "public": "Public posts"
}
const ManagerHead = (props: Props) => {
    const [open, setOpen] = useState(false)
    const pathName = usePathname()

    const title = React.useMemo(() => {
        if (!pathName) return
        const splitPath = pathName.split("/")
        const parserPath = splitPath[splitPath.length - 1] as (keyof typeof headTitle)
        return headTitle[parserPath]
    }, [pathName])

    console.log()
    return (
        <div>
            <h1 className='text-xl md:text-2xl dark:text-on_dark_text_gray relative before:absolute before:w-full before:h-[1px] before:bg-[#c2d4ee] dark:before:bg-on_dark_border
                                     before:left-0 before:bottom-1/4 before:-z-[1] mb-6'>

                <span className='inline-flex items-center dark:bg-on_dark_body_bg bg-on_light_body_bg pr-4'>
                    <button className='pr-3 md:hidden' onClick={() => setOpen(true)}>
                        <AiOutlineMenuUnfold />
                    </button>
                    {title}

                </span>
            </h1>

            {/* mobile sidebarNav */}
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-[6] md:hidden" onClose={() => setOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 z-[5] bg-black/40" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-[6] flex justify-start">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="invisible opacity-0"
                            enterTo="visible opacity-100"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="visible opacity-100"
                            leaveTo="invisible opacity-0"
                        >
                            <Dialog.Panel className="relative bg-on_light_body_bg dark:bg-on_dark_body_bg flex w-full max-w-[256px] overflow-y-auto">
                                <aside id="default-sidebar" className="w-full h-full" aria-label="Sidebar">
                                    <div className="h-full px-3 py-4 overflow-y-auto border-[#c2d4ee]
                                                      bg-on_light_card_bg dark:bg-on_dark_card_bg border dark:border-on_dark_border rounded">
                                        <ul className="space-y-2 font-medium">
                                            <SidebarMenu />
                                            <SidebarNavItem href='#' title='Pictures' icon={<BiImage />} />
                                        </ul>
                                    </div>
                                </aside>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    )
}

export default ManagerHead