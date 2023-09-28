

import React from 'react'
import Wrapper from '../Wrapper/Wrapper'
import Logo from '@/components/Logo/Logo'
import { IoMailOutline } from 'react-icons/io5'
import { Button } from '@/components/Button/Button'

type Props = {}

const Footer = (props: Props) => {
    return (
        <footer className='pb-12 relative z-[1]'>
            <Wrapper>
                <div className='bg-on_light_card_bg dark:bg-on_dark_card_bg border border-on_light_border_2 dark:border-on_dark_border rounded-[32px] md:rounded-[50px] px-4 
                 md:px-24 lg:px-32 '>
                    <div className=' mt-6 md:mt-12 grid sm:grid-cols-2 gap-6 md:gap-24 lg:gap-32 border-b border-on_light_border_2 dark:border-on_dark_border pb-10 '>
                        <div className=''>
                            <Logo />
                            <p className='mt-6 text-sm dark:text-on_dark_text_gray text-[#708ab0] '>When an unknown prnoto sans took a galley and scrambled it to make specimen book not only five When an unknown prnoto sans took a galley and scrambled it to five centurie.</p>
                            <div className='mt-6'>
                                <div className='text-on_light_text_white dark:text-on_dark_text_white font-bold mb-2 '>Address</div>
                                <div className='dark:text-on_dark_text_gray text-sm text-[#708ab0] '>123 Main Street New York, NY 10001</div>
                            </div>
                        </div>
                        <div>
                            <div className='text-on_light_text_white dark:text-on_dark_text_white text-xl '>Newsletter</div>
                            <p className='text-sm mt-4 md:mt-9 text-[#708ab0] dark:text-on_dark_text_gray mb-6 '>Sign up to be first to receive the latest stories inspiring us, case studies, and industry news.</p>
                            <form action={"#"} className='space-y-4'>
                                <div className='flex gap-2 items-center py-2 border-b border-on_dark_text_gray  dark:text-white
                             text-sm text-black  '>
                                    <IoMailOutline className="text-base text-on_dark_text_gray" />
                                    <input className='bg-transparent outline-none w-full placeholder-[#7f92b0]' type="text" placeholder='Email' />
                                </div>

                                <Button size={"sm"}>
                                    Subscribe
                                </Button>
                            </form>
                        </div>
                    </div>
                    <div className='py-4 text-sm md:py-10 text-center md:text-left text-on_dark_text_gray dark:text-on_light_text_gray'>
                        &copy;2023 Created by Son Nguyen.
                    </div>
                </div>


            </Wrapper>
        </footer>
    )
}

export default Footer