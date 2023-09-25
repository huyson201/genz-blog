

import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import Wrapper from '@/components/Common/Wrapper/Wrapper'
import React from 'react'
import author from '@/assets/profile.jpg'
import Image from 'next/image'
import Link from 'next/link'
import { FaFacebookF, FaPinterest, FaTwitter } from 'react-icons/fa6'
import TagList from '@/components/TagList/TagList'
import { notFound } from 'next/navigation'
import { Auth } from '@/types/type'
import postService from '@/services/post.service'
import { calcBlogReadingTime, createOpenGraphImg, formatDate } from '@/utils'
import MarkdownArea from '@/components/MarkdownArea/MarkdownArea'
import CommentSection from '@/components/Comment/CommentSection'
interface Props {
    params: {
        id: string
    }
}

export async function generateMetadata({ params }: Props) {
    const arrayString = params.id.split("-")
    const postId = arrayString[arrayString.length - 1]
    const post = await postService.getPostById(postId)
    const title = `${post.title} - Gen Z Blogger`
    return {
        title: title,
        description: post.description,
        alternates: {
            canonical: "/blogs/" + params.id
        },
        authors: {
            name: (post.author as Auth).name,
        },
        openGraph: {
            title: title,
            description: post.description,
            images: [`/api/screenshot?url=${createOpenGraphImg()}/blogs/${params.id}`],
            url: "/blogs/" + params.id
        },

    }
}

const BlogDetail = async ({ params }: Props) => {
    const arrayString = params.id.split("-")
    const postId = arrayString[arrayString.length - 1]
    const post = await postService.getPostById(postId)
    if (!post) return notFound();
    return (
        <section className='mb-24'>
            <Wrapper>
                <div className='xl:px-16 pt-12'>
                    <div className='pb-6 border-b dark:border-b-on_dark_border border-b-[#c2d4ee]'>
                        <Breadcrumb replaceLastText={post.title} />
                    </div>
                    <div className='pt-12'>
                        <div>
                            <h1 className='gradient-text text-[20px] xs:text-[25px] sm:text-[35px] md:text-[45px] font-bold'>
                                {post.title}
                            </h1>
                            <div className='flex items-center gap-4 mt-4'>
                                <Image className='w-12 h-12 rounded-full' src={(post.author as Auth).avatar_url} height={48} width={48} alt='author' />
                                <div>

                                    <div className='font-bold text-on_light_text_gray dark:text-on_text_gray_2'>{(post.author as Auth).name}</div>
                                    <div>
                                        <span className='text-sm text-on_light_text_gray mr-6 dark:text-on_text_gray_2'>{formatDate(post.createdAt || "", "D MMMM YYYY")}</span>
                                        <span className='text-sm text-on_light_text_gray dark:text-on_text_gray_2'>{calcBlogReadingTime(post.content, 200)} mins to read</span>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-6 lg:hidden'>
                                <h2 className='section-title text-xl'>
                                    Tags
                                </h2>
                                <TagList tags={post.hashtags} />
                            </div>
                            <div className='flex mt-12 flex-col lg:flex-row '>
                                <div className='lg:w-3/4 lg:px-3  '>
                                    <div className='pb-12 blog-content border-b border-b-[#c2d4ee] dark:border-b-on_dark_border'>
                                        <MarkdownArea>
                                            {post.content}
                                        </MarkdownArea>
                                    </div>
                                    <CommentSection postId={postId} />
                                </div>
                                <div className='lg:w-1/4 lg:px-3 mt-12 lg:mt-0'>
                                    <div className='pl-10 border-l border-l-[#c2d4ee] dark:border-l-on_dark_border flex py-8 items-center gap-3'>
                                        <span className='dark:text-on_dark_text_gray font-bold text-[#708ab0]'>Share</span>
                                        <Link href={"#"} className='text-[rgba(152,162,179)] transition-colors dark:hover:text-blue hover:text-blue'>
                                            <FaFacebookF />
                                        </Link>
                                        <Link href={"#"} className='text-[rgba(152,162,179)] transition-colors dark:hover:text-blue hover:text-blue'>
                                            <FaTwitter />
                                        </Link>
                                        <Link href={"#"} className='text-[rgba(152,162,179)] transition-colors dark:hover:text-blue hover:text-blue'>
                                            <FaPinterest />
                                        </Link>
                                    </div>
                                    <div className='mt-6 hidden lg:block'>
                                        <h2 className='section-title text-xl'>
                                            Tags
                                        </h2>
                                        <TagList tags={post.hashtags} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </Wrapper>
        </section>
    )
}

export default BlogDetail