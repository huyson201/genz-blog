
import Image from 'next/image'
import React from 'react'
import { BsTrash } from 'react-icons/bs'
import { twMerge } from 'tailwind-merge'

type Props = {
    src: string,
    atl: string,
    onUploadSuccess?: (data: any) => void,
    onRemove?: () => void
}

const ImagePreview = ({ src, atl, onRemove }: Props) => {
    const handleRemove = () => {
        onRemove?.()
    }
    return (
        <div className={twMerge('relative group w-full ')}>
            {/* <BsCheckCircleFill /> */}
            <button onClick={handleRemove}
                className='text-white py-1 hidden   absolute bottom-0 group-hover:flex w-full items-center justify-center
                             bg-black/20 text-center'>
                <span><BsTrash /></span>
            </button>
            <Image src={src} alt={atl} className='w-full object-cover' width={80} height={80} />
        </div>
    )
}

export default ImagePreview