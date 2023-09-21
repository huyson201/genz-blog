"use client"
import React, { useMemo, useState, useImperativeHandle, useCallback } from 'react'
import Editor from '@/components/Editor/Editor'
import InputField from '@/components/Input/InputField'
import MultiSelect, { MultiSelectHandles } from '@/components/Input/MultiSelect'
import SaveOption, { SaveOptionHandles } from '@/components/PostForm/SaveOption/SaveOption'
import { PostFormData, SaveOptions } from '@/types/type'
import { useSession } from 'next-auth/react'

interface Props {
    onSave?: (data: PostFormData) => void,
    defaultValue?: PostFormData
}

const PostForm = ({ defaultValue, onSave }: Props) => {
    const { data: session } = useSession()
    const [titleValue, setTitleValue] = useState<string>(defaultValue?.title || "")
    const [descValue, setDescValue] = useState<string>(defaultValue?.description || "")
    const [contentValue, setContentValue] = useState<string>(defaultValue?.content || "")

    const multiSelectRef = React.useRef<MultiSelectHandles | null>(null)
    const saveOptionRef = React.useRef<SaveOptionHandles | null>(null)

    const canSave = useMemo(() => {
        if (defaultValue) return true
        return titleValue !== "" && multiSelectRef.current !== null && multiSelectRef.current.getTags().length > 0 && contentValue !== ""
    }, [titleValue, contentValue, multiSelectRef, defaultValue])


    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitleValue(e.currentTarget.value)
    }

    const handleChangeDesc = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescValue(e.currentTarget.value)
    }
    const handleChangeContent = (value: string) => {
        setContentValue(value)
    }

    const handleSave = useCallback(async () => {
        if (onSave) {
            const postData: PostFormData = {
                content: contentValue,
                description: descValue,
                title: titleValue,
                hashtags: multiSelectRef.current?.getTags() || [],
                display: saveOptionRef.current?.getValue() || SaveOptions.JUST_ME
            }
            onSave(postData)
        }

    }, [contentValue, descValue, titleValue, onSave])


    return (
        <div>
            <form action="#" className='space-y-6' onSubmit={(e) => e.preventDefault()}>
                <InputField type='text' placeholder='Title' className='py-2 rounded-sm bg-on_light_body_bg' onChange={handleChangeTitle} defaultValue={defaultValue?.title || ""} />
                <MultiSelect ref={multiSelectRef} defaultValue={defaultValue?.hashtags || []} />
                <div className='flex justify-end'>
                    <SaveOption ref={saveOptionRef} defaultValue={defaultValue?.display || SaveOptions.JUST_ME} onSave={handleSave} canSave={canSave} />
                </div>
                <div>
                    <textarea
                        onChange={handleChangeDesc}
                        name="description"
                        rows={5}
                        defaultValue={defaultValue?.description || ""}
                        className='dark:text-[#7f92b0]  rounded-lg  block w-full px-4 py-2
                            dark:bg-on_dark_card_bg border dark:focus:border-on_text_gray_2 
                            transition-all dark:border-on_dark_border outline-none border-on_light_border_2 text-on_light_text_white 
                            dark:placeholder-gray-500 placeholder-on_dark_text_gray' placeholder='Description...'></textarea>
                </div>
                <div>
                    <Editor onChangeData={handleChangeContent} defaultValue={defaultValue?.content} />
                </div>
            </form>
        </div>
    )
}

export default PostForm