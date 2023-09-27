
import { getServerSession } from 'next-auth'
import React from 'react'
import { options } from '../api/auth/[...nextauth]/options'
import { RequireAuthException } from '@/lib/exception'
import Image from 'next/image'
import ProfileIcon from '@/assets/profile-icon.png'
import PasswordIcon from '@/assets/password.svg'
import Link from 'next/link'
import { Metadata } from 'next'

interface Props { }
export const metadata: Metadata = {
    title: 'Accounts - Manage Your Account',
    description: "Manage and secure your personal information on Gen Z Blogger. Customize your information, update your profile, and enhance your online experience with our user-friendly dashboard.",
    alternates: {
        canonical: "/me"
    },
    openGraph: {
        title: 'Accounts - Manage Your Account',
        description: "Manage and secure your personal information on Gen Z Blogger. Customize your information, update your profile, and enhance your online experience with our user-friendly dashboard.",
    },
}
const SettingHome = async (props: Props) => {
    const session = await getServerSession(options)
    if (!session) throw new RequireAuthException()
    return (
        <div className='py-6'>
            <div className='flex items-center justify-center'>
                <Image className='rounded-full object-cover' height={80} width={80} src={session.user.avatar_url} alt='auth-avatar' />
            </div>
            <h2 className='mt-3 text-xl font-semibold text-center dark:text-on_dark_text_white text-on_light_text_white'>
                Welcome, {session.user.name}
            </h2>
            <p className='text-center mt-3 text-on_light_text_gray dark:text-on_dark_text_gray '>
                Manage and secure your personal information
            </p>
            <div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 mt-6 gap-4'>
                <Link href={"/profile"} className='block'>
                    <div className='hover:shadow-md hover:shadow-black/10 dark:hover:shadow-white/10 w-full  transition-all rounded-sm flex items-center justify-center flex-col py-4 dark:bg-on_dark_card_bg bg-[#dfe6e9]'>
                        <Image width={80} height={80} src={ProfileIcon} alt='profile_icon' className='w-20 h-20' />
                        <h3 className='mt-2 font-medium'>Profile</h3>
                    </div>
                </Link>
                <Link href={"/security/password"} className='block'>
                    <div className='hover:shadow-md hover:shadow-black/10 dark:hover:shadow-white/10 w-full  transition-all rounded-sm flex items-center justify-center flex-col py-4 dark:bg-on_dark_card_bg bg-[#dfe6e9]'>
                        <Image width={80} height={80} src={PasswordIcon} alt='profile_icon' className='w-20 h-20' />
                        <h3 className='mt-2 font-medium'>Password</h3>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default SettingHome