

import React, { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    wrapperClass?: string
}



const InputField = forwardRef<HTMLInputElement, Props>(({ className, wrapperClass, ...props }, ref) => (
    <div className={wrapperClass} >
        <input
            {...props}
            ref={ref}
            className={twMerge(`dark:text-[#7f92b0]  rounded-lg  block w-full p-4
        dark:bg-on_dark_card_bg border dark:focus:border-on_text_gray_2 
        transition-all dark:border-on_dark_border outline-none bg-on_light_card_bg border-on_light_border_2 text-on_light_text_white 
        dark:placeholder-gray-500 placeholder-on_dark_text_gray`, className)}
        />
    </div>

))


InputField.displayName = "Input"
export default InputField