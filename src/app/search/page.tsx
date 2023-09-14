
import BlogRow from '@/components/BlogList/BlogRow/BlogRow'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import Wrapper from '@/components/Common/Wrapper/Wrapper'
import Pagination from '@/components/Pagination/Pagination'
import React from 'react'

type Props = {}

const SearchPage = (props: Props) => {
    return (
        <section>
            <Wrapper>
                <div className='lg:px-24'>
                    <div className='text-center space-y-4 py-6 border-b border-b-[#c2d4ee] dark:border-b-on_dark_border'>
                        <h1 className='inline-block text-center mt-12 text-6xl bg-primary-gradient text-transparent 
                                    bg-200% bg-clip-text font-extrabold'>
                            Search results
                        </h1>
                        <div className='text-on_dark_text_gray text-sm sm:text-base'>
                            Results for &quot;Hello&quot; key word
                        </div>
                        <div className='flex justify-center'>
                            <Breadcrumb />
                        </div>
                    </div>
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

export default SearchPage