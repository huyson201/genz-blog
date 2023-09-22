"use client"
import React, { FormEvent, useState } from 'react'
import { Button, buttonVariants } from '../Button/Button'
import { useSession } from 'next-auth/react'
import useCallbackUrl from '@/hooks/useCallbackUrl'
import Link from 'next/link'
import { cn } from '@/utils'

interface Props {
    onSubmit?: (value: string) => void,
    showCancelButton?: boolean,
    onRequestCancel?: () => void,
    rows?: number,
    defaultValue?: string
}

const CommentInput = ({ onSubmit, onRequestCancel, showCancelButton, rows, defaultValue }: Props) => {
    const ref = React.useRef<HTMLTextAreaElement>(null)
    const { status } = useSession()
    const callbackUrl = useCallbackUrl()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!ref.current) return
        onSubmit?.(ref.current.value)
        ref.current.value = ""
    }
    return (
        <form action={"#"} onSubmit={handleSubmit}>
            <textarea
                defaultValue={defaultValue}
                ref={ref}
                className='w-full mt-6 rounded-xl outline-none border border-on_light_border_2 bg-on_light_card_bg 
                        dark:bg-on_dark_card_bg text-base dark:border-on_dark_border resize-y p-5 text-[#0f172a] dark:text-[#7f92b0]
                        dark:placeholder-on_dark_placeholder placeholder-on_light_placeholder '
                rows={rows}
                placeholder='Write a comment'>

            </textarea>
            <div className='flex items-center justify-end gap-x-4 mt-2'>
                {
                    showCancelButton && <Button onClick={onRequestCancel} variant={'custom'} size={'sm'}
                        className='border border-on_light_border dark:border-on_dark_border hover:bg-black/40'>
                        Cancel
                    </Button>
                }
                {
                    status === "authenticated" && <Button size={'sm'}>
                        Post Comment
                    </Button>
                }
                {
                    status === "unauthenticated" && <Link
                        className={cn(buttonVariants({ size: "sm" }))}
                        href={{ href: "/login", query: { callbackUrl }, pathname: "/login" }} >
                        Login to post
                    </Link>
                }

            </div>

        </form>
    )
}

export default CommentInput