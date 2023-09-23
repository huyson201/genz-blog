
import React from 'react'

type Props = {}

const BlogRowSkeleton = (props: Props) => {
    return (
        <div className='flex flex-col md:flex-row py-6 gap-y-6 gap-x-6 animate-pulse'>
            <div className='md:min-w-[170px]'>
                <div className='flex items-center gap-4'>
                    <span className='rounded-full w-12 h-12 dark:bg-gray-700 bg-gray-400' />
                    <div className='space-y-2 flex-1'>
                        <div className='h-2 rounded-full w-full dark:bg-gray-700 bg-gray-400'></div>
                        <div className='h-2 rounded-full w-full dark:bg-gray-700 bg-gray-400'></div>
                    </div>
                </div>

            </div>
            <div className='flex-1 space-y-3'>
                <div className='h-3 rounded-full w-full dark:bg-gray-700 bg-gray-400 '> </div>
                <div className='space-y-2'>
                    <p className=" w-full h-2 rounded-full dark:bg-gray-700 bg-gray-400"></p>
                    <p className=" w-full h-2 rounded-full dark:bg-gray-700 bg-gray-400"></p>
                </div>
                <div className='space-y-2 space-x-2 mt-auto'>
                    {
                        Array(3).fill(0).map((_, index) => (<span key={index} className='w-12 h-3 inline-block rounded-full dark:bg-gray-700 bg-gray-400 '></span>))
                    }
                </div>
                <div className='flex items-center justify-between'>
                    <span className='w-20 h-3 rounded-full dark:bg-gray-700 bg-gray-400'></span>
                    <span className='w-24 h-3 rounded-full dark:bg-gray-700 bg-gray-400'></span>
                </div>
            </div>
        </div>
    )
}

export default BlogRowSkeleton