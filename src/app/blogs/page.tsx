
import BlogList from '@/components/BlogList/BlogList'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import Wrapper from '@/components/Common/Wrapper/Wrapper'
import postService from '@/services/post.service'
import React, { Suspense } from 'react'

interface Props {
    searchParams: {
        page: number
    }
}

const Blogs = ({ searchParams: { page = 1 } }: Props) => {
    const post = postService.getPosts({ page })
    return (
        <section className='mb-24'>
            <Wrapper>
                <div className='lg:px-24'>
                    <div className='text-center space-y-4 py-6 border-b border-b-[#c2d4ee] dark:border-b-on_dark_border'>
                        <h1 className='inline-block text-center mt-6 text-[30px] sm:text-[36px] md:text-[48px] lg:text-[64px] bg-primary-gradient text-transparent 
                                bg-200% bg-clip-text font-extrabold '>
                            Blogs
                        </h1>
                        <div className='flex justify-center'>
                            <Breadcrumb />
                        </div>
                    </div>
                    <Suspense fallback={<div>Loading...</div>}>
                        <BlogList data={post} currentPage={page} />
                    </Suspense>
                    {/* <div className='pt-12 pb-6'>
                    {
                        Array(6).fill(1).map((_, index) => {
                            return <BlogRow key={index} />
                        })
                    }
                </div>
                <Pagination className='mb-24' /> */}
                </div>
            </Wrapper>
        </section>
    )
}

export default Blogs