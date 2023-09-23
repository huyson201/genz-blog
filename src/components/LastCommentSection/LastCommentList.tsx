
import React from 'react'
import LastCommentSection from './LastCommentSection'
import { Comment } from '@/types/type'

type Props = {
    data: Promise<Comment[]>
}

const LastCommentList = async ({ data }: Props) => {
    const comment = await data
    return (
        <div className='divide-y divide-[#c2d4ee] dark:divide-on_dark_border space-y-6'>
            {
                comment.map((cmt, index) => {
                    return <LastCommentSection data={cmt} key={`cmt-${cmt._id}`} />
                })
            }
        </div>
    )
}

export default LastCommentList