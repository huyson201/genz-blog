
import React from 'react'
import author from '@/assets/profile.jpg'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

type Props = {
}

const LastCommentSection = ({ }: Props) => {
    return (
        <div className={twMerge('py-6')}>
            <p className='text-sm text-[#708ab0] dark:text-on_dark_text_gray mb-4 transition-colors'>
                &#34;Gosh jaguar ostrich quail one excited dear hello and bound and the and bland moral misheard roadrunner flapped lynx far that and jeepers giggled far and far&#34;
            </p>
            <div className='flex items-center space-x-4 '>
                <Image className='rounded-full w-8 h-8' src={author} alt='author' />
                <div className='text-sm dark:text-on_text_gray_2 text-on_light_text_gray transition-colors' >
                    <div>George Orwell</div>
                    <div className='text-xs'>17 April 2023</div>
                </div>
            </div>
        </div>
    )
}

export default LastCommentSection