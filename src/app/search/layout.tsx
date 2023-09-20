import React from 'react'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import Wrapper from '@/components/Common/Wrapper/Wrapper'
type Props = {
    children: React.ReactNode
}

const SearchLayout = (props: Props) => {
    return (
        <section className='mb-24'>
            <Wrapper>
                <div className='lg:px-24 space-y-4 text-center'>
                    <h1 className='inline-block text-center mt-12 text-[30px] sm:text-[36px] md:text-[48px] lg:text-[64px] bg-primary-gradient text-transparent 
                                    bg-200% bg-clip-text font-extrabold'>
                        Search results
                    </h1>
                </div>
                {
                    props.children
                }
            </Wrapper>
        </section>
    )
}

export default SearchLayout