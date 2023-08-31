
"use client"

import React, { forwardRef, useState } from 'react'
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs'
import { twMerge } from 'tailwind-merge'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> { }



const PasswordInput = forwardRef<HTMLInputElement, Props>(({ className, ...props }, ref) => {
    const [isShow, setIsShow] = useState(false)

    return (
        <div className='relative'>
            <input
                {...props}
                ref={ref}
                type={isShow ? "text" : "password"}

                className={twMerge(`dark:text-[#7f92b0]  rounded-lg  block w-full py-4 pl-4 pr-12
                dark:bg-on_dark_card_bg border dark:focus:border-on_text_gray_2 
                transition-all dark:border-on_dark_border outline-none bg-on_light_card_bg border-[#c2d4ee] text-on_light_text_white placeholder-on_dark_text_gray dark:placeholder-gray-500`
                    , className)}
            />
            <button
                type='button'
                className='absolute top-2/4 right-4 text-on_dark_text_gray dark:text-[#7f92b0] text-xl -translate-y-2/4'
                onClick={() => setIsShow(prev => !prev)}>
                <BsFillEyeFill className={twMerge(!isShow && "hidden")} />
                <BsFillEyeSlashFill className={twMerge(isShow && "hidden")} />
            </button>
        </div>
    )
})


PasswordInput.displayName = "PasswordInput"

export default PasswordInput