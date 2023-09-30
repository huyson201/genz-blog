"use client"
import ConfirmDialog from '@/components/ConfirmDigalog/ConfirmDialog'
import Pagination from '@/components/Pagination/Pagination'
import PostRow from '@/components/PostRow/PostRow'
import PostRowSkeleton from '@/components/Skeleton/PostRowSkeleton'
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

    const loadingDisplayElement = (
        <div className='divide-y dark:divide-on_dark_border divide-on_light_border'>
            {
                Array(10).fill(1).map((_, index) => <PostRowSkeleton key={index} />)
            }
        </div>
    )

    const dataEmptyDisplayElement = (
        <div className='text-center text-on_light_text_gray dark:text-on_dark_text_gray'>There&apos;s nothing here</div>
    )

    const isShowPagination = data && data.totalPages > 1

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
        const toastMessage = {
            loading: "Post is deleting",
            error: "Delete post fail!",
            success: "Successfully delete post!"
        }
        toast.promise(delPostPromise, toastMessage).then(() => mutate())
    }


    if (isLoading) {
        return loadingDisplayElement
    }

    if (!data || data.totalDocs === 0) {
        return dataEmptyDisplayElement
    }

    return (
        <>
            <div className='divide-y dark:divide-on_dark_border divide-on_light_border'>
                {
                    data.docs.map(post => <PostRow onDelete={handleDelete} data={post} key={post._id} />)
                }
            </div>
            {
                isShowPagination && <Pagination currentPage={page} totalPage={data.totalPages} />
            }
            <ConfirmDialog onRequestClose={handleCloseDialog} onConfirm={handleConfirmDel} isOpen={isOpenDialog} />
        </>
    )
}

export default ListPost