import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

type Props = {
    className?: string
}


const Logo = ({ className }: Props) => {
    return (
        <>
            <Link href={"/"} className={twMerge(className, "dark:hidden")} >
                <Image src={"/logo-day.svg"} width={116} height={36} alt='logo' placeholder='blur' blurDataURL={"/logo-day.svg"} />
            </Link>
            <Link href={"/"} className={twMerge(className, "hidden dark:inline-block")} >
                <Image src={"/logo-night.svg"} width={116} height={36} alt='logo' placeholder='blur' blurDataURL={"/logo-night.svg"} />
            </Link>
        </>
    )
}

export default Logo