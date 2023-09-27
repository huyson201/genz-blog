
import { Button } from '@/components/Button/Button'
import Wrapper from '@/components/Common/Wrapper/Wrapper'
import React from 'react'
import VerifyMessageCard from './VerifyMessageCard'
import { getServerSession } from 'next-auth'
import { options } from '@/app/api/auth/[...nextauth]/options'
import authService from '@/services/auth.service'
import { notFound } from 'next/navigation'
type Props = {
    searchParams: {
        code: string
    }
}

const page = async ({ searchParams: { code } }: Props) => {
    const session = await getServerSession(options)

    if (!code && session && session.user.verified) return (
        <Wrapper>
            <div className='pb-24 py-14 flex items-center justify-center dark:text-on_text_gray_2'>
                <VerifyMessageCard />
            </div>
        </Wrapper>
    )


    if (!code) return notFound()
    const res = await authService.verifyEmail(code)
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || "Something went wrong!")
    return (
        <Wrapper>
            <div className='pb-24 py-14 flex items-center justify-center dark:text-on_text_gray_2'>
                <VerifyMessageCard />
            </div>
        </Wrapper>
    )
}

export default page