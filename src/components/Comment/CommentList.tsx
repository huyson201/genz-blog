"use client"
import React from 'react'
import Profile from '@/assets/profile.jpg'
import Image from 'next/image'
import Comment from './Comment'
import { Comment as CommentType } from '@/types/type'
import { CommentContextProvider } from '@/contexts/CommentContext'
type Props = {
    comments: CommentType[]
}

const CommentList = ({ comments }: Props) => {
    return (
        <div className='mt-6 space-y-8'>
            <CommentContextProvider>
                {
                    comments.length > 0 ?
                        comments.map(comment => (<Comment canReply comment={comment} key={comment._id} />)) :
                        (<div className='text-on_light_text_gray dark:text-on_dark_text_gray'>The post still has no comments.</div>)
                }
            </CommentContextProvider>

        </div>
    )
}

export default CommentList