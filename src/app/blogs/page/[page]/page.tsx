
import BlogList from '@/components/BlogList/BlogList'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import GradientText from '@/components/GradientText/GradientText'
import BlogRowSkeleton from '@/components/Skeleton/BlogRowSkeleton'
import postService from '@/services/post.service'
import { createOpenGraphImg } from '@/utils'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React, { Suspense } from 'react'

interface Props {
    params: {
        page: number | string
    }
}
export const metadata: Metadata = {
    title: 'Recent Blogs',
    description: "Discover the latest blog posts  on Gen Z blogger. Stay informed with our recent articles covering a wide range of topics, from technology to lifestyle.",
    alternates: {
        canonical: "/blogs"
    },
    openGraph: {
        title: 'Recent Blogs',
        description: "Discover the latest blog posts  on Gen Z blogger. Stay informed with our recent articles covering a wide range of topics, from technology to lifestyle.",
        images: [`/api/screenshot?url=${createOpenGraphImg()}/blogs`],
        url: "/blogs"
    },
}
const page = async ({ params: { page } }: Props) => {
    if (!Number(page)) return notFound()
    const post = await postService.getPosts({ page: Number(page) })
    return (
        <div className='lg:px-24'>
            <div className='space-y-4 py-6 border-b border-b-[#c2d4ee] dark:border-b-on_dark_border'>
                <h1 className='text-center mt-6'>
                    <GradientText size={"xl"} className='font-extrabold' >
                        Blogs
                    </GradientText>
                </h1>
                <div className='flex justify-center'>
                    <Breadcrumb hiddenRoute={["page", `${page}`]} />
                </div>
            </div>
            <Suspense fallback={(
                <div className='pt-12 pb-6  divide-y divide-on_light_border_2 dark:divide-on_dark_border'>
                    {
                        Array(10).fill(1).map((_, index) => <BlogRowSkeleton key={`row-${index}`} />)
                    }
                </div>
            )}>
                <BlogList pathname='/blogs' data={post} currentPage={Number(page)} />
            </Suspense>
        </div>
    )
}

export default page