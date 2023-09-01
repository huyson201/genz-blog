
import InputField from '@/components/Input/InputField'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const layout = ({ children }: Props) => {
    return (
        <div className='px-2 md:px-4'>
            <form action={"#"} method='get' className='mb-6'>
                <div className="flex w-full">
                    <InputField wrapperClass='w-full' type='text' placeholder='Search' className='rounded text-sm py-2' />
                    <button type="submit" className=" p-2.5 text-sm 
                    font-medium h-full dark:text-[#7f92b0] dark:bg-on_dark_card_bg order dark:focus:border-on_text_gray_2
                    dark:border-on_dark_border outline-none bg-on_light_card_bg border-[#c2d4ee] rounded ml-3 text-on_light_text_white  border">
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
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

export default layout