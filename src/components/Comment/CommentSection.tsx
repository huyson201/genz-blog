"use client"
import React, { useEffect, useState } from 'react'
import CommentList from './CommentList'
import CommentInput from '../Input/CommentInput'
import useSWRInfinite from 'swr/infinite'
import commentService from '@/services/comment.service'
import { Comment } from '@/types/type'
import { useSession } from 'next-auth/react'
import useFetchComment from '@/hooks/useFetchComment'
import { Button } from '../Button/Button'

interface Props {
    postId: string
}

const CommentSection = ({ postId }: Props) => {
    const [page, setPage] = useState(1)
    const [error, setError] = useState("")
    const { data: session } = useSession()

    const { data, loading, hasMore, error: fetchCommentErr, setData } = useFetchComment(postId, page)

    const onSubmit = async (value: string) => {
        if (!session) return
        const { error, data } = await commentService.createComment(session.backendTokens.access_token, { content: value, post: postId, parent: "" })
        if (error) {
            setError(error.message)
            return
        }

        setData(prev => [data, ...prev])


    }
    return (
        <div>
            <h4 className='text-3xl text-[#7f92b0] font-bold mt-6 dark:text-[#b8cdeb]'>Comments</h4>
            <CommentList comments={data} />
            {hasMore && <div className='mt-12 flex justify-center'>
                <Button
                    className='w-[60%] mb-6'
                    size={'sm'}
                    onClick={() => {
                        if (hasMore) {
                            setPage(prev => prev + 1)
                        }
                    }}>Load more</Button>
            </div>}
            {/* comment form */}
            <h4 className='text-3xl text-[#7f92b0] font-bold mt-8 dark:text-[#b8cdeb]'>Leave a comment</h4>
            <CommentInput onSubmit={onSubmit} />
        </div>
    )
}

export default CommentSection