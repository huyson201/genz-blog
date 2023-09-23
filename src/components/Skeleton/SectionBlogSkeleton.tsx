
import React from 'react'

type Props = {}

const SectionBlogSkeleton = (props: Props) => {
    return (
        <article className=" flex flex-col lg:w-[calc(50%_-_12px)] p-4 bg-on_light_card_bg rounded-lg border
    dark:border-on_dark_border shadow-md dark:bg-on_dark_card_bg border-on_light_border
    transition-all hover:-translate-y-1 gap-y-2 animate-pulse">

            <div className="flex items-center space-x-1.5 ">
                <span className="w-7 h-7 rounded-full dark:bg-gray-700 bg-gray-400" />
                <span className="inline-block w-2/5 h-2 rounded-full dark:bg-gray-700 bg-gray-400">
                </span>
            </div>
            <div className=' mb-4 w-full h-4 mt-2 rounded-full dark:bg-gray-700 bg-gray-400'></div>
            <p className=" w-full h-2 rounded-full dark:bg-gray-700 bg-gray-400"></p>
            <p className=" w-full h-2 rounded-full dark:bg-gray-700 bg-gray-400"></p>
            <p className=" w-full h-2 rounded-full dark:bg-gray-700 bg-gray-400"></p>
            <div className='space-y-2 space-x-2 mt-auto'>
                {
                    Array(3).fill(0).map((_, index) => (<span key={index} className='w-12 h-3 inline-block rounded-full dark:bg-gray-700 bg-gray-400 '></span>))
                }
            </div>
            <p className=" w-full h-2 rounded-full dark:bg-gray-700 bg-gray-400"></p>
        </article>
    )
}

export default SectionBlogSkeleton