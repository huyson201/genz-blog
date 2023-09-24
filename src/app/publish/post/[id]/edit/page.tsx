
import Wrapper from '@/components/Common/Wrapper/Wrapper'
import EditPost from '@/components/Page/EditPost'
import { Metadata } from 'next'
import React from 'react'

interface Props {
    params: {
        id: string
    }
}


export async function generateMetadata(props: Props) {
    const title = `Edit Post #${props.params.id} - Modify Your Content - Gen Z Blogger`
    const desc = `Edit Post #${props.params.id} to make modifications and updates to your content. Customize your work on Gen Z Blogger, your platform for creative expression and storytelling.`

    return {
        title: title,
        description: desc,
        alternates: {
            canonical: "/publish/post/" + props.params.id + "/edit"
        },
        openGraph: {
            title: title,
            description: desc,

        },

    }
}

const EditPostPage = ({ params }: Props) => {
    return (
        <section className='pt-6 py-12'>
            <Wrapper>
                <EditPost postId={params.id} />
            </Wrapper>
        </section>

    )
}

export default EditPostPage