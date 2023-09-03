
import Link from 'next/link'
import React from 'react'
import { BiHomeAlt2 } from 'react-icons/bi'
import { FaAngleRight } from 'react-icons/fa6'

type Props = {}

const Breadcrumb = (props: Props) => {
    return (
        <div className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center gap-x-1 md:gap-x-3 flex-wrap gap-y-1">
                <li className="inline-flex items-center">
                    <Link href="#"
                        className="breadcrumb-links mr-1 md:mr-2">
                        <span className=' w-6 h-6 text-white mr-2 rounded-full bg-primary-gradient bg-200% inline-flex items-center justify-center'>
                            <BiHomeAlt2 />
                        </span>
                        Home
                    </Link>
                    <FaAngleRight className="text-on_dark_text_gray" />
                </li>

                <li>
                    <div className="flex items-center">
                        <Link href="#" className="breadcrumb-links mr-1 md:mr-2">
                            Blog
                        </Link>
                        <FaAngleRight className="text-on_dark_text_gray" />
                    </div>
                </li>
                <li aria-current="page">
                    <div className="flex items-center">
                        <span className="text-sm text-on_dark_text_gray">Digital Design That Will Help You Start Your Business</span>
                    </div>
                </li>
            </ol>
        </div>
    )
}

export default Breadcrumb