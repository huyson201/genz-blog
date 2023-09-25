import Wrapper from '@/components/Common/Wrapper/Wrapper'
import React from 'react'
import VerifyCard from './VerifyCard'

type Props = {}

const page = (props: Props) => {
    return (
        <Wrapper>
            <div className='pb-24 py-14 flex items-center justify-center dark:text-on_text_gray_2'>
                <VerifyCard />
            </div>
        </Wrapper>
    )
}


export default page