"use client"
import React, { useMemo } from 'react'
import PostForm from '../PostForm/PostForm'
import { PostFormData } from '@/types/type'
import useSWRMutation from 'swr/mutation'
import postService from '@/services/post.service'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { assertPostDataChange } from '@/utils/assertPostDataChange'
type Props = {}

const CreateNewPost = (props: Props) => {
    const { data: session } = useSession()
    const { trigger, isMutating, data } = useSWRMutation('/posts/create', postService.createPost, /* options */)
    const updateMutation = useSWRMutation('/posts/update', postService.updatePost)

    const defaultValue: PostFormData | undefined = useMemo(() => {
        if (updateMutation.data) {
            return {
                content: updateMutation.data.content,
                display: updateMutation.data.display,
                title: updateMutation.data.title,
                hashtags: updateMutation.data.hashtags.map(tag => tag.name),
                description: updateMutation.data.description
            }
        }

        if (data) {
            return {
                content: data.content,
                display: data.display,
                title: data.title,
                hashtags: data.hashtags.map(tag => tag.name),
                description: data.description
            }
        }

        return undefined

    }, [data, updateMutation.data])
    const handleOnSave = async (post: PostFormData) => {
        if (!session || !session.backendTokens) return
        if (!updateMutation.data && data && !assertPostDataChange(post, data) || isMutating) return
        if (updateMutation.data && !assertPostDataChange(post, updateMutation.data) || isMutating) return

        if (data && data._id !== "") {
            const updatePromise = updateMutation.trigger({
                postId: data._id,
                post: post,
                token: session.backendTokens.access_token
            })
            toast.promise(updatePromise, {
                loading: "Saving post!",
                success: "Post was saved!",
                error: "can't save post!"
            })
            return
        }

        toast.promise(trigger({
            post: post,
            token: session.backendTokens.access_token
        }), {
            loading: "Saving post!",
            success: "Post was saved!",
            error: "can't save post!"
        })
    }


    return (
        <PostForm onSave={handleOnSave} defaultValue={defaultValue} />
    )
}

export default CreateNewPost