import React from 'react'
import Breadcrumb from '../Breadcrumb/Breadcrumb'
import GradientText from '../GradientText/GradientText'

type Props = {}

const TagGridSkeleton = (props: Props) => {
    return (
        <div className='animate-pulse'>
            <h1 className='text-center '>
                <GradientText size={"xl"} className='font-extrabold' >
                    Tags
                </GradientText>
            </h1>
            <div className='flex justify-center items-center mb-6'>
                <span className='w-2/3 h-2 inline-block rounded-full bg-gray-400 dark:bg-gray-700'></span>
            </div>
            <div className='flex justify-center pb-6  border-b border-b-[#c2d4ee] dark:border-b-on_dark_border'>
                <Breadcrumb />
            </div>
            <div className='grid grid-cols-2 md:grid-cols-3 text-center lg:grid-cols-4  gap-y-8 pt-12'>
                {
                    Array(30).fill(1).map((_, index) => (
                        <span className='inline-block h-3 rounded-full bg-gray-400 dark:bg-gray-700 w-20' key={index}></span>
                    ))
                }
            </div>
        </div>
    )
}

export default TagGridSkeleton