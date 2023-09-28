
"use client"
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2'
import { useSearchModal } from '@/contexts/SearchModalContext'
export default function Search() {
    const searchModal = useSearchModal()

    return (

        <button onClick={() => searchModal?.open()} title='Search (Ctrl + /)' className={`outline-none border-none flex items-center justify-center  text-on_text_gray_2 font-normal`}>
            <HiOutlineMagnifyingGlass className='w-6 h-6 ' />

        </button>
    )
}