
import React from 'react'

type Props = {}

const LastCommentSkeleton = (props: Props) => {
    return (
        <div className={"py-6 animate-pulse"}>
            <div className='space-y-4'>
                <p className=" w-full h-2 rounded-full dark:bg-gray-700 bg-gray-400"></p>
                <p className=" w-full h-2 rounded-full dark:bg-gray-700 bg-gray-400"></p>
                <p className=" w-full h-2 rounded-full dark:bg-gray-700 bg-gray-400"></p>
            </div>

            <div className='flex items-center space-x-4  mt-6'>
                <span className='rounded-full w-8 h-8 dark:bg-gray-700 bg-gray-400 inline-block' />
                <div className='w-2/5 space-y-2' >
                    <div className='w-full h-2 rounded-full dark:bg-gray-700 bg-gray-400'></div>
                    <div className='w-full h-2  rounded-full dark:bg-gray-700 bg-gray-400'></div>
                </div>
            </div>
        </div>
    )
}

export default LastCommentSkeleton