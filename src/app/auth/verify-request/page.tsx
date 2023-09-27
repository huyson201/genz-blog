import Wrapper from '@/components/Common/Wrapper/Wrapper'
import React from 'react'
import VerifyCard from './VerifyCard'
import { getServerSession } from 'next-auth'
import { options } from '@/app/api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'
import authService from '@/services/auth.service'

type Props = {}

const page = async (props: Props) => {
    const session = await getServerSession(options)
    if (!session?.user) return redirect("/auth/login")
    if (session.user.verified) return redirect("/auth/verify-email")
    await authService.requestVerify(session.backendTokens.access_token)
    return (
        <Wrapper>
            <div className='pb-24 py-14 flex items-center justify-center dark:text-on_text_gray_2'>
                <VerifyCard />
            </div>
        </Wrapper>
    )
}


export default page