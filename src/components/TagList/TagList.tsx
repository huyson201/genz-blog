

import Link from 'next/link'
import React from 'react'

type Props = {}

const TagList = (props: Props) => {
    return (
        <div className='flex items-center gap-4 mb-4'>
            <Link href={"#"}
                className='inline-block py-1 px-2 text-sm dark:bg-on_dark_card_bg bg-on_light_card_bg
                     text-[#0b1222] dark:text-white dark:hover:text-blue hover:text-blue
                    border border-[#c2d4ee] dark:border-on_dark_border  rounded hover:-translate-y-0.5 transition-all'>
                #Nature
            </Link>
            <Link href={"#"}
                className='inline-block py-1 px-2 text-sm dark:bg-on_dark_card_bg bg-on_light_card_bg
                     text-[#0b1222] dark:text-white dark:hover:text-blue hover:text-blue
                    border border-[#c2d4ee] dark:border-on_dark_border  rounded hover:-translate-y-0.5 transition-all'>
                #Beauty
            </Link>
            <Link href={"#"}
                className='inline-block py-1 px-2 text-sm dark:bg-on_dark_card_bg bg-on_light_card_bg
                     text-[#0b1222] dark:text-white dark:hover:text-blue hover:text-blue
                    border border-[#c2d4ee] dark:border-on_dark_border  rounded hover:-translate-y-0.5 transition-all'>
                #Travel Tip
            </Link>
            <Link href={"#"}
                className='inline-block py-1 px-2 text-sm dark:bg-on_dark_card_bg bg-on_light_card_bg
                     text-[#0b1222] dark:text-white dark:hover:text-blue hover:text-blue
                    border border-[#c2d4ee] dark:border-on_dark_border  rounded hover:-translate-y-0.5 transition-all'>
                #House
            </Link>
        </div>
    )
}

export default TagList