
import PostRow from '@/components/PostRow/PostRow'
import React from 'react'

type Props = {}

const Drafts = (props: Props) => {
    return (
        <div>
            <PostRow type='draft' />
            <PostRow type='public' />
            <PostRow type='draft' />
            <PostRow type='draft' />
        </div>
    )
}

export default Drafts