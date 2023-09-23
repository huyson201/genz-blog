"use client"
import React, { useEffect } from 'react'
import { signIn, signOut, useSession } from "next-auth/react"
import UserMenu from '../UserMenu/UserMenu'
import Link from 'next/link'
import useCallbackUrl from '@/hooks/useCallbackUrl'
import { BsPencilSquare } from 'react-icons/bs'
import ThemeModeToggle from '../ThemeModeToggle/ThemeModeToggle'
import { Role } from '@/types/type'
import { cn } from '@/utils'
import { buttonVariants } from '../Button/Button'
import { RotatingLines } from 'react-loader-spinner'

type Props = {}

const Account = (props: Props) => {
    const { data: session, status } = useSession()
    const callbackUrl = useCallbackUrl()
    console.log(session)

    useEffect(() => {
        if (session?.error === "RefreshAccessTokenError") {
            signOut()
        }
    }, [session?.error])
    return (
        <>
            {session && session.user.role === Role.Admin && (
                <Link href={"/publish/post"} className='text-2xl text-on_text_gray_2' title='Add new post'>
                    <BsPencilSquare />
                </Link>
            )}
            <ThemeModeToggle />
            {
                status === "authenticated" && <UserMenu auth={session.user} tokens={session.backendTokens} />
            }
            {
                status === "unauthenticated" && (
                    <Link href={`/login${callbackUrl !== null ? `?callbackUrl=${callbackUrl}` : ""}`}
                        className={cn(buttonVariants({ className: "hidden sm:inline-block", size: "xs" }))}>
                        Sign in
                    </Link>
                )
            }
            <span className='hidden md:inline-block'>
                <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="30"
                    visible={status === "loading"}
                />
            </span>
        </>
    )
}

export default Account