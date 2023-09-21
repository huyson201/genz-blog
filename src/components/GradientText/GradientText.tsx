
import React, { HTMLAttributes } from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/utils'


const gradientTextVariants = cva("inline-block primary-text", {
    variants: {
        size: {
            default: "",
            sm: "text-[20px] xs:text-[25px] sm:text-[35px] md:text-[45px]",
            md: "text-[25px] md:text-[35px] lg:text-[45px]",
            lg: "text-[29px] xs:text-[34px] sm:text-[44px] md:text-[60px]",
            xl: "text-[30px] sm:text-[36px] md:text-[48px] lg:text-[64px]",

        }
    },
    defaultVariants: {
        size: "default"
    }
})

interface Props extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof gradientTextVariants> { }

const GradientText = ({ className, size, ...props }: Props) => {
    return (
        <span {...props} className={cn(gradientTextVariants({ size, className }))} />
    )
}

export default GradientText