
import React, { ButtonHTMLAttributes } from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/utils'

const buttonVariants = cva("transition-all outline-none text-center ", {
    variants: {
        variant: {
            primary: 'primary-gradient-btn font-bold text-white hover:bg-right duration-500',
            outline: "border hover:bg-gray-100 dark:hover:bg-on_dark_card_bg border-on_light_border_2 dark:border-on_dark_border",
            custom: ''
        },
        size: {
            default: "px-4 py-1 rounded text-sm",
            xs: "px-4 py-1.5 rounded text-sm",
            sm: "px-4 py-2 rounded-md text-sm",
            md: "px-4 py-2.5 rounded-md text-sm",
            custom: ""
        },
        disable: {
            none: "",
            disabled: "disabled:opacity-60"
        }
    },
    defaultVariants: {
        variant: "primary",
        size: "default",
        disable: "none"
    }
})
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {

}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, disable, ...props }, ref) => {
    return (
        <button ref={ref} className={cn(buttonVariants({ variant, size, disable, className }))} {...props} />

    )
})

Button.displayName = "Button"


export { Button, buttonVariants }