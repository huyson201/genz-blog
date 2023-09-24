
import BlogList from '@/components/BlogList/BlogList'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import Wrapper from '@/components/Common/Wrapper/Wrapper'
import GradientText from '@/components/GradientText/GradientText'
import BlogRowSkeleton from '@/components/Skeleton/BlogRowSkeleton'
import postService from '@/services/post.service'
import { Metadata } from 'next'
import React, { Suspense } from 'react'

interface Props {
    searchParams: {
        page: number
    }
}

export const metadata: Metadata = {
    title: 'Recent Blogs - Gen Z Blogger',
    description: "Discover the latest blog posts  on Gen Z blogger. Stay informed with our recent articles covering a wide range of topics, from technology to lifestyle.",
    alternates: {
        canonical: "/blogs"
    },
    openGraph: {
        title: 'Recent Blogs - Gen Z Blogger',
        description: "Discover the latest blog posts  on Gen Z blogger. Stay informed with our recent articles covering a wide range of topics, from technology to lifestyle.",
        images: [`/api/screenshot?url=${process.env.VERCEL_URL || `http://localhost:${process.env.PORT || 3000}`}/blogs`]
    },
}

const Blogs = async ({ searchParams: { page = 1 } }: Props) => {
    console.log(process.env.VERCEL_URL)
    const post = postService.getPosts({ page })
    return (
        <section className='mb-24'>
            <Wrapper>
                <div className='lg:px-24'>
                    <div className='space-y-4 py-6 border-b border-b-[#c2d4ee] dark:border-b-on_dark_border'>
                        <h1 className='text-center mt-6'>
                            <GradientText size={"xl"} className='font-extrabold' >
                                Blogs
                            </GradientText>
                        </h1>
                        <div className='flex justify-center'>
                            <Breadcrumb />
                        </div>
                    </div>
                    <Suspense fallback={(
                        <div className='pt-12 pb-6  divide-y divide-on_light_border_2 dark:divide-on_dark_border'>
                            {
                                Array(10).fill(1).map((_, index) => <BlogRowSkeleton key={`row-${index}`} />)
                            }
                        </div>
                    )}>
                        <BlogList data={post} currentPage={page} />
                    </Suspense>
                </div>
            </Wrapper>
        </section>

    )
}

export default Blogs