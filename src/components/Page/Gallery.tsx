"use client"
import React from 'react'
import DNDUploadFile from '../UploadImage/DNDUploadFile'
import ImageList from '../ImageList/ImageList'
import { useSWRConfig } from 'swr'
import { ImageType } from '@/types/type'
import { useSession } from 'next-auth/react'
type Props = {}

const Gallery = (props: Props) => {
    const { mutate } = useSWRConfig()
    const { data: session } = useSession()
    const handleUploadSuccess = async () => {
        if (!session) return
        mutate(["/auth/gallery", session.backendTokens.access_token])

    }
    return (
        <>
            <DNDUploadFile onUploadSuccess={handleUploadSuccess} />
            <ImageList />
        </>
    )
}

export default Gallery