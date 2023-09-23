
import React from 'react'
import LastCommentSection from './LastCommentSection'
import LastCommentSkeleton from '../Skeleton/LastCommentSkeleton'

type Props = {}

const LastCommentList = (props: Props) => {
    return (
        <div className='divide-y divide-[#c2d4ee] dark:divide-on_dark_border space-y-6'>
            {
                Array(5).fill(0).map((_, index) => {
                    return <LastCommentSection key={`cmt-${index}`} />
                })
            }
        </div>
    )
}

export default LastCommentList