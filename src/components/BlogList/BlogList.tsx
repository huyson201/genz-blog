
import React from 'react'
import BlogRow from './BlogRow/BlogRow'
import Pagination from '../Pagination/Pagination'
import { PaginateResponse, Post } from '@/types/type'

interface Props {
    data: Promise<PaginateResponse<Post>>,
    currentPage: number
}

const BlogList = async ({ data }: Props) => {
    const result = await data
    return (
        <>
            <div className='pt-12 pb-6'>
                {
                    result.docs.map((post, index) => {
                        return <BlogRow key={index} post={post} />
                    })
                }
            </div>
            {result.totalPages > 1 && <Pagination className='mb-24' currentPage={result.page} totalPage={result.totalPages} />}
        </>
    )
}

export default BlogList