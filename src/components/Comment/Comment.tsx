"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { Comment } from '@/types/type'
import { formatDate } from '@/utils'
import { BsFillReplyFill, BsPencilSquare } from 'react-icons/bs'
import CommentInput from '../Input/CommentInput'
import { useSession } from 'next-auth/react'
import commentService from '@/services/comment.service'
import { removeDuplicateObj } from '@/utils/removeDuplicateObj'
import { useComment } from '@/contexts/CommentContext'
import { MdRestoreFromTrash } from 'react-icons/md'

type Props = {
    comment: Comment,
    canReply?: boolean
}

const Comment = ({ comment, canReply }: Props) => {
    const [showReply, setShowReply] = useState(false)
    const [replyComment, setReplyComment] = useState<Comment[]>([])
    const { data: session } = useSession()
    const [errorReply, setErrorReply] = useState("")
    const commentState = useComment()


    const handleSubmit = async (value: string) => {
        if (!session) return
        const { error, data } = await commentService.createComment(session.backendTokens.access_token, { content: value, post: comment.post, parent: comment._id })
        if (error) {
            setErrorReply(error.message)
            return
        }

        console.log(data)
        setReplyComment(prev => removeDuplicateObj([data, ...prev]))
        commentState?.setReply(null)
    }

    const handleClickShowReply = async () => {
        if (showReply) return
        const res = await commentService.getReplyComments(comment.post, comment._id)
        setReplyComment(prev => removeDuplicateObj([...res]).filter(value => value.parent !== ""))
        if (!showReply) {
            setShowReply(true)
        }
    }
    return (
        <div className='comment-box '>
            <div className='flex-col gap-y-4 md:flex-row flex justify-between items-start'>
                <div className='flex items-center gap-x-2 md:flex-1 comment-head'>
                    <Image src={comment.author.avatar_url} alt='avatar' width={40} height={40} className='rounded-full' />
                    <div>
                        <div className='font-bold text-[#4e658a] dark:text-[#66768f]'>{comment.author.name}</div>
                        <div className='text-[#4e658a] dark:text-[#66768f] text-sm font-normal'>{formatDate(comment.createdAt, "MMMM D, YYYY")}</div>
                    </div>
                </div>

                <div className='w-full md:w-3/5'>
                    <div className='bg-on_light_card_bg dark:bg-on_dark_card_bg border text-sm md:text-base
                 dark:border-on_dark_border border-on_light_border_2 p-4  rounded-lg text-[#c2d4ee] dark:text-[#94a9c9]'>

                        {
                            commentState?.updateId === comment._id ? (
                                <>
                                    <textarea className='w-full bg-transparent resize-y outline-none border-none' autoFocus defaultValue={comment.content} >
                                    </textarea>
                                    <div className='space-x-3 flex justify-end'>
                                        <button
                                            className=' text-sm text-[#c2d4ee] dark:text-[#94a9c9] hover:text-blue dark:hover:text-blue'
                                            onClick={() => commentState.setUpdate(null)}>
                                            Cancel
                                        </button>
                                        <button
                                            className='text-sm text-[#c2d4ee] dark:text-[#94a9c9] hover:text-blue dark:hover:text-blue'>
                                            Save
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {comment.content}
                                    <div className='mt-3 space-x-4 flex items-baseline'>
                                        {
                                            canReply && <button
                                                onClick={() => commentState?.setReply(comment._id)}
                                                className='text-xs flex items-center   text-[#c2d4ee] dark:text-[#94a9c9] hover:text-blue dark:hover:text-blue'>
                                                <BsFillReplyFill className='mr-0.5 text-base inline-block' />
                                                Reply
                                            </button>
                                        }
                                        {
                                            comment.author._id === session?.user._id && <button
                                                onClick={() => commentState?.setUpdate(comment._id)}
                                                className='text-xs flex items-center  text-[#c2d4ee] dark:text-[#94a9c9] hover:text-blue dark:hover:text-blue'>
                                                <BsPencilSquare className='mr-0.5 text-sm inline-block' />
                                                Change
                                            </button>
                                        }
                                        {
                                            comment.author._id === session?.user._id && <button
                                                className='text-xs flex items-center  text-[#c2d4ee] dark:text-[#94a9c9] hover:text-blue dark:hover:text-blue'>
                                                <MdRestoreFromTrash className='mr-0.5 text-sm inline-block' />
                                                Delete
                                            </button>
                                        }
                                    </div>
                                </>
                            )
                        }
                    </div>
                    {
                        comment.replyCount > 0 && !showReply && <div className='text-center md:text-left'>
                            <button
                                onClick={handleClickShowReply}
                                className='inline-flex text-sm mt-4 hover:text-blue dark:hover:text-blue transition-colors
                                         text-on_light_text_gray dark:text-on_dark_text_gray'>
                                {`( ${comment.replyCount} )`} Reply
                            </button>
                        </div>
                    }
                </div>
            </div>
            {
                replyComment.length > 0 && replyComment.map(comment => <Comment comment={comment} key={comment._id} />)
            }

            {
                canReply && commentState?.reply === comment._id && <CommentInput showCancelButton onRequestCancel={() => commentState.setReply(null)} onSubmit={handleSubmit} />
            }
            {
                errorReply && <div className='mt-4 text-sm text-red-500'>{errorReply}</div>
            }
        </div>
    )
}

export default Comment