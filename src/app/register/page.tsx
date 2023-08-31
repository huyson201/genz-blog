

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import googleIcon from '@/assets/google.svg'
import InputField from '@/components/Input/InputField'
import PasswordInput from '@/components/Input/PasswordInput'
import GradientButton from '@/components/Button/GradientButton'
import LoginRegisterWrapper from '@/components/LoginRegisterWrapper/LoginRegisterWrapper'
import GoogleButton from '@/components/Button/GoogleButton'
type Props = {}

const Register = (props: Props) => {
    return (
        <LoginRegisterWrapper>
            <h1 className="sm:text-[35px] xs:text-[25] text-[20px] md:text-[45px] font-bold text-center leading-tight tracking-tight gradient-text mb-6 md:mb-12">
                Register
            </h1>
            <div className='max-w-[400px] w-full mx-auto relative'>
                <div className="w-full md:space-y-6 sm:p-8 p-8  rounded-xl  border md:mt-0 sm:max-w-md bg-on_light_card_bg border-[#c2d4ee] dark:bg-on_dark_card_bg dark:border-on_dark_border">
                    <form className="space-y-4 md:space-y-6" action="#">
                        <InputField key={`full name`} type='text' placeholder='Full name' required />
                        <InputField key={`email`} type='email' placeholder='name@company.com' required />

                        <PasswordInput key={`password`} placeholder="Password" required />
                        <PasswordInput key={`confirm password`} placeholder="Confirm password" required />

                        <div className="flex items-center justify-between">
                            <Link href="#" className="text-sm text-on_light_text_white text-primary-600 hover:underline dark:text-on_dark_text_white">Forgot password?</Link>
                        </div>

                        <GradientButton type='submit' className='w-full dark:text-on_dark_card_bg dark:hover:text-white hover:text-white  outline-none rounded-lg  py-2.5 text-sm font-bold' title='Create an account' />
                        <p className="text-sm  text-on_dark_text_gray">
                            Already have an account? <Link href="#" >
                                <span className=" gradient-text">Sign in</span>
                            </Link>

                        </p>
                    </form>
                </div>
                <div
                    className='form-separator'>
                    <span className='relative z-[2] text-sm text-on_dark_text_gray inline-block px-3 dark:bg-on_dark_body_bg bg-on_light_body_bg'>
                        Or, sign up with your email
                    </span>
                </div>
                <GoogleButton title='Sign up with google' />
            </div>
        </LoginRegisterWrapper>
    )
}

export default Register