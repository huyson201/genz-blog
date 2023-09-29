
import React from 'react'
import BlogRow from './BlogRow/BlogRow'
import Pagination from '../Pagination/Pagination'
import { PaginateResponse, Post } from '@/types/type'

interface Props {
    data: PaginateResponse<Post> | Promise<PaginateResponse<Post>>,
    currentPage: number,
    pathname?: string
}

const BlogList = async ({ data, pathname }: Props) => {
    let cloneData = data
    if (cloneData instanceof Promise) {
        cloneData = await cloneData
    }


    if (cloneData.totalDocs <= 0) {
        return (
            <div className='pt-12 pb-6  divide-y divide-on_light_border_2 dark:divide-on_dark_border'>
                <div className='text-center text-on_light_text_gray dark:text-on_dark_text_gray'>
                    There&apos;s nothing here
                </div>
            </div>
        )
    }

    return (
        <>
            <div className='pt-0 lg:pt-12 pb-6  divide-y divide-on_light_border_2 dark:divide-on_dark_border'>
                {
                    cloneData.docs.map((post, index) => {
                        return <BlogRow key={index} post={post} />
                    })
                }
            </div>
            {cloneData.totalPages > 1 && <Pagination pathname={pathname} className='mb-24' currentPage={cloneData.page} totalPage={cloneData.totalPages} />}
        </>
    )
}

export default BlogList