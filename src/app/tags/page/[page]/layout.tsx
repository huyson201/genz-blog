
import GradientText from '@/components/GradientText/GradientText'
import React from 'react'

type Props = {
    children: React.ReactNode[]
}

function layout({ children }: Props) {
    return (
        <div className='lg:px-24 space-y-4 '>
            <h1 className=' text-center '>
                <GradientText size={"xl"} className='font-extrabold' >
                    Tags
                </GradientText>
            </h1>
            {children}
        </div>
    )
}

export default layout