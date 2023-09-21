"use client"
import React from 'react'
import { Button } from '../Button/Button'

type Props = {}

const CommentInput = (props: Props) => {
    return (
        <form action={"#"}>
            <h4 className='text-3xl text-[#7f92b0] font-bold mt-6 dark:text-[#b8cdeb]'>Leave a comment</h4>
            <textarea
                className='w-full mt-6 rounded-xl outline-none border border-on_light_border_2 bg-on_light_card_bg 
                        dark:bg-on_dark_card_bg text-base dark:border-on_dark_border resize-y p-5 text-[#0f172a] dark:text-[#7f92b0]
                        dark:placeholder-on_dark_placeholder placeholder-on_light_placeholder '
                rows={6}
                placeholder='Write a comment'>

            </textarea>
            <Button className='flex ml-auto mt-1' size={'sm'}>
                Post Comment
            </Button>
        </form>
    )
}

export default CommentInput