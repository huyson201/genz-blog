"use client"
import React, { useEffect, useState } from 'react'
import CommentList from './CommentList'
import CommentInput from '../Input/CommentInput'
import commentService from '@/services/comment.service'
import { useSession } from 'next-auth/react'
import useFetchComment from '@/hooks/useFetchComment'
import { Button } from '../Button/Button'
import toast from 'react-hot-toast'
import CommentSkeleton from '../Skeleton/CommentSkeleton'

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

    const handleUpdate = async (_id: string, content: string) => {
        if (!session) return
        const promiseUpdate = commentService.updateComment(session?.backendTokens.access_token, _id, content)
        try {
            await toast.promise(promiseUpdate, {
                error: "Update comment fail!",
                success: "Comment updating!",
                loading: "Successfully update comment!"
            })
            const updatedCmtIndex = data.findIndex(comment => comment._id === _id)
            const cloneData = [...data]
            cloneData[updatedCmtIndex].content = content

            setData([...cloneData])
        } catch (error) {
            throw error;
        }
    }

    const deleteComment = async (_id: string) => {
        if (!session) return
        const promiseUpdate = commentService.deleteComment(session?.backendTokens.access_token, _id)
        try {
            await toast.promise(promiseUpdate, {
                error: "Delete comment fail!",
                success: "Comment deleting!",
                loading: "Successfully delete comment!"
            })
            const cloneData = data.filter(comment => comment._id !== _id)
            setData(cloneData)
        } catch (error) {
            throw error
        }
    }
    return (
        <div>
            <div className='text-3xl text-[#7f92b0] font-bold mt-6 dark:text-[#b8cdeb]'>Comments</div>

            {
                loading ? <div className='mt-6 space-y-8'>

                    {
                        Array(5).fill(1).map((_, index) => {
                            if ([1, 4].includes(index)) {
                                return <CommentSkeleton key={index}>
                                    <>
                                        <CommentSkeleton />
                                        <CommentSkeleton />
                                    </>
                                </CommentSkeleton>
                            }
                            return <CommentSkeleton key={index} />
                        })
                    }

                </div> : (<CommentList comments={data} onUpdate={handleUpdate} onDelete={deleteComment} />)
            }
            {!loading && hasMore && <div className='mt-12 flex justify-center'>
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
            <div className='text-3xl text-[#7f92b0] font-bold mt-8 dark:text-[#b8cdeb]'>Leave a comment</div>
            <CommentInput onSubmit={onSubmit} />
        </div>
    )
}

export default CommentSection