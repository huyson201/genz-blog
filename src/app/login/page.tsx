"use client"

import Link from 'next/link'
import React from 'react'
import InputField from '@/components/Input/InputField'
import PasswordInput from '@/components/Input/PasswordInput'
import GradientButton from '@/components/Button/GradientButton'
import LoginRegisterWrapper from '@/components/LoginRegisterWrapper/LoginRegisterWrapper'
import GoogleButton from '@/components/Button/GoogleButton'
import { signIn } from 'next-auth/react'
type Props = {}

const Login = (props: Props) => {

    const handleSignIn = () => {
        signIn("credentials", {
            redirect: false
        })
    }
    return (
        <LoginRegisterWrapper>
            <h1 className="sm:text-[35px] xs:text-[25] text-[20px] md:text-[45px] font-bold text-center leading-tight tracking-tight gradient-text mb-6 md:mb-12">
                Welcome back!
            </h1>
            <div className='max-w-[400px] w-full mx-auto relative'>
                <div className="w-full md:space-y-6 sm:p-8 p-8  rounded-xl  border md:mt-0 sm:max-w-md bg-on_light_card_bg border-[#c2d4ee] dark:bg-on_dark_card_bg dark:border-on_dark_border">
                    <form className="space-y-4 md:space-y-6" action="#">
                        <InputField type='email' placeholder='name@company.com' required />

                        <PasswordInput placeholder="••••••••" required />

                        <div className="flex items-center justify-between">
                            <Link href="#" className="text-sm text-on_light_text_white text-primary-600 hover:underline dark:text-on_dark_text_white">Forgot password?</Link>
                        </div>

                        <GradientButton type='submit' className='w-full dark:text-on_dark_card_bg dark:hover:text-white hover:text-white outline-none rounded-lg  py-2.5 text-sm font-bold' title='Sign in' />
                        <p className="text-sm  text-on_dark_text_gray">
                            Don’t have an account yet? <Link href="/register" >
                                <span className=" gradient-text">Sign up</span>
                            </Link>

                        </p>
                    </form>
                </div>
                <div
                    className='form-separator'>
                    <span className='relative z-[2] text-sm text-on_dark_text_gray inline-block px-3 dark:bg-on_dark_body_bg bg-on_light_body_bg'>
                        Or, sign in with your email
                    </span>
                </div>
                <GoogleButton title='Sign in with google' />
            </div>
        </LoginRegisterWrapper>
    )
}

export default Login