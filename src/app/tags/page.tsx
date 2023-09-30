
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import GradientText from '@/components/GradientText/GradientText'
import Pagination from '@/components/Pagination/Pagination'
import tagService from '@/services/tag.service'
import { createOpenGraphImg } from '@/utils'
import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
import { BiSolidTagAlt } from 'react-icons/bi'

type Props = {

}
const metaTitle = 'Hashtags - Explore a Variety of Topics'
const metaDesc = "Discover a diverse collection of hashtags covering a wide range of topics. Explore and engage with discussions on your favorite subjects using our hashtag directory."
export const metadata: Metadata = {
    title: metaTitle,
    description: metaDesc,
    alternates: {
        canonical: "/tags"
    },
    openGraph: {
        title: metaTitle,
        description: metaDesc,
        images: [`/api/screenshot?url=${createOpenGraphImg()}/tags`],
        url: "/tags",
    },
}
const page = async (props: Props) => {
    const tags = await tagService.getTags({ page: 1 })
    const isShowPagination = tags.totalPages > 1

    const tagElements = tags.docs.map(tag => (
        <Link href={`/tags/${tag.slug}`} key={tag._id} className='flex items-center text-on_light_text_gray dark:text-on_dark_text_gray dark:hover:text-blue transition-colors'>
            <BiSolidTagAlt className='inline-block mr-2' />
            <span className='font-bold'>{tag.name}</span>
        </Link>
    ))

    return (
        <div className='lg:px-24 space-y-4'>
            <h1 className='text-center '>
                <GradientText size={"xl"} className='font-extrabold' >
                    Tags
                </GradientText>
            </h1>
            <div className='text-center text-on_dark_text_gray text-sm sm:text-base my-4'>
                We found &#34;{tags.totalDocs}&#34; Tags
            </div>
            <div className='flex justify-center pb-6  border-b border-b-[#c2d4ee] dark:border-b-on_dark_border'>
                <Breadcrumb hiddenRoute={["page", `${page}`]} />
            </div>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-left gap-y-8 pt-12'>
                {tagElements}
            </div>
            {isShowPagination && <Pagination pathname='/tags' className='pt-6' currentPage={tags.page} totalPage={tags.totalPages} />}
        </div>
    )
}

export default page