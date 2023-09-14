"use client"
import usePagination from '@/hooks/usePagination'
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
    if (totalPage = 1) return null
    return (
        <div className={twMerge(className)} >
            <ul className="inline-flex space-x-1 text-sm">
                {
                    data && data.prev !== null && (
                        <li>
                            <a href="#" className="flex items-center justify-center rounded-full w-10 h-10 ml-0 leading-tight 
                                            dark:bg-on_dark_bg_2 bg-[#7f92b0] font-bold text-base text-white  hover:bg-blue dark:hover:bg-blue transition-all
                                            hover:scale-105 duration-500 ">
                                <BsArrowLeftShort className={"text-xl"} />
                            </a>
                        </li>
                    )
                }
                {
                    data && data.leftRange.map(page => (
                        <li key={`page-${page}`}>
                            <a href="#" className="flex items-center justify-center rounded-full w-10 h-10 leading-tight 
                                            dark:bg-on_dark_bg_2 bg-[#7f92b0] font-bold text-base text-white  hover:bg-blue dark:hover:bg-blue transition-all
                                            hover:scale-105 duration-500 ">{page}</a>
                        </li>
                    ))
                }

                {
                    data && data.showDot && (
                        <li>
                            <a href="#" className="flex items-center justify-center rounded-full w-10 h-10 leading-tight 
                                            dark:bg-on_dark_bg_2 bg-[#7f92b0] font-bold text-base text-white  hover:bg-blue dark:hover:bg-blue transition-all
                                            hover:scale-105 duration-500 ">...</a>
                        </li>
                    )
                }

                {
                    data && data.rightRange.map(page => (
                        <li key={`page-${page}`}>
                            <a href="#" className="flex items-center justify-center rounded-full w-10 h-10 leading-tight 
                                            dark:bg-on_dark_bg_2 bg-[#7f92b0] font-bold text-base text-white  hover:bg-blue dark:hover:bg-blue transition-all
                                            hover:scale-105 duration-500 ">{page}</a>
                        </li>
                    ))
                }


                {
                    data && data.prev !== null && (
                        <li>
                            <a href="#" className="flex items-center justify-center rounded-full w-10 h-10 leading-tight 
                                                dark:bg-on_dark_bg_2 bg-[#7f92b0] font-bold text-base text-white  hover:bg-blue dark:hover:bg-blue transition-all
                                                hover:scale-105 duration-500">
                                <BsArrowRightShort className="text-xl" />
                            </a>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}

export default Pagination