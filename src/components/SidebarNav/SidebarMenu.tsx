
import React from 'react'
import { HiChevronUp } from 'react-icons/hi2'
import { Disclosure } from '@headlessui/react'
import { FaPencilAlt } from 'react-icons/fa'
import { FaEarthAsia, FaLock } from 'react-icons/fa6'
import SidebarNavItem from './SidebarNavItem'
type Props = {}

const SidebarMenu = (props: Props) => {
    return (
        <li>
            <Disclosure>
                {({ open }) => (
                    <>
                        <Disclosure.Button
                            className="flex items-center  w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                            <span className='flex-shrink-0 text-base text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'>
                                <FaPencilAlt />
                            </span>
                            <span className=' flex-1 text-left ml-5 text-sm whitespace-nowrap '>
                                Posts
                                <span className="ml-1 tracking-widest text-sm font-light text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                                    {`(0)`}
                                </span>
                            </span>
                            <HiChevronUp
                                className={`text-gray-500 transition duration-200 group-hover:text-gray-900 mt-0.5
                                 dark:text-gray-400 dark:group-hover:text-white ${open ? '' : 'rotate-180 transform'}`}
                            />
                        </Disclosure.Button>

                        <Disclosure.Panel>
                            <ul className="py-2 space-y-2">
                                <SidebarNavItem className='pl-11' iconSize='text-sm' textSize='text-xs' title='Drafts' href='#' icon={<FaLock />} />
                                <SidebarNavItem className='pl-11' iconSize='text-sm' textSize='text-xs' title='Public' href='#' icon={<FaEarthAsia />} />
                            </ul>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </li>
    )
}

export default SidebarMenu