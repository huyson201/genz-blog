import Wrapper from '@/components/Common/Wrapper/Wrapper'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const layout = ({ children }: Props) => {
    return (
        <section className='mb-24'>
            <Wrapper>
                {children}
            </Wrapper>
        </section>
    )
}

export default layout