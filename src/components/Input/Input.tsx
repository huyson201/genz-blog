
import React, { InputHTMLAttributes } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '@/utils'

export const inputVariants = cva("", {
    variants: {
        variant: {
            default: `block dark:bg-on_dark_card_bg
            transition-all outline-none bg-on_light_card_bg dark:placeholder-on_dark_placeholder placeholder-on_light_placeholder `
        },
        inputSize: {
            default: "py-1 px-4 rounded-sm",
            xs: "py-2 px-4 rounded-sm",
            sm: "p-4 rounded-lg",
            custom: ""
        },
        inputWidth: {
            full: "w-full  ",
            custom: "",
        },
        valid: {
            "none": "text-[#0f172a] border dark:focus:border-on_text_gray_2  dark:text-[#7f92b0] dark:border-on_dark_border border-on_light_border_2",
            "invalid": "text-red-500 border-red-500 border"
        }
    },
    defaultVariants: {
        variant: "default",
        inputSize: "sm",
        inputWidth: "full",
        valid: "none"
    }
})

interface Props extends InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {
    wrapperClass?: string,
    error?: string
}

const Input = React.forwardRef<HTMLInputElement, Props>(({ wrapperClass, variant, inputSize, inputWidth, className, valid, error, ...props }, ref) => {
    return (
        <div className={wrapperClass} >
            <input
                {...props}
                ref={ref}
                className={cn(inputVariants({ variant, inputSize, inputWidth, valid, className }))}
            />
            {error && <div className='text-sm text-red-500 mt-2'>{error}</div>}
        </div>
    )
})

export default Input

Input.displayName = "InputField"
