

import React from 'react'
import author from "@/assets/profile.jpg"
import Image from 'next/image'
import Link from 'next/link'
import { HiOutlineClock } from 'react-icons/hi2'
type Props = {}

const BlogRow = (props: Props) => {
    return (
        <div className='flex flex-col md:flex-row py-6 gap-y-6 gap-x-6 border-b border-b-[#c2d4ee] dark:border-on_dark_border'>
            <div className='md:min-w-[170px]'>
                <div className='flex items-center gap-4'>
                    <Image className='rounded-full w-12 h-12' src={author} width={50} height={50} alt='author' />
                    <div className='dark:text-[#66768f] text-on_light_text_gray'>
                        <div className='font-bold'>Joseph</div>
                        <div className='text-sm'>25 April 2023</div>
                    </div>
                </div>

            </div>
            <div className='flex-1 space-y-3'>
                <Link href={"#"} className='md:text-xl lg:text-2xl font-bold text-on_light_text_white dark:text-on_dark_text_white transition-colors dark:hover:text-blue hover:text-on_link_active'>
                    <h3> What Are NFTs? Non-Fungible Tokens & Crypto Art Explained</h3>
                </Link>
                <p className='text-sm text-[#708ab0] dark:text-on_dark_text_gray'>
                    Gosh jaguar ostrich quail one excited dear hello and bound and the and bland moral misheard roadrunner flapped lynx far that and jeepers giggled far and far
                </p>
                <div className='space-x-2'>
                    <Link href={"#"} className='text-on_light_text_gray text-sm dark:text-[#66768f] dark:hover:text-blue hover:text-blue transition-colors'>
                        # Travel
                    </Link>
                    <Link href={"#"} className='text-on_light_text_gray text-sm dark:text-[#66768f] dark:hover:text-blue hover:text-blue transition-colors'>
                        # Nodejs
                    </Link>
                    <Link href={"#"} className='text-on_light_text_gray text-sm dark:text-[#66768f] dark:hover:text-blue hover:text-blue transition-colors'>
                        # Nestjs
                    </Link>
                </div>
                <div className='text-on_light_text_gray text-sm dark:text-[#66768f] flex items-center justify-end'>
                    <HiOutlineClock className="mr-2 text-xl" />
                    3 mins read
                </div>
            </div>
        </div>
    )
}

export default BlogRow