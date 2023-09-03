

import DNDUploadFile from '@/components/UploadImage/DNDUploadFile'
import React from 'react'

type Props = {}

const Gallery = (props: Props) => {
    return (
        <div className='w-full'>
            <DNDUploadFile darkMode />
        </div>
    )
}

export default Gallery