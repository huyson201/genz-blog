

import React from 'react'
import { twMerge } from 'tailwind-merge'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    title: string
}

const GradientButton = ({ className, title, ...props }: Props) => {
    return (
        <button
            {...props}
            className={` text-center outline-none bg-primary-gradient bg-200%  transition-all duration-500
             hover:bg-right ${className}`}>
            {title}
        </button>
    )
}

export default GradientButton