
"use client"
import React, { forwardRef, useState, useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import { IoAddOutline, IoCloseOutline } from 'react-icons/io5'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {

}

const MultiSelect = forwardRef<HTMLInputElement, Props>(({ className, ...props }, ref) => {
    const [tags, setTags] = useState<string[]>([])
    const [inputValue, setInputValue] = useState<string>("")

    const tagElements = useMemo(() => {

        if (tags.length <= 0) return null
        const handleRemoveTag = (tag: string) => {
            const index = tags.indexOf(tag)
            if (index !== -1) {
                setTags(prev => {
                    prev.splice(index, 1)
                    return [...prev]
                })
            }
        }
        return (
            <div className='inline-flex items-center gap-2 flex-wrap'>
                {tags.map((tag) => (<SelectTag key={tag} name={tag} onClickRemove={() => handleRemoveTag(tag)} />))}
            </div>
        )
    }, [tags])

    const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== "Enter" || inputValue === "") return

        if (tags.includes(inputValue)) {
            setInputValue("")
            return
        }
        setTags(oldTags => [...oldTags, inputValue])
        setInputValue("")
    }

    const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)

    }

    return (
        <div
            className='w-full focus-within:border-[#c2d4ee] dark:focus-within:border-on_text_gray_2 flex
                 border-[#c2d4ee] flex-wrap p-2 gap-x-4 gap-y-2 dark:border-on_dark_border border dark:bg-on_dark_card_bg  rounded-sm'>
            {tagElements}

            <div className='flex items-center flex-grow gap-2 min-w-[20] max-h-[42px]'>
                <input
                    {...props}
                    ref={ref}
                    className={twMerge(`dark:text-[#7f92b0] block w-full
                    bg-transparent transition-all  outline-none  text-on_light_text_white 
                    dark:placeholder-gray-500 placeholder-on_dark_text_gray text-sm`, className)}
                    placeholder='Tag your post. Maximum 5 tags, minimum 1 tag! '
                    onKeyDown={handleKeydown}
                    onChange={handleOnchange}
                    value={inputValue}
                />

            </div>
        </div>
    )
})

MultiSelect.displayName = 'MultipleSelect'

export default MultiSelect

interface SelectTagProps {
    name: string,
    onClickRemove: () => void
}
export const SelectTag = ({ name, onClickRemove }: SelectTagProps) => {
    return (
        <span className="py-1 px-2 text-xs dark:bg-on_dark_card_bg bg-on_light_card_bg
                        text-on_light_text_gray dark:text-on_dark_text_gray inline-flex items-center
                    border border-[#c2d4ee] dark:border-on_dark_border  rounded">
            {name}
            <button type='button' className='w-4 h-4 rounded-full flex items-center justify-center ml-2 
                               transition-all hover:text-white hover:bg-[#7f92b0] dark:hover:bg-on_dark_bg_2'
                onClick={onClickRemove}>
                <IoCloseOutline />
            </button>
        </span>
    )
}