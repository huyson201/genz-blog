
import React from 'react'

type Props = {
    children?: any
}

const CommentSkeleton = ({ children }: Props) => {
    return (
        <div className='comment-box animate-pulse'>
            <div className='flex-col gap-y-4 md:flex-row flex justify-between items-start'>
                <div className='flex items-center gap-x-2 md:flex-1 comment-head'>
                    <span className='w-10 h-10 rounded-full bg-gray-400 dark:bg-gray-700' />
                    <div className='w-3/5 space-y-3'>
                        <div className='rounded-full bg-gray-400 dark:bg-gray-700 w-full h-3'>

                        </div>
                        <div className='rounded-full bg-gray-400 dark:bg-gray-700 w-full h-3'>

                        </div>
                    </div>
                </div>
                <div className='w-full md:w-3/5'>
                    <div className='bg-on_light_card_bg dark:bg-on_dark_card_bg border 
                 dark:border-on_dark_border border-on_light_border_2 p-4  rounded-lg space-y-3'>
                        <div className='w-full h-2 rounded-full bg-gray-400 dark:bg-gray-700'> </div>
                        <div className='w-full h-2 rounded-full bg-gray-400 dark:bg-gray-700'> </div>
                        <div className='space-x-3'>
                            <span className=' inline-block h-2 rounded-full bg-gray-400 dark:bg-gray-700 w-8'></span>
                            <span className=' inline-block h-2 rounded-full bg-gray-400 dark:bg-gray-700 w-8'></span>
                            <span className=' inline-block h-2 rounded-full bg-gray-400 dark:bg-gray-700 w-8'></span>
                        </div>
                    </div>
                </div>
            </div>
            {children}
        </div>
    )
}

export default CommentSkeleton