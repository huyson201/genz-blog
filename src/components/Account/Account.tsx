
import React from 'react'
import { useSession } from "next-auth/react"
import UserMenu from '../UserMenu/UserMenu'
import Link from 'next/link'
import useCallbackUrl from '@/hooks/useCallbackUrl'
import { BsPencilSquare } from 'react-icons/bs'
import ThemeModeToggle from '../ThemeModeToggle/ThemeModeToggle'
import { Role } from '@/types/type'

type Props = {}

const Account = (props: Props) => {
    const { data: session } = useSession()
    const callbackUrl = useCallbackUrl()
    return (
        <>
            {session && session.user.role === Role.Admin && (
                <Link href={"/publish/post"} className='text-2xl text-on_text_gray_2'>
                    <BsPencilSquare />
                </Link>
            )}
            <ThemeModeToggle />
            {
                session && session.user ? <UserMenu auth={session.user} tokens={session.backendTokens} /> : (
                    <Link href={`/login${callbackUrl !== null ? `?callbackUrl=${callbackUrl}` : ""}`}
                        className=' px-4 py-[10px] bg-gradient-to-r from-blue via-teal to-blue 
                                    bg-200% rounded-md text-white text-center font-bold text-sm transition-all duration-500
                                    hover:bg-right hidden sm:inline-block'>
                        Sign in
                    </Link>
                )
            }
        </>
    )
}

export default Account