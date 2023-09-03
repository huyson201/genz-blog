"use client"
import React, { useMemo } from 'react'
import Link, { LinkProps } from 'next/link'
import { usePathname } from "next/navigation";
import { twMerge } from 'tailwind-merge'

interface Props extends LinkProps {
    children: any,
    className?: string
    exact?: boolean
}

const NavLink = ({ className, exact, href, children, ...props }: Props) => {
    const pathName = usePathname()
    const isActive = useMemo(() => {
        if (!pathName) return false
        return exact ? pathName === href : pathName.startsWith(href.toString());
    }, [pathName])

    return (
        <Link href={href} className={twMerge(className, isActive && "active", pathName)} {...props}>
            {children}
        </Link>
    )
}

export default NavLink