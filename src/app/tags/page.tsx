
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import Wrapper from '@/components/Common/Wrapper/Wrapper'
import GradientText from '@/components/GradientText/GradientText'
import Pagination from '@/components/Pagination/Pagination'
import tagService from '@/services/tag.service'
import { HashTag, PaginateResponse } from '@/types/type'
import Link from 'next/link'
import React, { Suspense } from 'react'
import { BiSolidTagAlt } from 'react-icons/bi'

type Props = {
    searchParams: {
        page?: number
    }
}

const TagsPage = async ({ searchParams: { page = 1 } }: Props) => {
    const data = tagService.getTags({ page })
    return (
        <section className='mb-24'>
            <Wrapper>
                <div className='lg:px-24 space-y-4 '>
                    <h1 className=' text-center '>
                        <GradientText size={"xl"} className='font-extrabold' >
                            Tags
                        </GradientText>
                    </h1>
                    <Suspense fallback={<div>Loading...</div>}>
                        <TagGrid dataPromise={data} />
                    </Suspense>
                </div>
            </Wrapper>
        </section>
    )
}

export default TagsPage
interface TagGridProps {
    dataPromise: Promise<PaginateResponse<HashTag>>
}
const TagGrid = async ({ dataPromise }: TagGridProps) => {
    const data = await dataPromise

    return (
        <>
            <div className='text-center text-on_dark_text_gray text-sm sm:text-base my-4'>
                We found &#34;{data.totalDocs}&#34; Tags
            </div>
            <div className='flex justify-center pb-6  border-b border-b-[#c2d4ee] dark:border-b-on_dark_border'>
                <Breadcrumb />
            </div>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-left gap-y-8 pt-12'>
                {
                    data.docs.map(tag => (
                        <Link href={`tags/${tag.slug}`} key={tag._id} className='flex items-center text-on_light_text_gray dark:text-on_dark_text_gray dark:hover:text-blue transition-colors'>
                            <BiSolidTagAlt className='inline-block mr-2' />
                            <span className='font-bold'>{tag.name}</span>
                        </Link>
                    ))
                }
            </div>
            {data.totalPages > 1 && <Pagination className='pt-6' currentPage={data.page} totalPage={data.totalPages} />}
        </>
    )
}