"use client"
import authService from '@/services/auth.service'
import { useSession } from 'next-auth/react'
import React from 'react'
import useSWR, { useSWRConfig } from 'swr'
import ImagePreview from './ImagePreview'
import toast from 'react-hot-toast'
type Props = {}

const ImageList = (props: Props) => {
    const { data: session } = useSession()
    const { data, isLoading, mutate } = useSWR(!session ? null : ["/auth/gallery", session.backendTokens.access_token], ([url, token]) => authService.gallery(token))

    if (isLoading) return <div>Loading...</div>
    const handleDelete = async (id: string) => {
        if (!session || !data) return
        const promiseDelete = authService.deleteImage(id, session.backendTokens.access_token)
        toast.promise(promiseDelete, {
            error: "Delete image fail!",
            loading: "Image deleting",
            success: "Image deleted!"
        }).then(() => {
            const cloneData = [...data]
            cloneData.splice(cloneData.findIndex(img => img.public_id === id))
            mutate(cloneData)
        })
    }
    return (
        <div className='grid grid-cols-4 gap-3 py-4'>
            {data && data.map(img => <ImagePreview onRemove={() => handleDelete(img.public_id)} key={img._id} src={img.secure_url} atl={img.original_filename} />)}
        </div>
    )
}

export default ImageList