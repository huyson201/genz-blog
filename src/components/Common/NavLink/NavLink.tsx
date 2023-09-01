"use client"
import React, { useMemo } from 'react'
import Link, { LinkProps } from 'next/link'
import { usePathname } from "next/navigation";
import { twMerge } from 'tailwind-merge'

interface Props extends LinkProps {
    children: any,
    className?: string
}

const NavLink = ({ className, href, children, ...props }: Props) => {
    const pathName = usePathname()
    const isActive = useMemo(() => {
        if (pathName !== "/" && href !== "/") {
            return pathName.startsWith(href.toString())
        }

        return pathName === href
    }, [pathName])

    return (
        <Link href={href} className={twMerge(className, isActive && "active", pathName)} {...props}>
            {children}
        </Link>
    )
}

export default NavLink