
import React from 'react'
import { BsArrowRightShort, BsArrowLeftShort } from 'react-icons/bs'
import { twMerge } from 'tailwind-merge'
interface Props {
    className?: string
}

const Pagination = ({ className }: Props) => {
    return (
        <div className={twMerge(className)} >
            <ul className="inline-flex space-x-1 text-sm">
                <li>
                    <a href="#" className="flex items-center justify-center rounded-full w-10 h-10 ml-0 leading-tight 
                                            dark:bg-on_dark_bg_2 bg-[#7f92b0] font-bold text-base text-white  hover:bg-blue dark:hover:bg-blue transition-all
                                            hover:scale-105 duration-500 ">
                        <BsArrowLeftShort className={"text-xl"} />
                    </a>
                </li>
                <li>
                    <a href="#" className="flex items-center justify-center rounded-full w-10 h-10 leading-tight 
                                            dark:bg-on_dark_bg_2 bg-[#7f92b0] font-bold text-base text-white  hover:bg-blue dark:hover:bg-blue transition-all
                                            hover:scale-105 duration-500 ">1</a>
                </li>
                <li>
                    <a href="#" className="flex items-center justify-center rounded-full w-10 h-10 leading-tight 
                                            dark:bg-on_dark_bg_2 bg-[#7f92b0] font-bold text-base text-white  hover:bg-blue dark:hover:bg-blue transition-all
                                            hover:scale-105 duration-500 ">2</a>
                </li>
                <li>
                    <a href="#" className="flex items-center justify-center rounded-full w-10 h-10 leading-tight 
                                            dark:bg-on_dark_bg_2 bg-[#7f92b0] font-bold text-base text-white  hover:bg-blue dark:hover:bg-blue transition-all
                                            hover:scale-105 duration-500">3</a>
                </li>
                <li>
                    <a href="#" className="flex items-center justify-center rounded-full w-10 h-10 leading-tight 
                                            dark:bg-on_dark_bg_2 bg-[#7f92b0] font-bold text-base text-white  hover:bg-blue dark:hover:bg-blue transition-all
                                            hover:scale-105 duration-500 ">...</a>
                </li>

                <li>
                    <a href="#" className="flex items-center justify-center rounded-full w-10 h-10 leading-tight 
                                            dark:bg-on_dark_bg_2 bg-[#7f92b0] font-bold text-base text-white  hover:bg-blue dark:hover:bg-blue transition-all
                                            hover:scale-105 duration-500">
                        <BsArrowRightShort className="text-xl" />
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default Pagination