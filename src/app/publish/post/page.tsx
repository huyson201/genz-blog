import Wrapper from '@/components/Common/Wrapper/Wrapper'
import CreateNewPost from '@/components/Page/CreateNewPost'
import { Metadata } from 'next'
import React from 'react'

type Props = {}
const metaTitle = 'Create a New Post'
const metaDesc = "Start writing and create a new post to share your ideas with the world. Express yourself through your content on Gen Z Blogger, your platform for creative expression and meaningful discussions."
export const metadata: Metadata = {
    title: metaTitle,
    description: metaDesc,
    alternates: {
        canonical: "/publish/post"
    },
    openGraph: {
        title: metaTitle,
        description: metaDesc
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