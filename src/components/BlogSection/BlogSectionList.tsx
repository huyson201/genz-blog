
import { PaginateResponse, Post } from '@/types/type'
import React from 'react'
import BlogSection from './BlogSection'
import Link from 'next/link'
import { buttonVariants } from '../Button/Button'
import { cn } from '@/utils'

interface Props {
    postPromise: Promise<PaginateResponse<Post>>
}

const BlogSectionList = async ({ postPromise }: Props) => {
    const posts = await postPromise
    const isShowViewMoreBtn = posts.totalPages > 1
    return (
        <>
            <div className='lg:flex lg:flex-wrap lg:gap-6 space-y-6 lg:space-y-0'>
                {
                    posts.docs.map(post => <BlogSection post={post} key={post._id} />)
                }
            </div>

            {/* pagination */}
            {
                isShowViewMoreBtn && (
                    <div className='mt-12 flex items-center justify-center'>
                        <Link
                            href={"/blogs"}
                            className={cn(buttonVariants({ size: "sm", className: "w-full sm:w-[60%]" }))}>
                            View more
                        </Link>
                    </div>
                )
            }

        </>
    )
}

export default BlogSectionList

