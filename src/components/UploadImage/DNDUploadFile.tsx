
"use client"
import authService from '@/services/auth.service'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { MouseEvent, useEffect, useMemo, useState } from 'react'
import { BiSolidErrorCircle } from 'react-icons/bi'
import { BsCheckCircleFill } from 'react-icons/bs'
import { FaCloudUploadAlt, FaTimes } from 'react-icons/fa'
import { twMerge } from 'tailwind-merge'

interface Props {
    onUploadSuccess?: () => void,
}

const DNDUploadFile = ({ onUploadSuccess }: Props) => {
    const fileRef = React.useRef<HTMLInputElement>(null)
    const [isDrag, setIsDrag] = React.useState(false)
    const [images, setImages] = React.useState<{ file: File, state: "uploading" | "success" | "fail", id: number }[]>([])
    const [isUploading, setIsUploading] = React.useState(false)
    const { data: session } = useSession()

    const handleClickArea = () => {
        if (!fileRef.current) return
        fileRef.current.click()
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDrag(true)

    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDrag(false)
    }


    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDrag(false)
        const files = e.dataTransfer.files
        handleImage(files)
    }

    const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files
        if (!files) return
        setIsUploading(true)
        handleImage(files)
    }

    const handleImage = async (files: FileList) => {
        if (!session) return
        setIsUploading(true)
        const arrImages = Array.from(files)
        setImages(arrImages.map((file, index) => ({ file: file, state: "uploading", id: index })))
        for (let i = 0; i <= arrImages.length - 1; i++) {
            try {
                const res = await authService.uploadImage(arrImages[i], session.backendTokens.access_token)
                removeImg(i)

            } catch (error) {
                setImages(prev => {
                    prev[i].state = "fail"
                    return [...prev]
                })
            }
        }
        onUploadSuccess?.()
        setIsUploading(false)

    }

    const removeImg = (id: number) => {
        setImages(prev => {
            const index = prev.findIndex(value => value.id === id)
            prev.splice(index, 1)
            return [...prev]
        })
    }
    return (
        <div
            className={twMerge(`dnd-upload-wrapper dark:hover:bg-gray-950/20 hover:bg-gray-100`, isDrag ? "dragging" : "")}
            onClick={handleClickArea}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}>
            <div className={twMerge('text-5xl text-on_text_gray_2 text-center px-3 [&.uploading]:hidden', isUploading && "uploading")}>
                <FaCloudUploadAlt className="inline-block" />
                <div className='text-base'>Drag and drop an image here or click to upload file</div>
            </div>
            <input ref={fileRef} type="file" className='hidden' accept='.jpeg, .jpg, .jpe, .png' multiple onChange={handleOnchange} />

            {
                images.length > 0 && (
                    <div className='w-full h-full flex flex-wrap gap-3 px-3'>
                        {
                            images.map((value, index) => {
                                return (
                                    <UploadImagePreview onRemove={() => removeImg(value.id)} file={value.file} key={index} state={value.state} />
                                )
                            })
                        }
                    </div>
                )
            }

        </div>
    )
}

export default DNDUploadFile

interface UploadImagePreviewProps {
    state: "uploading" | "success" | "fail",
    file: File,
    onUploadSuccess?: (data: any) => void,
    onRemove?: () => void
}
const UploadImagePreview = ({ state, file, onRemove }: UploadImagePreviewProps) => {
    const [src, setSrc] = useState<string>()
    useEffect(() => {
        const url = URL.createObjectURL(file)
        setSrc(url)
        return () => URL.revokeObjectURL(url)
    }, [file])

    const handleRemove = (e: MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        onRemove?.()
    }
    return (
        <div className={twMerge('relative w-20 group', state)}>
            <div className='absolute inset-0 bg-white/60 dark:bg-black/20 flex items-center justify-center'>
                {/* <BsCheckCircleFill /> */}
                <span className='dark:text-white text-black text-xs hidden group-[&.uploading]:inline-block'>
                    uploading...
                </span>
                <span className={twMerge('hidden group-[&.fail]:inline-block text-red-500')}>
                    <BiSolidErrorCircle />
                </span>
            </div>
            <button onClick={handleRemove} className='hidden group-[&.fail]:inline-block absolute top-2 right-2 text-red-500 text-xl z-[2]'><FaTimes /></button>
            {
                src && <Image src={src} alt='img' className='w-full object-cover' width={80} height={80} />
            }
        </div>
    )
}