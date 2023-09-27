
import React from 'react'
import CommentSkeleton from './CommentSkeleton'

type Props = {}

const DetailSkeleton = (props: Props) => {
    return (
        <div className='xl:px-16 pt-12 animate-pulse'>
            <div >
                <div>
                    <div className='flex items-center gap-4 mt-4'>
                        <span className='w-12 h-12 rounded-full bg-gray-400 dark:bg-gray-700' />
                        <div>

                            <div className='w-[120px] h-2 rounded-full bg-gray-400 dark:bg-gray-700'></div>
                            <div className='space-x-3'>
                                <span className='w-12 h-2 rounded-full bg-gray-400 dark:bg-gray-700 inline-block'></span>
                                <span className='w-12 h-2 rounded-full bg-gray-400 dark:bg-gray-700 inline-block'></span>
                            </div>
                        </div>
                    </div>

                    <div className='flex mt-6 flex-col lg:flex-row '>

                        <div className='lg:w-3/4 lg:px-3  '>
                            <div className='pb-12 blog-content space-y-4 '>
                                <div className='h-2 w-full rounded-full bg-gray-400 dark:bg-gray-700 '></div>
                                <div className='h-2 w-full rounded-full bg-gray-400 dark:bg-gray-700 '></div>
                                <div className='h-2 w-4/5  rounded-full bg-gray-400 dark:bg-gray-700 '></div>
                                <div className='w-full pb-[40%] md:pb-[30%] rounded-md bg-gray-400 dark:bg-gray-700 '></div>
                                <div className='h-2 w-1/5  rounded-full bg-gray-400 dark:bg-gray-700 '></div>
                                <div className='h-2 w-full rounded-full bg-gray-400 dark:bg-gray-700 '></div>
                                <div className='h-2 w-full rounded-full bg-gray-400 dark:bg-gray-700 '></div>
                                <div className='h-2 w-full rounded-full bg-gray-400 dark:bg-gray-700 '></div>
                                <div className='h-2 w-full rounded-full bg-gray-400 dark:bg-gray-700 '></div>
                                <div className='h-2 w-full rounded-full bg-gray-400 dark:bg-gray-700 '></div>
                                <div className='h-2 w-full rounded-full bg-gray-400 dark:bg-gray-700 '></div>
                                <div className='h-2 w-full rounded-full bg-gray-400 dark:bg-gray-700 '></div>

                            </div>
                            {
                                <div className='space-y-6'>
                                    <CommentSkeleton />
                                    <CommentSkeleton />
                                    <CommentSkeleton />
                                </div>
                            }
                        </div>
                        <div className='lg:w-1/4 lg:px-3 mt-12 lg:mt-0'>
                            <div className='hidden lg:block'>
                                <div className='w-2/5 h-3 rounded-full bg-gray-400 dark:bg-gray-700 '></div>
                                <div className='flex flex-wrap gap-2 mt-4'>
                                    {
                                        Array.from({ length: 3 }).map((_, index) => <span key={index} className='w-12 h-2 rounded-full bg-gray-400 dark:bg-gray-700 inline-block '></span>)
                                    }
                                </div>
                            </div>
                            <div className='hidden lg:block mt-6'>
                                <div className='w-2/5 h-3 rounded-full bg-gray-400 dark:bg-gray-700 '></div>
                                <div className='flex flex-wrap gap-2 mt-4'>
                                    {
                                        Array.from({ length: 5 }).map((_, index) => <span key={index} className='w-12 h-2 rounded-full bg-gray-400 dark:bg-gray-700 inline-block '></span>)
                                    }
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DetailSkeleton