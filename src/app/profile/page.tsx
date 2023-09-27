
import Wrapper from '@/components/Common/Wrapper/Wrapper'
import React from 'react'
import Profile from './Profile'
import { getServerSession } from 'next-auth'
import { options } from '../api/auth/[...nextauth]/options'
import { RequireAuthException } from '@/lib/exception'
import authService from '@/services/auth.service'
import { Metadata } from 'next'

type Props = {}

export const metadata: Metadata = {
    title: 'Profile - Customize Your Information',
    description: "Explore and customize your profile on Gen Z Blogger with our user-friendly editing tool. Update your information, add details, and personalize your user profile the way you want.",
    alternates: {
        canonical: "/profile"
    },
    openGraph: {
        title: 'Profile - Customize Your Information',
        description: "Explore and customize your profile on Gen Z Blogger with our user-friendly editing tool. Update your information, add details, and personalize your user profile the way you want.",
    },
}
const page = async (props: Props) => {
    const session = await getServerSession(options)
    if (!session || !session.backendTokens) throw new RequireAuthException()
    const profile = await authService.getProfile(session.backendTokens.access_token)


    return (
        <Wrapper>
            <div className='py-12 lg:px-24'>
                <div className='p-4  rounded shadow shadow-black/10 dark:shadow-white/10'>
                    <h2 className='text-xl font-semibold text-on_text_gray_2'>Personal Information</h2>
                    <div className='text-sm mt-3 dark:text-on_dark_text_gray text-on_light_text_gray'>
                        Manage your personal information.
                    </div>
                    <Profile key={(new Date().getTime()).toString()} data={profile} />
                </div>
            </div>
        </Wrapper>
    )
}

export default page