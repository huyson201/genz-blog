"use client"
import React from 'react'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'
import { Comment } from '@/types/type'
import { formatDate } from '@/utils'

type Props = {
    data: Comment
}

const LastCommentSection = ({ data }: Props) => {
    return (
        <div className={twMerge('py-6')}
        >
            <p className='text-sm text-[#708ab0] dark:text-on_dark_text_gray mb-4 transition-colors '>
                &quot;{data.content.length > 125 ? data.content.slice(0, 125) + "..." : data.content}&quot;
            </p>
            <div className='flex items-center space-x-4 '>
                <Image className='rounded-full w-8 h-8' width={40} height={40} src={data.author.avatar_url} alt='author' />
                <div className='text-sm dark:text-on_text_gray_2 text-on_light_text_gray transition-colors' >
                    <div>{data.author.name}</div>
                    <div className='text-xs'>{formatDate(data.createdAt, "D MMMM YYYY")}</div>
                </div>
            </div>
        </div>
    )
}

export default LastCommentSection