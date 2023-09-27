"use client"
import { Button, buttonVariants } from '@/components/Button/Button'
import { Auth } from '@/types/type'
import { cn } from '@/utils'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BsCheck } from 'react-icons/bs'

type Props = {
    data?: Auth
}

const VerifyMessageCard = ({ data }: Props) => {
    const { data: session, update, status } = useSession()
    const [updated, setUpdated] = useState(false)
    useEffect(() => {
        console.log(updated)
        if (updated) return
        update({ refreshProfile: true }).then(res => res === undefined ? setUpdated(false) : null)
        setUpdated(true)
    }, [update])


    return (
        <div className='flex items-center flex-col max-w-[500px] w-full border border-on_light_border_2 py-6 rounded-md
    dark:bg-on_dark_card_bg bg-on_light_card_bg dark:border-on_dark_border '>
            <span className='text-5xl w-14 h-14 rounded-full flex items-center justify-center
          shadow-[0_0_0_4px_rgba(187,247,208)]  bg-green-200 text-green-600'>
                <BsCheck />
            </span>
            <h1 className='text-center font-bold mt-6 text-2xl sm:text-3xl dark:text-gray-300  text-gray-700'>
                Verified!
            </h1>

            <div className='text-sm text-center mt-4'>
                You has Successfully verified account
            </div>
            <div className='text-center mt-6'>
                {
                    status === "authenticated" && <Link href={"/"} className={cn(buttonVariants({ size: "sm" }))}>Go back home</Link>
                }
                {
                    status === "unauthenticated" && (
                        <>
                            <Link href={"/auth/login"} className={cn(buttonVariants({ size: "sm", className: "mr-4" }))}>Go back home</Link>
                            <Link href={"/"} className={cn(buttonVariants({ size: "sm" }))}>Login</Link>
                        </>
                    )
                }

            </div>
        </div>
    )
}

export default VerifyMessageCard