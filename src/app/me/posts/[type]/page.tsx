"use client"
import PostRow from '@/components/PostRow/PostRow'
import authService from '@/services/auth.service'
import { SaveOptions } from '@/types/type'
import { useSession } from 'next-auth/react'
import { notFound } from 'next/navigation'
import React from 'react'
import useSWR from 'swr'
import ListPost from './ListPost'

type Props = {
    params: {
        type: string
    },
    searchParams: {
        page: number
    }
}

const displayOption: Record<string, SaveOptions> = {
    "public": SaveOptions.PUBLIC,
    "drafts": SaveOptions.JUST_ME
}
export async function generateStaticParams() {
    return [{ type: "public" }, { type: "drafts" }]
}

const PostListPage = ({ params, searchParams: { page = 1 } }: Props) => {
    const { type } = params
    if (!["public", "drafts"].includes(type.toLowerCase())) return notFound()

    return (
        <div>
            <ListPost type={displayOption[type]} page={page} />
        </div>
    )
}

export default PostListPage