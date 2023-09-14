

import React from 'react'
import author from "@/assets/profile.jpg"
import Image from 'next/image'
import Link from 'next/link'
import { HiOutlineClock } from 'react-icons/hi2'
import { Auth, Post } from '@/types/type'
import { formatDate } from '@/utils'
import { slugify } from '@/utils/slugify'
import { FiArrowRight } from 'react-icons/fi'
interface Props {
    post: Post
}

const BlogRow = ({ post }: Props) => {
    return (
        <div className='flex flex-col md:flex-row py-6 gap-y-6 gap-x-6 border-b border-b-[#c2d4ee] dark:border-on_dark_border'>
            <div className='md:min-w-[170px]'>
                <div className='flex items-center gap-4'>
                    <Image className='rounded-full w-12 h-12' src={(post.author as Auth).avatar_url} width={50} height={50} alt='author' />
                    <div className='dark:text-[#66768f] text-on_light_text_gray'>
                        <div className='font-bold'>{(post.author as Auth).name}</div>
                        <div className='text-sm'>{formatDate(post.createdAt || "", "D MMMM YYYY")}</div>
                    </div>
                </div>

            </div>
            <div className='flex-1 space-y-3'>
                <Link href={`/blogs/${slugify(post.title)}-${post._id}`} className='md:text-xl lg:text-2xl font-bold text-on_light_text_white dark:text-on_dark_text_white transition-colors dark:hover:text-blue hover:text-on_link_active'>
                    <h3> {post.title}</h3>
                </Link>
                <p className='text-sm text-[#708ab0] dark:text-on_dark_text_gray'>
                    {post.description}
                </p>
                <div className='space-x-2'>
                    {
                        post.hashtags.map(tag => (
                            <Link href={`/tags/${tag.slug}`} key={tag._id} className='text-on_light_text_gray text-sm dark:text-[#66768f] dark:hover:text-blue hover:text-blue transition-colors'>
                                # {tag.name}
                            </Link>
                        ))
                    }

                </div>
                <div className='flex items-center justify-between'>
                    <div className='text-on_light_text_gray text-sm dark:text-[#66768f] flex items-center justify-end'>
                        <HiOutlineClock className="mr-2 text-xl" />
                        3 mins read
                    </div>

                    <div>
                        <Link href={`/blogs/${slugify(post.title)}-${post._id}`}
                            className="inline-block">
                            <FiArrowRight className="inline-block mr-1 text-blue" />
                            <span className='text-sm font-semibold text-[#4e658a] dark:text-on_dark_text_gray hover:text-blue dark:hover:text-blue transition-colors'>Read more</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogRow