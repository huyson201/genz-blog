
import Wrapper from '@/components/Common/Wrapper/Wrapper'
import EditPost from '@/components/Page/EditPost'
import React from 'react'

interface Props {
    params: {
        id: string
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