"use client";
import { useTheme } from 'next-themes'
import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'
import { Theme } from '../Provider/Provider';

type Props = {
    className?: string
}

const logoUrls = {
    dark: "/logo-night.svg",
    light: "/logo-day.svg"
}

const Logo = ({ className }: Props) => {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const logo = useMemo(() => {
        return logoUrls[(theme as Theme | undefined) || "dark"]
    }, [theme])


    if (!mounted) return null
    return (
        <Link href={"/"} className={twMerge(className)} >
            <Image src={logo} width={116} height={36} alt='logo' />
        </Link>
    )
}

export default Logo