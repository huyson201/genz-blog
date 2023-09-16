
import BlogList from '@/components/BlogList/BlogList'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import Wrapper from '@/components/Common/Wrapper/Wrapper'
import tagService from '@/services/tag.service'
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

const TagSlug = async ({ params: { slug }, searchParams: { page = 1 } }: Props) => {
    const res = tagService.getPostsBySlug(slug, { page })
    if (!res) return notFound()

    return (
        <section className='mb-24'>
            <Wrapper>
                <div className='lg:px-24 space-y-4 '>
                    <h1 className='leading-[1.3] inline-block text-center mt-6 text-[30px] sm:text-[36px] md:text-[48px] lg:text-[64px] bg-primary-gradient text-transparent 
                                bg-200% bg-clip-text font-extrabold'>
                        Tags
                    </h1>
                    <div className=' pb-6  border-b border-b-[#c2d4ee] dark:border-b-on_dark_border'>
                        <Breadcrumb />
                    </div>
                    <Suspense fallback={<div>loading...</div>}>
                        <BlogList data={res} currentPage={page} />
                    </Suspense>
                </div>
            </Wrapper>
        </section>
    )
}

export default TagSlug