
import PostRow from '@/components/PostRow/PostRow'
import React from 'react'

type Props = {
    params: {
        type: string
    }
}
export async function generateStaticParams() {

    return [{ type: "public" }, { type: "drafts" }]
}

const PostListPage = ({ params }: Props) => {
    const { type } = params
    return (
        <div>
            <PostRow type='draft' />
            <PostRow type='public' />
            <PostRow type='draft' />
            <PostRow type='draft' />
        </div>
    )
}

export default PostListPage