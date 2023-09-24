
import React from 'react'
import BlogRow from './BlogRow/BlogRow'
import Pagination from '../Pagination/Pagination'
import { PaginateResponse, Post } from '@/types/type'

interface Props {
    data: PaginateResponse<Post> | Promise<PaginateResponse<Post>>,
    currentPage: number
}

const BlogList = async ({ data }: Props) => {
    let cloneData = data
    if (cloneData instanceof Promise) {
        cloneData = await cloneData
    }

    return (
        <>
            <div className='pt-12 pb-6  divide-y divide-on_light_border_2 dark:divide-on_dark_border'>
                {
                    cloneData.docs.map((post, index) => {
                        return <BlogRow key={index} post={post} />
                    })
                }
            </div>
            {cloneData.totalPages > 1 && <Pagination className='mb-24' currentPage={cloneData.page} totalPage={cloneData.totalPages} />}
        </>
    )
}

export default BlogList