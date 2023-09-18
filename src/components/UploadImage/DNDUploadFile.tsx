
"use client"
import Image from 'next/image'
import React from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { twMerge } from 'tailwind-merge'

interface Props {
    onUploadSuccess?: (data: File[]) => void,
    darkMode?: boolean
}

const DNDUploadFile = ({ darkMode, onUploadSuccess }: Props) => {
    const fileRef = React.useRef<HTMLInputElement>(null)
    const [isDrag, setIsDrag] = React.useState(false)
    const [images, setImages] = React.useState<File[]>([])
    const [isUploading, setIsUploading] = React.useState(false)
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

    const handleImage = (files: FileList) => {
        setIsUploading(true)
        const images: File[] = []
        Array.from(files).forEach(file => {
            if (file.type.split("/")[0] === "image") {
                images.push(file)
            }
        })
        setImages(images)
        onUploadSuccess?.(images)
        setIsUploading(false)
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
        handleImage(files)
    }
    return (
        <div
            className={twMerge(`
            cursor-pointer mt-4 w-full min-h-[160px] border-dashed border
            border-on_dark_border flex items-center justify-center transition-all 
            [&.dragging]:border-solid [&.dragging]:opacity-60
            `, isDrag ? "dragging" : "", darkMode ? "hover:bg-gray-950/20" : "hover:bg-gray-100")}

            onClick={handleClickArea}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}>
            <div className={twMerge('text-5xl text-on_text_gray_2 text-center px-3', isUploading && "hidden")}>
                <FaCloudUploadAlt className="inline-block" />
                <div className='text-base'>Drag and drop an image here or click to upload file</div>
            </div>
            <input ref={fileRef} type="file" className='hidden' accept='image/*' multiple onChange={handleOnchange} />

            {/* {
                images.length > 0 && (
                    <div className='w-full h-full flex flex-wrap gap-3 px-3'>

                        {
                            images.map((img, index) => {
                                const url = URL.createObjectURL(img)
                                return (
                                    <div key={index} className='max-w-[20%] w-full'>
                                        <Image src={url} alt='img' width={60} height={80} />
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            } */}

        </div>
    )
}

export default DNDUploadFile