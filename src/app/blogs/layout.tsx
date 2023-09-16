import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import Wrapper from '@/components/Common/Wrapper/Wrapper'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const BlogsLayout = ({ children }: Props) => {
    return (
        <section className='mb-24'>
            <Wrapper>
                <div className='lg:px-24'>
                    <div className='text-center space-y-4 py-6 border-b border-b-[#c2d4ee] dark:border-b-on_dark_border'>
                        <h1 className='inline-block text-center mt-6 text-[30px] sm:text-[36px] md:text-[48px] lg:text-[64px] bg-primary-gradient text-transparent 
                                bg-200% bg-clip-text font-extrabold '>
                            Blogs
                        </h1>
                        <div className='flex justify-center'>
                            <Breadcrumb />
                        </div>
                    </div>
                    {
                        children
                    }
                </div>
            </Wrapper>
        </section>
    )
}

export default BlogsLayout