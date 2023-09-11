"use client"
import Wrapper from '@/components/Common/Wrapper/Wrapper'
import Editor from '@/components/Editor/Editor'
import InputField from '@/components/Input/InputField'
import MultiSelect from '@/components/Input/MultiSelect'
import SaveOption from '@/components/SaveOption/SaveOption'
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
                        <div className='flex justify-end'>
                            <SaveOption />
                        </div>
                        <div>
                            <textarea
                                name="description"
                                className='dark:text-[#7f92b0]  rounded-lg  block w-full p-4
                            dark:bg-on_dark_card_bg border dark:focus:border-on_text_gray_2 
                            transition-all dark:border-on_dark_border outline-none bg-on_light_card_bg border-[#c2d4ee] text-on_light_text_white 
                            dark:placeholder-gray-500 placeholder-on_dark_text_gray' placeholder='Description'></textarea>
                        </div>
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