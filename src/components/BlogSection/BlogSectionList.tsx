
import { PaginateResponse, Post } from '@/types/type'
import React from 'react'
import BlogSection from './BlogSection'
import Link from 'next/link'

interface Props {
    postPromise: Promise<PaginateResponse<Post>>
}

const BlogSectionList = async ({ postPromise }: Props) => {
    const res = await postPromise
    return (
        <>

            <div className='lg:flex lg:flex-wrap lg:gap-6 space-y-6 lg:space-y-0'>
                {
                    res.docs.map(post => <BlogSection post={post} key={post._id} />)
                }
            </div>

            {/* pagination */}
            <div className='mt-12 flex items-center justify-center'>
                <Link href={"/blogs"} className='text-white rounded-md text-sm font-bold bg-primary-gradient bg-200% hover:bg-right transition-all duration-500 w-[60%] text-center py-2'>View more</Link>
            </div>
        </>
    )
}

export default BlogSectionList