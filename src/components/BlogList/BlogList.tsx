
import React from 'react'
import BlogRow from './BlogRow/BlogRow'
import Pagination from '../Pagination/Pagination'
import { PaginateResponse, Post } from '@/types/type'

interface Props {
    data: PaginateResponse<Post>,
    currentPage: number
}

const BlogList = async ({ data }: Props) => {
    return (
        <>
            <div className='pt-12 pb-6'>
                {
                    data.docs.map((post, index) => {
                        return <BlogRow key={index} post={post} />
                    })
                }
            </div>
            {data.totalPages > 1 && <Pagination className='mb-24' currentPage={data.page} totalPage={data.totalPages} />}
        </>
    )
}

export default BlogList