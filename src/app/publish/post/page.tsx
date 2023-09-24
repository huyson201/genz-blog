import Wrapper from '@/components/Common/Wrapper/Wrapper'
import CreateNewPost from '@/components/Page/CreateNewPost'
import { Metadata } from 'next'
import React from 'react'

type Props = {}
export const metadata: Metadata = {
    title: 'Create a New Post - Gen Z Blogger',
    description: "Start writing and create a new post to share your ideas with the world. Express yourself through your content on Gen Z Blogger, your platform for creative expression and meaningful discussions.",
    alternates: {
        canonical: "/publish/post"
    },
    openGraph: {
        title: 'Create a New Post - Gen Z Blogger',
        description: "Start writing and create a new post to share your ideas with the world. Express yourself through your content on Gen Z Blogger, your platform for creative expression and meaningful discussions.",
    },
}
const CreatePost = (props: Props) => {
    return (
        <section className='pt-6 py-12'>
            <Wrapper>
                <CreateNewPost />
            </Wrapper>

        </section>
    )
}

export default CreatePost