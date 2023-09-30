"use client"
import { useSearchModal } from '@/contexts/SearchModalContext'
import { useDebounce } from '@/hooks/useDebounce'
import postService from '@/services/post.service'
import { slugify } from '@/utils'
import { Dialog, Transition } from '@headlessui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment, useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { RotatingLines } from 'react-loader-spinner'
import useSWR from 'swr'

type Props = {}

const loadingElement = <p className='dark:text-[#e2e8f0] flex flex-col gap-3 items-center justify-center p-6 text-on_light_text_gray  border-t border-on_light_border_2'>
    <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="30"
        visible={true} />
    Loading...
</p>

const noResultElements = <p className='dark:text-[#e2e8f0] text-center p-10 text-on_light_text_gray text-lg border-t border-on_light_border_2'>
    No results...
</p>

const searchFetcher = ([_, value]: [string, string]) => postService.search(value, { page: 1 })

export default function SearchModal() {
    const [searchValue, setSearchValue] = useState("")
    const searchModal = useSearchModal()

    const value = useDebounce(searchValue, 500)
    const swrKey = value && value !== "" ? ["/search", value] : null
    const { data, isLoading, error } = useSWR(swrKey, searchFetcher)

    useEffect(() => {
        const handleKeydown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "/") {
                searchModal?.open()
            }
        }

        window.addEventListener("keydown", handleKeydown)
        return () => window.removeEventListener("keydown", handleKeydown)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (searchModal?.isOpen) return
        setSearchValue("")
    }, [searchModal])


    const isNoResults = !isLoading && data && data.totalDocs === 0

    const hasResults = !isLoading && data && data.totalDocs > 0

    const showViewMoreLink = data && data.nextPage !== null

    const handleCloseModal = () => searchModal?.close()

    return (
        <>
            <Transition appear show={searchModal?.isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => searchModal?.close()}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/40 dark:bg-[#2d3748]/50" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-start justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="flex flex-col overflow-hidden w-full max-w-2xl mt-[10vh]  transform  rounded-lg max-h-[80vh] dark:bg-[#141922] bg-white  relative transition-all">

                                    <form action="" className='px-4 '>
                                        <div className='flex items-center relative  '>
                                            <div className='absolute left-0 pointer-events-none inset-y-0 flex items-center'><BsSearch className="w-5 h-5 dark:text-white text-gray-700" /></div>
                                            <input
                                                type="text"
                                                className='w-full text-black/80 pl-8 pr-12 py-2.5 outline-none dark:placeholder-[#e2e8f0]
                                                placeholder-on_light_placeholder dark:text-gray-200
                                                 border-none bg-transparent'
                                                placeholder='Type to search'
                                                onChange={(e) => setSearchValue(e.currentTarget.value)} />

                                            <div className='absolute inset-y-0 flex items-center right-0'>
                                                <button onClick={handleCloseModal} type='button' className='dark:bg-[#2d3748] dark:text-white text-gray-900 bg-[#e2e8f0] text-xs font-semibold rounded-md focus:outline-none  uppercase tracking-wider 
                                                        p-1.5'>
                                                    Esc
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                    {
                                        hasResults && (
                                            <ul className='search-results py-2 border-t border-on_light_border_2 dark:border-on_dark_border overflow-auto divide-y dark:divide-on_dark_border divide-on_light_border'>
                                                {
                                                    data.docs.map(post => (
                                                        <li className='py-2.5 px-4 group' key={post._id} onClick={handleCloseModal}>
                                                            <Link href={`/blogs/${slugify(post.title)}-${post._id}`} className='text-left'>
                                                                <div className='font-semibold text-xl text-black/90 dark:text-[#f7fafc] line-clamp-1 group-hover:text-blue transition-colors'>{post.title}</div>
                                                                <div className='line-clamp-2 text-sm text-gray-900 dark:text-[#e2e8f0]'>{post.description}</div>
                                                            </Link>
                                                        </li>
                                                    ))
                                                }
                                                {
                                                    showViewMoreLink && <li className='py-2.5 px-4' onClick={handleCloseModal}>
                                                        <Link href={`/search?q=${value}`} className='text-center text-blue underline text-sm font-semibold'>
                                                            View more
                                                        </Link>
                                                    </li>
                                                }

                                            </ul>
                                        )
                                    }

                                    {isNoResults && noResultElements}
                                    {isLoading && loadingElement}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
