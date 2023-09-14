"use client"
import React from 'react'
import PostForm from '../PostForm/PostForm'
import { PostFormData } from '@/types/type'
import { notFound } from 'next/navigation'
import useSWR from 'swr'
import postService from '@/services/post.service'
import Wrapper from '../Common/Wrapper/Wrapper'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { assertPostDataChange } from '@/utils/assertPostDataChange'
import authService from '@/services/auth.service'

interface Props {
    postId: string
}

const EditPost = ({ postId }: Props) => {
    const { data: session } = useSession()
    const { data, isLoading, error, mutate } = useSWR(!session ? null : [`/posts/${postId}`, postId, session.backendTokens.access_token], ([url, postId, token]) => authService.getPostById(postId, token))

    const handleOnSave = async (post: PostFormData) => {
        if (!data || !session) return
        if (!assertPostDataChange(post, data) || isLoading) return
        const updatePromise = mutate(postService.updatePost("", { arg: { postId: data._id, post, token: session.backendTokens.access_token } }))
        toast.promise(updatePromise, {
            loading: "Saving post!",
            success: "Post was saved!",
            error: "can't save post!"
        })
    }

    if (error) return notFound()

    if (isLoading) {
        return (
            <Wrapper>
                <div className='py-24 text-center dark:text-on_dark_text_gray text-on_light_text_gray text-3xl font-medium'>Loading....</div>
            </Wrapper>
        )
    }
    return (
        <PostForm onSave={handleOnSave} defaultValue={data ? { ...data, hashtags: data.hashtags.map(tag => tag.name) } : undefined} />
    )
}

export default EditPost