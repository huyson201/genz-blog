
import React from 'react'

type Props = {
    children: any
}

const BlockQuote = ({ children }: Props) => {
    return (
        <blockquote className='pt-4 px-[10px] pb-[0.1rem] dark:bg-on_dark_bg_2  bg-[#f9f9f9] border-l-[6px] border-l-[#ccc] overflow-x-auto'>
            {children}
        </blockquote>
    )
}

export default BlockQuote