

import Wrapper from '@/components/Common/Wrapper/Wrapper'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BsFillEyeFill } from 'react-icons/bs'
import googleIcon from '@/assets/google.svg'
type Props = {}

const Login = (props: Props) => {
    return (
        <section >
            <Wrapper>
                <div className='py-12 relative'>
                    <h1 className="sm:text-[35px] xs:text-[25] text-[20px] md:text-[45px] font-bold text-center leading-tight tracking-tight gradient-text mb-6 md:mb-12">
                        Welcome back!
                    </h1>
                    <div className='max-w-[400px] w-full mx-auto'>
                        <div className="w-full md:space-y-6 sm:p-8 p-8 bg-white rounded-xl  border md:mt-0 sm:max-w-md dark:bg-on_dark_card_bg dark:border-on_dark_border">
                            <form className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <input
                                        type="email"
                                        className="dark:text-[#7f92b0]  rounded-lg  block w-full p-4
                                          dark:bg-on_dark_card_bg border dark:focus:border-on_text_gray_2 
                                          transition-all dark:border-on_dark_border outline-none"
                                        placeholder="name@company.com"
                                        required />
                                </div>
                                <div className='relative'>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="dark:text-[#7f92b0]  rounded-lg  block w-full py-4 pl-4 pr-12
                                           dark:bg-on_dark_card_bg border dark:focus:border-on_text_gray_2 
                                           transition-all dark:border-on_dark_border outline-none"
                                        required />
                                    <button className='absolute top-2/4 right-4 dark:text-[#7f92b0] text-xl -translate-y-2/4'>
                                        <BsFillEyeFill />
                                    </button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <Link href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-on_dark_text_white">Forgot password?</Link>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full  outline-none rounded-lg  py-2.5 text-center bg-primary-gradient bg-200% dark:text-on_dark_card_bg dark:hover:text-white transition-colors
                                                text-sm font-bold">
                                    Sign in
                                </button>
                                <p className="text-sm  text-gray-500 dark:text-on_dark_text_gray">
                                    Don’t have an account yet? <Link href="#" >
                                        <span className=" gradient-text">Sign up</span>
                                    </Link>

                                </p>
                            </form>
                        </div>
                        <div
                            className='text-center my-6 relative before:content-[""] before:absolute before:w-1/3 before:h-[1px] dark:before:bg-on_dark_border
                                    before:top-2/4 before:left-0 before:-translate-y-2/4 before:translate-x-1/3
                                    after::content-[""] after:absolute after:w-1/3 after:h-[1px] dark:after:bg-on_dark_border
                                    after:top-2/4 after:right-0 after:-translate-y-2/4  after:-translate-x-1/3'>
                            <span className='relative z-[2] text-sm dark:text-on_dark_text_gray inline-block px-3 dark:bg-on_dark_body_bg bg-on_light_body_bg'> Or, sign in with your email</span>
                        </div>
                        <button className='w-full flex items-center justify-center gap-2 dark:text-on_dark_text_gray text-sm font-bold
                                           py-2 rounded-3xl dark:bg-on_dark_card_bg dark:border-on_dark_border border  transition-all
                                           hover:-translate-y-0.5 dark:hover:text-on_dark_text_white'>
                            <Image src={googleIcon} alt='google icon' />
                            <span>Sign in with google</span>
                        </button>
                    </div>
                </div>
            </Wrapper>
        </section>
    )
}

export default Login