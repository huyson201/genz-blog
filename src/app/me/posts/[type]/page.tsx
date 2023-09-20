import { SaveOptions } from '@/types/type'
import React from 'react'
import ListPost from './ListPost'

type Props = {
    params: {
        type: string
    },
    searchParams: {
        page: number,
        q?: string
    }
}

const displayOption: Record<string, SaveOptions> = {
    "public": SaveOptions.PUBLIC,
    "drafts": SaveOptions.JUST_ME
}


export async function generateStaticParams() {
    return [{ type: "public" }, { type: "drafts" }]
}
export const dynamicParams = false

const PostListPage = ({ params, searchParams: { page = 1, q } }: Props) => {
    const { type } = params
    return (
        <div>
            <ListPost type={displayOption[type]} page={page} q={q} />
        </div>
    )
}

export default PostListPage