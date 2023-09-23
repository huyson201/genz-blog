
"use client"
import { FormEvent, Fragment, useState } from 'react'
import { Disclosure, Transition } from '@headlessui/react'
import { twMerge } from 'tailwind-merge'
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2'
import { useRouter } from 'next/navigation'
export default function Search() {
    const router = useRouter()
    const [value, setValue] = useState("")
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (value === '') return
        router.push(`/search?q=${value}`)
        console.log("submit")
    }
    return (
        <Disclosure as="div" className="inline-block text-left">
            <Disclosure.Button title='Search' className={`flex items-center justify-center  text-on_text_gray_2 font-normal`}>
                <HiOutlineMagnifyingGlass className='w-6 h-6' />
            </Disclosure.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Disclosure.Panel
                    className="absolute right-0 top-full  z-[4] max-w-[500px] w-full  origin-top-right 
                 focus:outline-none  translate-y-2 md:translate-y-2.5 md:-translate-x-1/3">
                    {({ close }) => (
                        <div className=' lg:px-[72px]   px-3 sm:px-0 xs:px-8 '>
                            <div className="xs:ml-auto  p-4 w-full max-w-[350px]  dark:bg-[#0b1222] border rounded-md dark:border-on_dark_border">
                                <form method="POST"
                                    action="#"
                                    onSubmit={(e) => {
                                        handleSubmit(e);
                                        value !== "" && close();
                                    }}>
                                    <div className='relative'>
                                        <input
                                            onChange={(e) => setValue(e.currentTarget.value)}
                                            type='text'
                                            className={twMerge(`dark:text-[#7f92b0]  rounded-lg  block w-full py-2 pl-4 pr-12
                                           dark:bg-on_dark_card_bg border dark:focus:border-on_text_gray_2 transition-all text-sm
                                           dark:border-on_dark_border outline-none bg-on_light_card_bg border-on_light_border_2
                                            text-on_light_text_white placeholder-on_dark_text_gray dark:placeholder-gray-500`)}
                                            placeholder='Search'
                                        />
                                        <button
                                            type='submit'
                                            className='absolute top-2/4 right-4 text-on_dark_text_gray dark:text-[#7f92b0] text-xl -translate-y-2/4'
                                        >
                                            <HiOutlineMagnifyingGlass />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </Disclosure.Panel>
            </Transition>
        </Disclosure>
    )
}