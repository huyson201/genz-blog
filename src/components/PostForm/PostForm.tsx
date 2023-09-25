"use client"
import React, { useMemo, useState } from 'react'
import Editor from '@/components/Editor/Editor'
import Input, { inputVariants } from '@/components/Input/Input'
import MultiSelect, { MultiSelectHandles } from '@/components/Input/MultiSelect'
import SaveOption, { SaveOptionHandles } from '@/components/PostForm/SaveOption/SaveOption'
import { PostFormData, SaveOptions } from '@/types/type'
import { cn } from '@/utils'

interface Props {
    onSave?: (data: PostFormData) => void,
    defaultValue?: PostFormData
}

const PostForm = ({ defaultValue, onSave }: Props) => {
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

    const handleSave = async () => {
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

    }


    return (
        <div>
            <form action="#" className='space-y-6' onSubmit={(e) => e.preventDefault()}>
                <Input type='text' placeholder='Title' inputSize={"xs"} className='bg-on_light_body_bg' onChange={handleChangeTitle} defaultValue={defaultValue?.title || ""} />
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
                        className={cn(inputVariants({ inputSize: "xs", className: "rounded-lg bg-on_light_body_bg" }))}
                        placeholder='Description...'></textarea>
                </div>
                <div>
                    <Editor onChangeData={handleChangeContent} defaultValue={defaultValue?.content} />
                </div>
            </form>
        </div>
    )
}

export default PostForm