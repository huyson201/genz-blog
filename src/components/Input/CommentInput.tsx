"use client"
import React from 'react'
import GradientButton from '../Button/GradientButton'

type Props = {}

const CommentInput = (props: Props) => {
    return (
        <form action={"#"}>
            <h4 className='text-3xl text-[#7f92b0] font-bold mt-6 dark:text-[#b8cdeb]'>Leave a comment</h4>
            <textarea
                className='w-full mt-6 rounded-xl outline-none border border-[#c2d4ee] bg-on_light_card_bg 
                        dark:bg-on_dark_card_bg text-base dark:border-on_dark_border resize-y p-5 text-[#0f172a] dark:text-[#7f92b0]
                        dark:placeholder-on_dark_placeholder placeholder-on_light_placeholder '
                rows={6}
                placeholder='Write a comment'>

            </textarea>
            <GradientButton title='Post Comment' className='inline-block ml-auto text-sm font-bold text-white px-3 py-2 mt-1 rounded-md' />
        </form>
    )
}

export default CommentInput