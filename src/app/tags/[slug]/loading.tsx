
import BlogRowSkeleton from '@/components/Skeleton/BlogRowSkeleton'
import React from 'react'

type Props = {}

function loading({ }: Props) {
    return (
        <div className='pt-12 pb-6  divide-y divide-on_light_border_2 dark:divide-on_dark_border'>
            {
                Array(10).fill(1).map((_, index) => <BlogRowSkeleton key={`row-${index}`} />)
            }
        </div>
    )
}

export default loading