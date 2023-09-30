"use client"
import React from 'react'
import Comment from './Comment'
import { Comment as CommentType } from '@/types/type'
import { CommentContextProvider } from '@/contexts/CommentContext'
type Props = {
    comments: CommentType[],
    onUpdate?: (_id: string, content: string) => void,
    onDelete?: (_id: string) => void,

}

const CommentList = ({ comments, onUpdate, onDelete }: Props) => {

    const hasComments = comments.length > 0
    return (
        <div className='mt-6 space-y-8'>
            <CommentContextProvider>
                {
                    hasComments ?
                        comments.map(comment => (<Comment onUpdate={onUpdate} onDelete={onDelete} canReply comment={comment} key={comment._id} />))
                        : (<div className='text-on_light_text_gray dark:text-on_dark_text_gray'>The post still has no comments.</div>)
                }
            </CommentContextProvider>

        </div>
    )
}

export default CommentList