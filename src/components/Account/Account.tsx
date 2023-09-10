
import React from 'react'
import { signIn, useSession } from "next-auth/react"
import UserMenu from '../UserMenu/UserMenu'

type Props = {}

const Account = (props: Props) => {
    const { data: session } = useSession()

    return (
        <>
            {
                session && session.user ? <UserMenu auth={session.user} tokens={session.backendTokens} /> : (
                    <button onClick={() => signIn()}
                        className=' px-4 py-[10px] bg-gradient-to-r from-blue via-teal to-blue 
                                    bg-200% rounded-md text-white text-center font-bold text-sm transition-all duration-500
                                    hover:bg-right hidden sm:inline-block'>
                        Sign in
                    </button>
                )
            }
        </>
    )
}

export default Account