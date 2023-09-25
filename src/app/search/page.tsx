import BlogList from '@/components/BlogList/BlogList'
import BlogRow from '@/components/BlogList/BlogRow/BlogRow'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import Pagination from '@/components/Pagination/Pagination'
import postService from '@/services/post.service'
import { createOpenGraphImg } from '@/utils'
import { notFound } from 'next/navigation'
import React from 'react'

type Props = {
    searchParams: {
        page: number,
        q?: string,
    }
}


export async function generateMetadata(props: Props) {
    const title = `Search Results for '${props.searchParams.q}' - Find What You're Looking For - Gen Z Blogger`
    const desc = `Explore search results related to '${props.searchParams.q}' and find exactly what you're looking for. Discover a wide range of content, articles, and resources related to '${props.searchParams.q}' in our search results.`

    return {
        title: title,
        description: desc,
        alternates: {
            canonical: "/search"
        },
        openGraph: {
            title: title,
            description: desc,
            images: [`/api/screenshot?url=${createOpenGraphImg()}/search?q=${props.searchParams.q}`]
        },

    }
}

const SearchPage = async ({ searchParams }: Props) => {
    if (!searchParams.q || searchParams.q === "") {
        notFound()
    }
    const { page = 1 } = searchParams
    const key = searchParams.q
    const data = await postService.search(key, { page })
    return (
        <>
            <div className='text-center text-on_dark_text_gray text-sm sm:text-base my-4'>
                We found {data.totalDocs} results for &quot;{key}&quot; key word
            </div>
            <div className='flex justify-center pb-6  border-b border-b-[#c2d4ee] dark:border-b-on_dark_border'>
                <Breadcrumb />
            </div>
            <BlogList data={data} currentPage={page} />
        </>
    )


}

export default SearchPage