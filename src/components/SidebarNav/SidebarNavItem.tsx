import Link from 'next/link'

import React from 'react'
import { twMerge } from 'tailwind-merge'
import NavLink from '../Common/NavLink/NavLink'

type Props = {
    icon: React.ReactNode,
    title: string,
    href: string,
    className?: string,
    iconSize?: "text-2xl" | 'text-xl' | 'text-base' | 'text-sm',
    textSize?: "text-sm" | "text-base" | "text-xs",
    count?: number
}

const SidebarNavItem = ({ icon, title, href, className, count, textSize, iconSize = "text-2xl" }: Props) => {
    return (
        <li>
            <NavLink
                exact
                href={href}
                className={twMerge(`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100
                dark:hover:bg-gray-700 group dark:[&.active]:bg-gray-700 [&.active]:bg-gray-100`, className, textSize)}>
                <span
                    className={twMerge(`flex-shrink-0  text-gray-500 transition duration-75
                    dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white`, iconSize)}>
                    {icon}
                </span>
                <span className="flex-1 ml-3 text-xs whitespace-nowrap">
                    {title}

                    {
                        count && <span className={twMerge("ml-1 tracking-widest font-light text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300",
                            textSize === 'text-xs' ? "text-xs" : "text-sm")}>
                            {`(${count})`}
                        </span>
                    }
                </span>

            </NavLink>
        </li>
    )
}

export default SidebarNavItem