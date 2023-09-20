
import React from 'react'
import { FaEarthAsia, FaLock } from 'react-icons/fa6'
import Link from 'next/link'
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa'
import { Post, SaveOptions } from '@/types/type'
import { parserDateTimeAgo, slugify } from '@/utils'
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

                <div className=' w-full sm:w-auto'>
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
                    Last Update: <span>{parserDateTimeAgo(data.updatedAt)}</span>
                </div>
            </div>
            <div className='sm:ml-auto flex items-center gap-x-3'>
                <Link href={`/publish/post/${data._id}/edit`} className=' p-2  '>
                    <FaPencilAlt />
                    <span className='sr-only'>Edit</span>
                </Link>
                <button className='p-2' onClick={handleDelete}>
                    <FaTrashAlt />
                    <span className='sr-only'>Remove</span>
                </button>
            </div>
        </div>
    )
}

export default PostRow