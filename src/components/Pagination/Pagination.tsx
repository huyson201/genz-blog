"use client"
import usePagination from '@/hooks/usePagination'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { BsArrowRightShort, BsArrowLeftShort } from 'react-icons/bs'
import { twMerge } from 'tailwind-merge'
interface Props {
    className?: string,
    totalPage: number,
    currentPage: number,
    pathname?: string
}

const Pagination = ({ className, totalPage, currentPage, pathname }: Props) => {
    const data = usePagination(totalPage, currentPage)
    const currentPathname = usePathname()

    return (
        <div className={twMerge(className)} >
            <ul className="flex gap-x-1.5 text-sm flex-wrap gap-y-1.5 justify-center items-center sm:justify-start">
                {
                    data && data.prevPage !== null && (
                        <li className='order-[10] sm:order-first'>
                            <Link href={pathname ? `${pathname}/page/${data.prevPage}` : `${currentPathname}?page=${data.prevPage}`} className="flex items-center justify-center rounded-full w-10 h-10 ml-0 leading-tight 
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
                                <Link href={pathname ? `${pathname}/page/${page}` : `${currentPathname}?page=${page}`}
                                    className={twMerge(`flex items-center justify-center rounded-full w-10 h-10 leading-tight 
                                    dark:bg-on_dark_bg_2 bg-[#7f92b0] font-bold text-base text-white  hover:bg-blue dark:hover:bg-blue transition-all
                                    hover:scale-105 duration-500 [&.active]:bg-blue `, Number(currentPage) === Number(page) && 'active')}>
                                    {page}
                                </Link>
                            </li>
                        )
                    })
                }

                {
                    data && data.nextPage !== null && (
                        <li className='order-[11]'>
                            <Link href={pathname ? `${pathname}/page/${data.nextPage}` : `${currentPathname}?page=${data.nextPage}`} className="flex items-center justify-center rounded-full w-10 h-10 leading-tight 
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