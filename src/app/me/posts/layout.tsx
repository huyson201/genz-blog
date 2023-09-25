"use client"
import Input from '@/components/Input/Input'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { FormEvent, useRef } from 'react'

type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const inputRef = useRef<HTMLInputElement>(null)
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        router.push(`?q=${inputRef.current?.value || ""}`)
    }
    return (
        <div className='px-2 md:px-4'>
            <form action={"#"} method='get' className='mb-6' onSubmit={handleSubmit}>
                <div className="flex w-full">
                    <Input ref={inputRef} wrapperClass='w-full' type='text' placeholder='Search' className='rounded text-sm py-2' defaultValue={searchParams.get("q") || ""} />
                    <button type="submit" className=" p-2.5 text-sm 
                    font-medium h-full dark:text-[#7f92b0] dark:bg-on_dark_card_bg order dark:focus:border-on_text_gray_2
                    dark:border-on_dark_border outline-none bg-on_light_card_bg border-on_light_border_2 rounded ml-3 text-on_light_text_white  border">
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                        <span className="sr-only">Search</span>
                    </button>
                </div>
            </form>
            <div>
                {children}
            </div>
        </div>
    )
}

export default Layout