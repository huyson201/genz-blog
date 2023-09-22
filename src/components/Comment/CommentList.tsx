
import React from 'react'
import Profile from '@/assets/profile.jpg'
import Image from 'next/image'
import Comment from './Comment'
import { Comment as CommentType } from '@/types/type'
type Props = {
    comments: CommentType[]
}

const CommentList = ({ comments }: Props) => {
    return (
        <div className='mt-6 space-y-8'>
            {
                comments.map(comment => (<Comment canReply comment={comment} key={comment._id} />))
            }
        </div>
    )
}

export default CommentList