
import Wrapper from '@/components/Common/Wrapper/Wrapper'
import React from 'react'
import Profile from './Profile'

type Props = {}

const page = (props: Props) => {
    return (
        <Wrapper>
            <div className='py-12 lg:px-24'>
                <div className='p-4  rounded shadow shadow-black/10 dark:shadow-white/10'>
                    <h2 className='text-xl font-semibold text-on_text_gray_2'>Personal Information</h2>
                    <div className='text-sm mt-3 dark:text-on_dark_text_gray text-on_light_text_gray'>
                        Manage your personal information.
                    </div>
                    <Profile />
                </div>
            </div>
        </Wrapper>
    )
}

export default page