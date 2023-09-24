"use client"
import usePagination from '@/hooks/usePagination'
import Link from 'next/link'
import React from 'react'
import { BsArrowRightShort, BsArrowLeftShort } from 'react-icons/bs'
import { twMerge } from 'tailwind-merge'
interface Props {
    className?: string,
    totalPage: number,
    currentPage: number
}

const Pagination = ({ className, totalPage, currentPage }: Props) => {
    const data = usePagination(totalPage, currentPage)
    console.log(data)
    return (
        <div className={twMerge(className)} >
            <ul className="flex gap-x-1 text-sm flex-wrap gap-y-1 justify-center items-center sm:justify-start">
                {
                    data && data.prevPage !== null && (
                        <li className='order-[10] sm:order-first'>
                            <Link href={{ query: { page: data.prevPage } }} className="flex items-center justify-center rounded-full w-10 h-10 ml-0 leading-tight 
                                            dark:bg-on_dark_bg_2 bg-[#7f92b0] font-bold text-base text-white  hover:bg-blue dark:hover:bg-blue transition-all
                                            hover:scale-105 duration-500 ">
                                <BsArrowLeftShort className={"text-xl"} />
                            </Link>
                        </li>
                    )
                }

                {
                    data && data.pages.map((page, index) => {
                        if (typeof page === "string") {
                            console.log("string", index)
                            return (
                                <li key={`dot-${index}`}>
                                    <span className="flex items-center justify-center rounded-full w-10 h-10 leading-tight 
                                            dark:bg-on_dark_bg_2 bg-[#7f92b0] font-bold text-base text-white  transition-all
                                            hover:scale-105 duration-500 ">{page}</span>
                                </li>
                            )
                        }

                        return (
                            <li key={`page-${page}`}>
                                <Link href={{ query: { page } }}
                                    className={twMerge(`flex items-center justify-center rounded-full w-10 h-10 leading-tight 
                                    dark:bg-on_dark_bg_2 bg-[#7f92b0] font-bold text-base text-white  hover:bg-blue dark:hover:bg-blue transition-all
                                    hover:scale-105 duration-500 [&.active]:bg-blue `, currentPage === page && 'active')}>
                                    {page}
                                </Link>
                            </li>
                        )
                    })
                }

                {
                    data && data.nextPage !== null && (
                        <li className='order-[11]'>
                            <Link href={{ query: { page: data.nextPage } }} className="flex items-center justify-center rounded-full w-10 h-10 leading-tight 
                                                dark:bg-on_dark_bg_2 bg-[#7f92b0] font-bold text-base text-white  hover:bg-blue dark:hover:bg-blue transition-all
                                                hover:scale-105 duration-500">
                                <BsArrowRightShort className="text-xl" />
                            </Link>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}

export default Pagination