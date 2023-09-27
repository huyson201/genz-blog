

import { HashTag } from '@/types/type'
import Link from 'next/link'
import React from 'react'

interface Props {
    tags: HashTag[]
}

const TagList = ({ tags }: Props) => {
    return (
        <div className='flex items-center gap-4 mb-4 flex-wrap'>
            {
                tags.map(tag => (
                    <Link href={`/tags/${tag.slug}`} key={tag._id}
                        className='inline-block py-0.5 xs:py-1 px-2 text-sm dark:bg-on_dark_card_bg bg-on_light_card_bg
                         text-[#0b1222] dark:text-white dark:hover:text-blue hover:text-blue
                        border border-on_light_border_2 dark:border-on_dark_border  rounded hover:-translate-y-0.5 transition-all'>
                        #{tag.name}
                    </Link>
                ))
            }

        </div>
    )
}

export default TagList