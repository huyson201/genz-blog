
import { Auth, Post } from '@/types/type'
import { formatDate } from '@/utils'
import { slugify } from '@/utils/slugify'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FiArrowRight } from 'react-icons/fi'
interface Props {
    post: Post
}

const BlogSection = ({ post }: Props) => {
    return (
        <article className=" flex flex-col lg:w-[calc(50%_-_12px)] p-4 bg-on_light_card_bg rounded-lg border
                             dark:border-on_dark_border shadow-md dark:bg-on_dark_card_bg border-on_light_border
                             transition-all hover:-translate-y-1 gap-y-2">

            <div className="flex items-center space-x-1.5 ">
                <Image className="w-7 h-7 rounded-full" width={28} height={28} src={(post.author as Auth).avatar_url} alt={`${(post.author as Auth).name}_avatar`} />
                <span className="text-sm flex items-center dark:text-on_dark_text_gray text-[#4e658a] transition-colors">
                    {formatDate(post.createdAt || "", "MMMM D, YYYY")}
                </span>
            </div>
            <h3 >
                <Link href={`/blogs/${slugify(post.title)}-${post._id}`} className='hover:text-blue dark:hover:text-blue mb-4 text-xl font-bold 
                             tracking-tight text-on_light_text_white dark:text-[#e6f0ff] transition-colors line-clamp-2'>
                    {post.title}
                </Link>
            </h3>
            <p className=" text-[#4e658a]  dark:text-on_dark_text_gray transition-colors line-clamp-3">
                {post.description}
            </p>
            <div className='space-y-2 mt-auto'>
                {
                    post.hashtags.map(tag => (<Link
                        key={tag._id}
                        href={`/tag/${tag.slug}`}
                        className="transition-colors mr-2 dark:bg-on_dark_bg_2 text-xs font-medium 
                                    inline-flex items-center px-2.5 py-1 rounded-lg dark:text-on_dark_text_gray
                                     text-on_light_text_gray hover:text-blue dark:hover:text-blue bg-white/60">
                        {tag.name}
                    </Link>))
                }
            </div>
            <Link href={`/blogs/${slugify(post.title)}-${post._id}`}
                className="inline-block">
                <FiArrowRight className="inline-block mr-1 text-blue" />
                <span className='text-sm font-semibold text-[#4e658a] dark:text-on_dark_text_gray hover:text-blue dark:hover:text-blue transition-colors'>Read more</span>
            </Link>
        </article>
    )
}

export default BlogSection