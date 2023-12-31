"use client"
import authService from '@/services/auth.service'
import { useSession } from 'next-auth/react'
import React from 'react'
import useSWR from 'swr'
import ImagePreview from './ImagePreview'
import toast from 'react-hot-toast'
type Props = {
    onSelectImage?: (url: string) => void,
    showBlankSelect?: boolean
}

const fetchGallery = ([_, token]: [string, string]) => authService.gallery(token)

const ImageList = ({ showBlankSelect, onSelectImage }: Props) => {
    const { data: session } = useSession()
    const fetchGalleryKey = !session ? null : ["/auth/gallery", session.backendTokens.access_token]
    const { data, isLoading, mutate } = useSWR(fetchGalleryKey, fetchGallery)

    if (isLoading) return <div className='flex items-center justify-center py-4 text-xl font-medium'>Loading...</div>

    const handleDelete = async (id: string) => {

        if (!session || !data) return
        if (session.user.avatar_url.includes(id)) {
            toast.error("You cannot delete the image. You are using this image as your profile picture.")
            return
        }
        const promiseDelete = authService.deleteImage(id, session.backendTokens.access_token)

        const delImgMessage = {
            error: "Delete image fail!",
            loading: "Image deleting",
            success: "Image deleted!"
        }

        toast.promise(promiseDelete, delImgMessage).then(() => {
            const cloneData = [...data]
            cloneData.splice(cloneData.findIndex(img => img.public_id === id))
            mutate(cloneData)
        })
    }
    return (
        <div className='grid grid-cols-4 gap-3 py-4'>
            {showBlankSelect && (<div
                className='font-bold text-sm cursor-pointer border-on_light_border_2 border border-dashed
                                text-black flex justify-center items-center min-h-[60px] dark:border-on_dark_border'
                onClick={() => onSelectImage?.("")}>
                Blank
            </div>)}
            {data && data.map(img => <ImagePreview onSelect={() => onSelectImage?.(img.secure_url)} onRemove={() => handleDelete(img.public_id)} key={img._id} src={img.secure_url} atl={img.original_filename} />)}
        </div>
    )
}

export default ImageList