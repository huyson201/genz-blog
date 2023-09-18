
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import React, { Fragment, useState } from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { twMerge } from 'tailwind-merge'
import DNDUploadFile from './DNDUploadFile'

interface Props {
    open: boolean,
    onSelectImage?: (image: string) => void,
    onRequestClose: () => void
}

const UploadImage = ({ open, onRequestClose, onSelectImage }: Props) => {
    const [images, setImages] = React.useState<File[]>([])

    const handleUploadSuccess = React.useCallback((files: File[]) => {
        setImages(files)
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
                    <div className="fixed inset-0 z-10 bg-black/30" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto z-10">
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
                                <DNDUploadFile onUploadSuccess={handleUploadSuccess} />

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