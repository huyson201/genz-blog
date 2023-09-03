"use client"
import Wrapper from '@/components/Common/Wrapper/Wrapper'
import Editor from '@/components/Editor/Editor'
import InputField from '@/components/Input/InputField'
import MultiSelect from '@/components/Input/MultiSelect'
import React from 'react'

type Props = {}

const CreatePost = (props: Props) => {
    return (
        <section className='pt-6 py-12'>
            <Wrapper>
                <div>
                    <form action="#" className='space-y-6' onSubmit={(e) => e.preventDefault()}>
                        <InputField type='text' placeholder='Title' className='py-2 rounded-sm' />
                        <MultiSelect />
                        <div>
                            <Editor />
                        </div>
                    </form>
                </div>
            </Wrapper>

        </section>
    )
}

export default CreatePost