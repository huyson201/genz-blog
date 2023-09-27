import Wrapper from '@/components/Common/Wrapper/Wrapper'
import React from 'react'
import ChangePasswordForm from './ChangePasswordForm'
import { Metadata } from 'next'

type Props = {}

export const metadata: Metadata = {
    title: 'Change Password - Secure Your Account',
    description: "Protect your account by changing your password securely. Follow our step-by-step guide to update your password and enhance your online security. Gen Z Blogger - Your Trusted Online Security Partner."
    ,
    alternates: {
        canonical: "/security/change-password"
    },
    openGraph: {
        title: 'Change Password - Secure Your Account',
        description: "Protect your account by changing your password securely. Follow our step-by-step guide to update your password and enhance your online security. Gen Z Blogger - Your Trusted Online Security Partner.",
    },
}
const Page = (props: Props) => {
    return (
        <Wrapper>
            <div className='py-12 lg:px-24'>
                <div className='p-4  rounded shadow shadow-black/10 dark:shadow-white/10'>
                    <h2 className='text-xl font-semibold text-on_text_gray_2'>Change password</h2>
                    <div className='text-sm mt-3 dark:text-on_dark_text_gray text-on_light_text_gray'>
                        Change your account password. You should set a strong password to prevent unauthorized access to your account.
                    </div>
                    <ChangePasswordForm />
                </div>
            </div>
        </Wrapper>
    )
}

export default Page