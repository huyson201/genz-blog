"use client"
import React, { useRef, useState } from 'react'
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
import toast from 'react-hot-toast'
import CommentSkeleton from '../Skeleton/CommentSkeleton'

type Props = {
    comment: Comment,
    canReply?: boolean,
    onUpdate?: (_id: string, content: string) => void,
    onDelete?: (_id: string) => void
}

const replyLoadingSkeleton = Array(4).fill(1).map((_, index) => <CommentSkeleton key={index} />)

const Comment = ({ comment, canReply, onUpdate, onDelete }: Props) => {
    const [showReply, setShowReply] = useState(false)
    const [loadReply, setLoadReply] = useState(false)
    const [replyComment, setReplyComment] = useState<Comment[]>([])
    const { data: session } = useSession()
    const [errorReply, setErrorReply] = useState("")
    const commentState = useComment()
    const textareaRef = useRef<HTMLTextAreaElement>(null)


    const isShowReplyInput = canReply && commentState?.reply === comment._id
    const hasUpdate = commentState?.updateId === comment._id
    const isCommentAuth = comment.author._id === session?.user._id
    const hasReplyCount = comment.replyCount > 0 && !showReply

    const handleSubmit = async (value: string) => {
        if (!session) return
        const { error, data } = await commentService.createComment(session.backendTokens.access_token, { content: value, post: comment.post, parent: comment._id })
        if (error) {
            setErrorReply(error.message)
            return
        }

        setReplyComment(prev => removeDuplicateObj([data, ...prev]))
        commentState?.setReply(null)
    }


    const handleClickShowReply = async () => {
        if (showReply) return
        setLoadReply(true)
        const res = await commentService.getReplyComments(comment.post, comment._id)
        setReplyComment(removeDuplicateObj([...res]).filter(value => value.parent !== ""))
        setLoadReply(false)
        if (!showReply) {
            setShowReply(true)
        }
    }

    const handleUpdate = () => {
        if (!textareaRef.current || textareaRef.current.value === "") return
        onUpdate?.(comment._id, textareaRef.current.value)
        commentState?.setUpdate(null)

    }
    const handleUpdateChild = async (_id: string, content: string) => {
        if (!session) return
        const promiseUpdate = commentService.updateComment(session?.backendTokens.access_token, _id, content)
        try {
            await toast.promise(promiseUpdate, {
                error: "Update fail!",
                success: "Comment updating!",
                loading: "Successfully update comment!"
            })
            const updatedCmtIndex = replyComment.findIndex(comment => comment._id === _id)
            const cloneData = [...replyComment]
            cloneData[updatedCmtIndex].content = content
            console.log("clone data")
            console.log(cloneData)
            setReplyComment([...cloneData])
        } catch (error) {
            console.log(error)
        }
    }

    const deleteCommentChild = async (_id: string) => {
        if (!session) return
        const promiseUpdate = commentService.deleteComment(session?.backendTokens.access_token, _id)
        try {
            await toast.promise(promiseUpdate, {
                error: "Delete comment fail!",
                success: "Comment deleting!",
                loading: "Successfully delete comment!"
            })
            const cloneData = replyComment.filter(comment => comment._id !== _id)
            setReplyComment(cloneData)
        } catch (error) {
            throw error
        }
    }


    return (
        <div className='comment-box '>
            <div className='flex-col gap-y-4 md:flex-row flex justify-between items-start'>
                <div className='flex items-center gap-x-2 md:flex-1 comment-head'>
                    <Image src={comment.author.avatar_url} alt='avatar' width={40} height={40} className='rounded-full w-10 h-10' />
                    <div>
                        <div className='font-bold text-[#4e658a] dark:text-[#66768f]'>
                            {comment.author.name}
                            {comment.author._id === session?.user._id && <span className='inline-block ml-1 font-normal'>(@you)</span>}
                        </div>
                        <div className='text-[#4e658a] dark:text-[#66768f] text-sm font-normal'>{formatDate(comment.createdAt, "MMMM D, YYYY")}</div>
                    </div>
                </div>

                <div className='w-full md:w-3/5'>
                    <div className='bg-on_light_card_bg dark:bg-on_dark_card_bg border text-sm md:text-base
                 dark:border-on_dark_border border-on_light_border_2 p-4  rounded-lg text-[#708ab0] dark:text-[#94a9c9]'>

                        {
                            hasUpdate ? (
                                <>
                                    <textarea className='w-full bg-transparent resize-y outline-none border-none' ref={textareaRef} autoFocus defaultValue={comment.content} >
                                    </textarea>
                                    <div className='space-x-3 flex justify-end'>
                                        <button
                                            className=' text-sm text-[#708ab0] dark:text-[#94a9c9] hover:text-blue dark:hover:text-blue'
                                            onClick={() => commentState.setUpdate(null)}>
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleUpdate}
                                            className='text-sm text-[#708ab0] dark:text-[#94a9c9] hover:text-blue dark:hover:text-blue'>
                                            Save
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {comment.content}
                                    <div className='mt-3 space-x-4 flex items-baseline'>
                                        {
                                            canReply && <CommentActionButton
                                                onClick={() => commentState?.setReply(comment._id)}>
                                                <BsFillReplyFill className='mr-0.5 text-base inline-block' />
                                                Reply
                                            </CommentActionButton>
                                        }
                                        {
                                            isCommentAuth && <CommentActionButton
                                                onClick={() => commentState?.setUpdate(comment._id)}>
                                                <BsPencilSquare className='mr-0.5 text-sm inline-block' />
                                                Change
                                            </CommentActionButton>
                                        }
                                        {
                                            isCommentAuth && (
                                                <CommentActionButton
                                                    onClick={() => onDelete?.(comment._id)}>
                                                    <MdRestoreFromTrash className='mr-0.5 text-sm inline-block' />
                                                    Delete
                                                </CommentActionButton>)
                                        }
                                    </div>
                                </>
                            )
                        }
                    </div>
                    {
                        hasReplyCount && <div className='text-center md:text-left'>
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
                loadReply && replyLoadingSkeleton
            }
            {
                replyComment.length > 0 && replyComment.map(comment => <Comment onUpdate={handleUpdateChild} onDelete={deleteCommentChild} comment={comment} key={comment._id} />)
            }

            {
                isShowReplyInput && <CommentInput showCancelButton onRequestCancel={() => commentState.setReply(null)} onSubmit={handleSubmit} />
            }
            {
                errorReply && <div className='mt-4 text-sm text-red-500'>{errorReply}</div>
            }
        </div>
    )
}



export default Comment


interface CommentActionButtonProp {
    onClick?: () => void,
    children: any
}
const CommentActionButton = ({ onClick, children }: CommentActionButtonProp) => {
    return <button
        onClick={onClick}
        className='text-xs flex items-center  text-[#708ab0] dark:text-[#94a9c9] hover:text-blue dark:hover:text-blue'>
        {children}
    </button>
}