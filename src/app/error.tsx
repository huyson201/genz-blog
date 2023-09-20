"use client"

import Image from 'next/image'
import React from 'react'
import wrongIcon from '@/assets/wrong.png'
import Link from 'next/link'
import Wrapper from '@/components/Common/Wrapper/Wrapper'
type Props = {
    error: Error,
    reset: () => void
}

const error = ({ error, reset }: Props) => {
    return (
        <Wrapper>
            <main className='text-center py-12 space-y-3'>
                <div className='text-on_light_text_gray dark:text-on_dark_text_gray font-bold '>There was a problem</div>
                <h1 className='bg-primary-gradient inline-block bg-clip-text bg-200% text-transparent xs:text-[24px] text-[20px] sm:text-[34px] md:text-[44px] font-bold'>{error.message}</h1>
                <p className='text-base text-[#708ab0] dark:text-on_dark_text_gray'>Please try again or contact support if problem persist.</p>
                <div className='space-x-4'>
                    <button onClick={() => reset()} className='px-2 py-1.5 rounded bg-primary-gradient text-white bg-200% hover:bg-right transition-all'>
                        Try again
                    </button>
                    <Link href={"/"} className='px-2 py-1.5 rounded bg-primary-gradient text-white bg-200% hover:bg-right transition-all'>
                        Go back home
                    </Link>
                </div>
            </main>
        </Wrapper>
    )
}

export default error