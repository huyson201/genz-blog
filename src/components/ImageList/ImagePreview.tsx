
import Image from 'next/image'
import React from 'react'
import { BsTrash } from 'react-icons/bs'
import { twMerge } from 'tailwind-merge'

type Props = {
    src: string,
    atl: string,
    onRemove?: () => void,
    onSelect?: () => void
}

const ImagePreview = ({ src, atl, onRemove, onSelect }: Props) => {
    const handleRemove = () => {
        onRemove?.()
    }
    return (
        <div className={twMerge('relative group w-full cursor-pointer ')} onClick={onSelect}>
            <button onClick={handleRemove}
                className='text-white py-1 lg:text-xl hidden absolute bottom-0 group-hover:flex w-full items-center justify-center
                             bg-black/20 text-center'>
                <span><BsTrash /></span>
            </button>
            <Image src={src} alt={atl} className='w-full object-cover' width={80} height={80} />
        </div>
    )
}

export default ImagePreview