
import React from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
    children: any,
    className?: string
}

const Wrapper = ({ className, children }: Props) => {
    return (
        <div className={twMerge(className, 'container mx-auto lg:px-[72px] px-3 sm:px-0 xs:px-8')}>{children}</div>
    )
}

export default Wrapper