
import React, { Fragment } from 'react'
import { FaAngleDown, FaEarthAsia, FaLock } from 'react-icons/fa6'
import Link from 'next/link'
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa'
import { Post, SaveOptions } from '@/types/type'
import { parserDateTimeAgo, slugify } from '@/utils'
import { Menu, Transition } from '@headlessui/react'

type Props = {
    data: Post,
    onDelete?: (data: Post) => void
}

const PostRow = ({ data, onDelete }: Props) => {
    const handleDelete = () => {
        onDelete?.(data)
    }
    return (
        <div className=' gap-y-3 pt-4 pb-4  flex sm:items-center flex-col sm:flex-row'>
            <div className='space-y-2'>
                <div className='flex items-center flex-wrap gap-2'>
                    <span className='text-green-500 '>
                        {data.display === SaveOptions.JUST_ME ? <FaLock /> : <FaEarthAsia />}
                    </span>

                    <Link href={`/blogs/${slugify(data.title)}-${data._id}`} className='text-base sm:text-xl  dark:text-on_dark_text_white text-on_light_text_white
                 hover:text-blue dark:hover:text-blue transition mr-4'>
                        {data.title}
                    </Link>

                </div>

                <div className='w-full sm:w-auto'>
                    {
                        data.hashtags.map(tag => (
                            <Link href={`/tags/${tag.slug}`} key={tag._id}
                                className='inline-block text-sm mr-3
                         text-on_light_text_gray dark:text-on_dark_text_gray  dark:hover:text-blue hover:text-blue
                             transition-all'>
                                #{tag.name}
                            </Link>
                        ))
                    }

                </div>
                <div className='text-on_text_gray_2 text-xs'>
                    <div className='flex items-center gap-x-2'>
                        Last Update: <span>{parserDateTimeAgo(data.updatedAt)}</span>
                        <Menu as="div" className="relative  inline-block text-left  ">
                            <Menu.Button className="flex mt-1 text-lg items-center justify-center">
                                <FaAngleDown />
                            </Menu.Button>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute left-2/4 w-32 -translate-x-2/4 z-10 mt-2  origin-top-right dark:bg-on_dark_body_bg bg-on_light_body_bg shadow-sm dark:shadow-gray-600 shadow-gray-700">
                                    <div className="py-1">
                                        <Menu.Item >
                                            {({ active }) => (
                                                <Link href={`/publish/post/${data._id}/edit`} className='hover:text-blue dark:hover:text-blue hover:bg-[rgb(238,243,249)] dark:hover:bg-gray-700 py-2 px-6 block '>
                                                    Edit
                                                </Link>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button className='text-left hover:text-blue dark:hover:text-blue hover:bg-[rgb(238,243,249)] py-2 px-6 w-full dark:hover:bg-gray-700 block ' onClick={handleDelete} >
                                                    Delete
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default PostRow