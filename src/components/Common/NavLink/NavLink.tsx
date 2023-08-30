"use client"
import React from 'react'
import Link, { LinkProps } from 'next/link'
import { usePathname } from "next/navigation";
import { twMerge } from 'tailwind-merge'

interface Props extends LinkProps {
    children: any,
    className?: string
}

const NavLink = ({ className, href, children, ...props }: Props) => {
    const pathName = usePathname()
    const isActive = pathName.startsWith(href.toString())
    return (
        <Link href={href} className={twMerge(className, isActive && "active")} {...props}>
            {children}
        </Link>
    )
}

export default NavLink