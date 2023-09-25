
import BlogList from '@/components/BlogList/BlogList'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import Wrapper from '@/components/Common/Wrapper/Wrapper'
import BlogRowSkeleton from '@/components/Skeleton/BlogRowSkeleton'
import tagService from '@/services/tag.service'
import { createOpenGraphImg } from '@/utils'
import { notFound } from 'next/navigation'
import React, { Suspense } from 'react'

type Props = {
    params: {
        slug: string
    },
    searchParams: {
        page: number
    }
}

export async function generateMetadata({ params }: Props) {

    const tagInfo = await tagService.getTagBySlug(params.slug)
    const title = `${tagInfo.name} Tag - Explore ${tagInfo.name} Blog Posts - Gen Z Blogger`
    const desc = `Discover a curated list of blog posts related to the ${tagInfo.name} tag. Find and engage with content related to your interests using our hashtag collection.`

    return {
        title: title,
        description: desc,
        alternates: {
            canonical: "/tags/" + params.slug
        },
        openGraph: {
            title: title,
            description: desc,
            images: [`/api/screenshot?url=${createOpenGraphImg()}/tags/${params.slug}`]
        },

    }
}

const TagSlug = async ({ params: { slug }, searchParams: { page = 1 } }: Props) => {
    const tagInfo = await tagService.getTagBySlug(slug)
    if (!tagInfo) return notFound()
    const res = tagService.getPostsBySlug(slug, { page })
    return (
        <section className='mb-24'>
            <Wrapper>
                <div className='lg:px-24 space-y-4 '>
                    <h1 className='leading-[1.3] inline-block text-center mt-6 text-[30px] sm:text-[36px] md:text-[48px] lg:text-[64px] bg-primary-gradient text-transparent 
                                bg-200% bg-clip-text font-extrabold'>
                        {tagInfo.name}
                    </h1>
                    <div className=' pb-6  border-b border-b-[#c2d4ee] dark:border-b-on_dark_border'>
                        <Breadcrumb replaceLastText={tagInfo.name} />
                    </div>
                    <Suspense fallback={
                        <div className='pt-12 pb-6  divide-y divide-on_light_border_2 dark:divide-on_dark_border'>
                            {
                                Array(10).fill(1).map((_, index) => <BlogRowSkeleton key={`row-${index}`} />)
                            }
                        </div>
                    }>
                        <BlogList data={res} currentPage={page} />
                    </Suspense>
                </div>
            </Wrapper>
        </section>
    )
}

export default TagSlug