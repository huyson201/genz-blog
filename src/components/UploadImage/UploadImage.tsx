
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import React, { Fragment, useState } from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { twMerge } from 'tailwind-merge'

interface Props {
    open: boolean,
    onSelectImage?: (image: string) => void,
    onRequestClose: () => void
}

const UploadImage = ({ open, onRequestClose, onSelectImage }: Props) => {
    const fileRef = React.useRef<HTMLInputElement>(null)
    const [isDrag, setIsDrag] = React.useState(false)
    const [images, setImages] = React.useState<File[]>([])

    const handleClickArea = React.useCallback(() => {
        if (!fileRef.current) return
        fileRef.current.click()
    }, [])

    const handleDragOver = React.useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDrag(true)

    }, [])

    const handleDragLeave = React.useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDrag(false)
    }, [])

    const handleDrop = React.useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDrag(false)
        const files = e.dataTransfer.files
        handleImage(files)
    }, [])

    const handleOnchange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files
        if (!files) return
        handleImage(files)
    }, [])

    const handleImage = React.useCallback((files: FileList) => {
        const images: File[] = []
        Array.from(files).forEach(file => {
            if (file.type.split("/")[0] === "image") {
                images.push(file)
            }
        })
        setImages(images)
    }, [])

    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog onClose={onRequestClose} >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/30" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-6 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-md bg-white px-6 py-4 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg flex justify-between items-center font-medium leading-6 text-gray-900"
                                >
                                    Upload Image
                                    <button className='text-xl text-on_dark_text_gray' onClick={onRequestClose}>
                                        <IoClose />
                                    </button>
                                </Dialog.Title>
                                <div
                                    className={twMerge(`
                                    cursor-pointer mt-4 w-full min-h-[160px] border-dashed border
                                    border-on_dark_border flex items-center justify-center transition-all hover:bg-gray-100
                                     [&.dragging]:border-solid [&.dragging]:opacity-60
                                    `, isDrag ? "dragging" : "")}
                                    onClick={handleClickArea}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}>
                                    <div className={twMerge('text-5xl text-on_text_gray_2 text-center px-3', images.length > 0 && "hidden")}>
                                        <FaCloudUploadAlt className="inline-block" />
                                        <div className='text-base'>Drag and drop an image here or click to upload file</div>
                                    </div>
                                    <input ref={fileRef} type="file" className='hidden' accept='image/*' multiple onChange={handleOnchange} />

                                    {
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
                                    }
                                </div>

                                <div className='mt-6'>
                                    <div className='text-on_text_gray_2'>Your Pictures</div>
                                    {
                                        images.length > 0 && (
                                            <div className='w-full  flex flex-wrap gap-3 px-3'>

                                                {
                                                    images.map((img, index) => {
                                                        const url = URL.createObjectURL(img)
                                                        return (
                                                            <div key={index} className='max-w-[20%] w-full' onClick={() => {
                                                                console.log("select img")
                                                                onSelectImage && onSelectImage(url)
                                                            }}>
                                                                <Image src={url} alt='img' width={60} height={80} />
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        )
                                    }

                                </div>
                                <div className='mt-6 text-right'>
                                    <button
                                        onClick={onRequestClose}
                                        className='inline-block text-black border-[#c2d4ee] border px-2 py-1 text-sm 
                                                        hover:bg-blue hover:border-blue rounded hover:text-white transition-all'>
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default UploadImage