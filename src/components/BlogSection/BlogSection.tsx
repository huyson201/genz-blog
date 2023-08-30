
import Link from 'next/link'
import React from 'react'
import { AiOutlineClockCircle } from 'react-icons/ai'
type Props = {}

const BlogSection = (props: Props) => {
    return (
        <article className=" flex flex-col lg:w-[calc(50%_-_12px)] p-6 bg-on_light_card_bg rounded-lg border
                             dark:border-on_dark_border shadow-md dark:bg-on_dark_card_bg border-on_light_border
                             transition-all hover:-translate-y-1">
            <div className="flex justify-between items-center mb-5">
                <div className='flex flex-wrap gap-4'>
                    <Link
                        href={"#"}
                        className="transition-colors bg-primary-100 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:text-on_text_gray_2 text-on_light_text_gray">
                        #
                    </Link>
                </div>
                <span className="text-sm flex items-center dark:text-on_text_gray_2 text-on_light_text_gray transition-colors">
                    <AiOutlineClockCircle className="mr-1" />
                    14 days ago
                </span>
            </div>
            <h3 >
                <Link href="#" className='hover:text-blue dark:hover:text-blue mb-4 text-xl font-bold 
                             tracking-tight text-on_light_text_white dark:text-[#e6f0ff] transition-colors'>
                    How to quickly deploy a static website
                </Link>
            </h3>
            <p className="mb-5 font-light text-[#4e658a] text-sm dark:text-on_dark_text_gray transition-colors">
                Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence....
            </p>
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <img className="w-7 h-7 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="Jese Leos avatar" />
                    <span className="font-medium text-[#4e658a] dark:text-white transition-colors">
                        Jese Leos
                    </span>
                </div>
                <Link href="#"
                    className="relative before:content-[''] before:absolute before:w-12 before:h-12 before:rounded-full
                     dark:before:bg-on_dark_body_bg before:top-2/4 before:left-0 before:-translate-x-2/4
                      before:-translate-y-2/4 before:bg-on_light_body_bg transition-colors">
                    <span className='relative z-[2] text-sm text-[#4e658a] dark:text-on_dark_text_gray hover:text-blue dark:hover:text-blue transition-colors'>Read more</span>
                </Link>
            </div>
        </article>
    )
}

export default BlogSection