
import BlogList from '@/components/BlogList/BlogList'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import Wrapper from '@/components/Common/Wrapper/Wrapper'
import postService from '@/services/post.service'
import React from 'react'

interface Props {
    searchParams: {
        page: number
    }
}

const Blogs = async ({ searchParams: { page = 1 } }: Props) => {
    const post = await postService.getPosts({ page })
    return (
        <BlogList data={post} currentPage={page} />
    )
}

export default Blogs