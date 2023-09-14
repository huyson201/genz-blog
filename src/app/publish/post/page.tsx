"use client"
import Wrapper from '@/components/Common/Wrapper/Wrapper'
import Editor from '@/components/Editor/Editor'
import InputField from '@/components/Input/InputField'
import MultiSelect from '@/components/Input/MultiSelect'
import CreateNewPost from '@/components/Page/CreateNewPost'
import SaveOption from '@/components/PostForm/SaveOption/SaveOption'
import React from 'react'

type Props = {}

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