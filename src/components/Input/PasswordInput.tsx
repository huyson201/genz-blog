
"use client"

import { cn } from '@/utils'
import React, { forwardRef, useState } from 'react'
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs'
import { twMerge } from 'tailwind-merge'
import { inputVariants } from './Input'
import { VariantProps } from 'class-variance-authority'

interface Props extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {
    error?: string
}



const PasswordInput = forwardRef<HTMLInputElement, Props>(({ className, variant, inputSize, inputWidth, valid, error, ...props }, ref) => {
    const [isShow, setIsShow] = useState(false)

    return (
        <div>
            <div className='relative'>
                <input
                    {...props}
                    ref={ref}
                    type={isShow ? "text" : "password"}

                    className={cn(inputVariants({ variant, inputSize, inputWidth, valid }))}
                />
                <button
                    tabIndex={-1}
                    type='button'
                    className='absolute top-2/4 right-4 text-on_dark_text_gray dark:text-[#7f92b0] text-xl -translate-y-2/4'
                    onClick={() => setIsShow(prev => !prev)}>
                    <BsFillEyeFill className={twMerge(!isShow && "hidden")} />
                    <BsFillEyeSlashFill className={twMerge(isShow && "hidden")} />
                </button>
            </div>
            {error && <div className='text-sm text-red-500 mt-2'>{error}</div>}
        </div>
    )
})


PasswordInput.displayName = "PasswordInput"

export default PasswordInput