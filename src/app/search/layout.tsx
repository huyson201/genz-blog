import React from 'react'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import Wrapper from '@/components/Common/Wrapper/Wrapper'
type Props = {
    children: React.ReactNode,
    searchParams: {
        q: string
    }
}

const SearchLayout = (props: Props) => {
    return (
        <section className='mb-24'>
            <Wrapper>
                <div className='lg:px-24 space-y-4 text-center'>
                    <h1 className='inline-block text-center mt-12 text-6xl bg-primary-gradient text-transparent 
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