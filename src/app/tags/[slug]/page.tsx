
import BlogList from '@/components/BlogList/BlogList'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import tagService from '@/services/tag.service'
import { createOpenGraphImg } from '@/utils'
import { notFound } from 'next/navigation'
import React from 'react'

type Props = {
    params: {
        slug: string
    },
    searchParams: {
        page: number
    }
}

export async function generateMetadata({ params }: Props) {

    const { data: tagInfo, error } = await tagService.getTagBySlug(params.slug)
    if (!tagInfo) {
        return {
            title: "Not found",
            description: "The page you are looking for dose not exist",
        }
    }
    const title = `${tagInfo.name} Tag - Explore ${tagInfo.name} Blog Posts`
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
            images: [`/api/screenshot?url=${createOpenGraphImg()}/tags/${params.slug}`],
            url: "/tags/" + params.slug
        },

    }
}

const TagSlug = async ({ params: { slug }, searchParams: { page = 1 } }: Props) => {
    const tagInfoPromise = tagService.getTagBySlug(slug)
    const resPromise = tagService.getPostsBySlug(slug, { page })
    const [{ data: tagInfo, error }, { data: posts, error: postsError }] = await Promise.all([tagInfoPromise, resPromise])
    if (!tagInfo || !posts) return notFound()

    return (
        <div className='lg:px-24 space-y-4 '>
            <h1 className='leading-[1.3] inline-block text-center mt-6 text-[30px] sm:text-[36px] md:text-[48px] lg:text-[64px] bg-primary-gradient text-transparent 
                                bg-200% bg-clip-text font-extrabold'>
                {tagInfo.name}
            </h1>
            <div className=' pb-6  border-b border-b-[#c2d4ee] dark:border-b-on_dark_border'>
                <Breadcrumb replaceLastText={tagInfo.name} />
            </div>
            <BlogList data={posts} currentPage={page} key={page} />
        </div>

    )
}

export default TagSlug