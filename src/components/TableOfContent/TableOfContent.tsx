"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import GradientText from '../GradientText/GradientText'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6'

type Props = {}

const TableOfContent = (props: Props) => {
    const [data, setData] = useState<{ id: string, text: string | null }[]>()
    const [show, setShow] = useState(false)
    useEffect(() => {
        const titles = document.querySelectorAll('h2,h3,h4,h5,h6')

        const list = Array.from(titles).map(e => {
            const text = e.textContent
            e.id = text?.replace(/\s+/g, "-") || ""
            return {
                id: e.id,
                text: text
            }
        })
        setData(list)
    }, [])
    return (
        <div className='mb-4'>
            <div className='flex items-center gap-1 cursor-pointer' onClick={() => setShow(prev => !prev)}>
                <GradientText size={"default"}
                    className='text-base xs:text-xl font-bold relative after:absolute after:w-[80%]  after:h-0.5 after:bg-primary-gradient
                            pb-2 after:bottom-0 after:left-0'>Table of contents</GradientText>

                {
                    show ? <FaAngleUp className="text-base xs:text-xl mb-1 text-on_light_text_gray dark:text-on_dark_text_gray" /> : <FaAngleDown className="text-base xs:text-xl mb-1 text-on_light_text_gray dark:text-on_dark_text_gray" />
                }
            </div>
            {
                show && <ul className='space-y-2 mt-2 list-disc text-on_light_text_gray dark:text-on_dark_text_gray ml-5'>
                    {
                        data && data.length > 0 && data.map((value, index) => (
                            <li key={`${value.id}-${index}`} className=''>
                                <Link className={twMerge("text-sm xs:text-base text-blue underline underline-offset-4")} href={`#${value.id}`} >
                                    {value.text}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            }

        </div>
    )
}

export default TableOfContent