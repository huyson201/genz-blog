

import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import React from 'react'
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
import TableOfContent from '@/components/TableOfContent/TableOfContent'
import GradientText from '@/components/GradientText/GradientText'
interface Props {
    params: {
        id: string
    }
}

export async function generateMetadata({ params }: Props) {
    const arrayString = params.id.split("-")
    const postId = arrayString[arrayString.length - 1]
    const { data: post, error } = await postService.getPostById(postId)
    if (!post) {
        return {
            title: "Not found",
            description: "The page you are looking for dose not exist",
        }
    }
    const title = `${post.title}`
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
    const [{ data: post, error }, increaseView] = await Promise.all([postService.getPostById(postId), postService.increaseView(postId)])
    if (!post) return notFound();
    return (
        <div className='xl:px-16 pt-12'>
            <div className='pb-6 border-b dark:border-b-on_dark_border border-b-[#c2d4ee]'>
                <Breadcrumb replaceLastText={post.title} />
            </div>
            <div className=' pt-6 md:pt-12'>
                <div>
                    <h1 className='gradient-text text-[25px] sm:text-[35px] md:text-[45px] font-bold'>
                        {post.title}
                    </h1>
                    <div className='flex  flex-col lg:flex-row '>
                        <div className='lg:w-3/4 lg:px-3  '>
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
                            <div className='mt-6'>
                                <TableOfContent />
                            </div>
                            <div className='mt-4 xs:mt-6 lg:hidden'>
                                <GradientText size={"default"}
                                    className='text-xl font-bold relative after:absolute after:w-full  after:h-0.5 after:bg-primary-gradient
                            pb-2 after:bottom-0 after:left-0 mb-4'>Tags</GradientText>

                                <TagList tags={post.hashtags} />
                            </div>
                            <div className='pb-12 mt-8 blog-content border-b border-b-[#c2d4ee] dark:border-b-on_dark_border'>
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
                                <div className='section-title text-xl'>
                                    Tags
                                </div>
                                <TagList tags={post.hashtags} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default BlogDetail