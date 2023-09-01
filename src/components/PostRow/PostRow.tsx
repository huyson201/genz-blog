
import React from 'react'
import { FaEarthAsia, FaLock } from 'react-icons/fa6'
import Link from 'next/link'
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa'
type Props = {
    type: "draft" | 'public'
}

const PostRow = ({ type }: Props) => {
    return (
        <div className='border-[#c2d4ee] pt-4 pb-4 border-b dark:border-on_dark_border flex items-center'>
            <div className='space-y-2'>
                <div className='flex items-center flex-wrap sm:flex-nowrap '>
                    <span className='text-green-500'>
                        {type === 'draft' ? <FaLock /> : <FaEarthAsia />}
                    </span>
                    <Link href={"#"} className='text-xl ml-2 dark:text-on_dark_text_white text-on_light_text_white
                 hover:text-blue dark:hover:text-blue transition mr-4 whitespace-nowrap'>
                        Demo post
                    </Link>

                    <div className='space-x-3 w-full sm:w-auto'>
                        <Link href={"#"}
                            className='inline-block text-sm 
                         text-on_light_text_gray dark:text-on_dark_text_gray  dark:hover:text-blue hover:text-blue
                             transition-all'>
                            #Javascript
                        </Link>
                        <Link href={"#"}
                            className='inline-block text-sm 
                         text-on_light_text_gray dark:text-on_dark_text_gray  dark:hover:text-blue hover:text-blue
                             transition-all'>
                            #Nestjs
                        </Link>
                        <Link href={"#"}
                            className='inline-block text-sm 
                         text-on_light_text_gray dark:text-on_dark_text_gray  dark:hover:text-blue hover:text-blue
                             transition-all'>
                            #Javascript
                        </Link>
                        <Link href={"#"}
                            className='inline-block text-sm 
                         text-on_light_text_gray dark:text-on_dark_text_gray  dark:hover:text-blue hover:text-blue
                             transition-all'>
                            #Nestjs
                        </Link>

                    </div>
                </div>

                <div className='text-on_text_gray_2 text-xs'>
                    Last Update: <span>2 hours ago</span>
                </div>
            </div>
            <div className='ml-auto flex items-center space-x-3'>
                <Link href={"#"} className=' p-2  text-green-500'>
                    <FaPencilAlt />
                </Link>
                <button className='p-2 text-red-500'>
                    <FaTrashAlt />
                </button>
            </div>
        </div>
    )
}

export default PostRow