
import React from 'react'

type Props = {}

const PostRowSkeleton = (props: Props) => {
    return (
        <div className=' gap-y-3 gap-x-24 pt-4 pb-4  flex sm:items-center flex-col sm:flex-row animate-pulse'>
            <div className='space-y-2 w-full'>
                <div className='w-full h-3 rounded-full bg-gray-400 dark:bg-gray-700'></div>

                <div className='w-full sm:w-auto space-y-2 space-x-2 mt-auto'>
                    {
                        Array(3).fill(0).map((_, index) => (<span key={index} className='w-12 h-3 inline-block rounded-full dark:bg-gray-700 bg-gray-400 '></span>))
                    }
                </div>
                <div className='w-32 rounded-full h-2 bg-gray-400 dark:bg-gray-700 '></div>
            </div>
            <div className='sm:ml-auto flex items-center gap-x-3'>
                <span className='w-8 h-4 rounded-full bg-gray-400 dark:bg-gray-700'>
                </span>
                <span className='w-8 h-4 rounded-full bg-gray-400 dark:bg-gray-700'>
                </span>
            </div>
        </div>
    )
}

export default PostRowSkeleton