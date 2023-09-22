
import { cn } from '@/utils'
import { VariantProps, cva } from 'class-variance-authority'
import Link, { LinkProps } from 'next/link'
import React from 'react'

export const socialCircleVariants = cva(`social-links`, {
  variants: {
    size: {
      custom: "",
      xs: "w-8 h-8 text-[13px]",
      sm: "w-[50px] h-[50px] text-2xl"
    }
  },
  defaultVariants: {
    size: "xs"
  }
})

interface Props extends LinkProps, VariantProps<typeof socialCircleVariants> {
  className?: string,
  children: any

}

const SocialCircle = ({ className, size, children, ...props }: Props) => {
  return (
    <Link {...props} className={cn(socialCircleVariants({ size, className }))}>
      {children}
    </Link>
  )
}

export default SocialCircle