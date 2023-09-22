"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Profile from '@/assets/profile.jpg'
import { Comment } from '@/types/type'
import { formatDate } from '@/utils'
import { BsFillReplyFill, BsPencilSquare } from 'react-icons/bs'
import CommentInput from '../Input/CommentInput'
import { useSession } from 'next-auth/react'
import commentService from '@/services/comment.service'
import { removeDuplicateObj } from '@/utils/removeDuplicateObj'

type Props = {
    comment: Comment,
    canReply?: boolean
}

const Comment = ({ comment, canReply }: Props) => {
    const [isReply, setIsReply] = useState(false)
    const [showReply, setShowReply] = useState(false)
    const [replyComment, setReplyComment] = useState<Comment[]>([])
    const { data: session } = useSession()
    const [error, setError] = useState("")


    const handleSubmit = async (value: string) => {
        if (!session) return
        const { error, data } = await commentService.createComment(session.backendTokens.access_token, { content: value, post: comment.post, parent: comment._id })
        console.log(error)
        if (error) {
            setError(error.message)
            return
        }

        console.log(data)
        setReplyComment(prev => removeDuplicateObj([data, ...prev]))
        setIsReply(false)
    }

    const handleClickShowReply = async () => {
        if (showReply) return
        const res = await commentService.getReplyComments(comment.post, comment._id)
        setReplyComment(prev => removeDuplicateObj([...prev, ...res]).filter(value => value.parent !== ""))
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
                        {comment.content}
                        <div className='mt-3 space-x-4 flex items-baseline'>
                            {
                                canReply && <button
                                    onClick={() => setIsReply(true)}
                                    className='text-xs flex items-center   text-[#c2d4ee] dark:text-[#94a9c9] hover:text-blue dark:hover:text-blue'>
                                    <BsFillReplyFill className='mr-0.5 text-base inline-block' />
                                    Reply
                                </button>
                            }
                            <button className='text-xs flex items-center  text-[#c2d4ee] dark:text-[#94a9c9] hover:text-blue dark:hover:text-blue'>
                                <BsPencilSquare className='mr-0.5 text-sm inline-block' />
                                Change
                            </button>
                        </div>
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
                canReply && isReply && <CommentInput showCancelButton onRequestCancel={() => setIsReply(false)} onSubmit={handleSubmit} />
            }
        </div>
    )
}

export default Comment