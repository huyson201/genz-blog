"use client"
import ConfirmDialog from '@/components/ConfirmDigalog/ConfirmDialog'
import Pagination from '@/components/Pagination/Pagination'
import PostRow from '@/components/PostRow/PostRow'
import authService from '@/services/auth.service'
import { Post, SaveOptions } from '@/types/type'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import useSWR from 'swr'

type Props = {
    type: SaveOptions,
    page: number,
    q?: string
}

const ListPost = ({ type, page, q }: Props) => {
    const { data: session } = useSession()
    const [isOpenDialog, setIsOpenDialog] = useState(false)
    const [delData, setDelData] = useState<Post>()

    const { data, isLoading, mutate, error } = useSWR(!session ? null : ["me/posts", session.backendTokens.access_token, type, page, q],
        ([url, token, type, page, q]) => authService.getPosts(token, { page: page, display: type, q }))


    if (isLoading) {
        return <div className='text-center text-xl'>Loading...</div>
    }
    if (!data || data.totalDocs === 0) {
        return (
            <div className='text-center text-on_light_text_gray dark:text-on_dark_text_gray'>There&apos;s nothing here</div>
        )
    }


    const handleDelete = (data: Post) => {
        setIsOpenDialog(true)
        setDelData(data)
    }

    const handleCloseDialog = () => {
        if (delData) {
            setDelData(undefined)
        }
        setIsOpenDialog(false)
    }

    const handleConfirmDel = () => {
        if (!delData || !session) return
        const delPostPromise = authService.deletePost(session.backendTokens.access_token, delData._id)
        toast.promise(delPostPromise, {
            loading: "Post is deleting",
            error: "Delete post fail!",
            success: "Successfully delete post!"
        }).then(() => {

            mutate()
        })
    }
    return (
        <>
            <div className='divide-y dark:divide-on_dark_border divide-on_light_border'>

                {
                    data.docs.map(post => <PostRow onDelete={handleDelete} data={post} key={post._id} />)
                }
            </div>
            {
                data && data.page > 1 && <Pagination currentPage={page} totalPage={data.totalPages} />
            }
            <ConfirmDialog onRequestClose={handleCloseDialog} onConfirm={handleConfirmDel} isOpen={isOpenDialog} />
        </>
    )
}

export default ListPost