
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import Pagination from '@/components/Pagination/Pagination'
import tagService from '@/services/tag.service'
import { createOpenGraphImg } from '@/utils'
import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
import { BiSolidTagAlt } from 'react-icons/bi'

type Props = {

}
export const metadata: Metadata = {
    title: 'Hashtags - Explore a Variety of Topics - Gen Z Blogger',
    description: "Discover a diverse collection of hashtags covering a wide range of topics. Explore and engage with discussions on your favorite subjects using our hashtag directory.",
    alternates: {
        canonical: "/tags"
    },
    openGraph: {
        title: 'Hashtags - Explore a Variety of Topics - Gen Z Blogger',
        description: "Discover a diverse collection of hashtags covering a wide range of topics. Explore and engage with discussions on your favorite subjects using our hashtag directory."
        , images: [`/api/screenshot?url=${createOpenGraphImg()}/tags`],
        url: "/tags"
    },
}
const page = async (props: Props) => {
    const data = await tagService.getTags({ page: 1 })
    return (
        <>
            <div className='text-center text-on_dark_text_gray text-sm sm:text-base my-4'>
                We found &#34;{data.totalDocs}&#34; Tags
            </div>
            <div className='flex justify-center pb-6  border-b border-b-[#c2d4ee] dark:border-b-on_dark_border'>
                <Breadcrumb hiddenRoute={["page", `${page}`]} />
            </div>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-left gap-y-8 pt-12'>
                {
                    data.docs.map(tag => (
                        <Link href={`/tags/${tag.slug}`} key={tag._id} className='flex items-center text-on_light_text_gray dark:text-on_dark_text_gray dark:hover:text-blue transition-colors'>
                            <BiSolidTagAlt className='inline-block mr-2' />
                            <span className='font-bold'>{tag.name}</span>
                        </Link>
                    ))
                }
            </div>
            {data.totalPages > 1 && <Pagination pathname='/tags' className='pt-6' currentPage={data.page} totalPage={data.totalPages} />}
        </>
    )
}

export default page