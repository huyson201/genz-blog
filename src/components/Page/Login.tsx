"use client"

import Link from 'next/link'
import React from 'react'
import InputField from '@/components/Input/InputField'
import PasswordInput from '@/components/Input/PasswordInput'
import LoginRegisterWrapper from '@/components/LoginRegisterWrapper/LoginRegisterWrapper'
import GoogleButton from '@/components/Button/GoogleButton'
import { signIn } from 'next-auth/react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import ErrorFeedback from '@/components/ErrorFeedback/ErrorFeedback'
import toast from 'react-hot-toast'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/Button/Button'
import { ColorRing } from 'react-loader-spinner'
import GradientText from '@/components/GradientText/GradientText'

type Props = {}

const validateSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).max(32).required()
})

const Login = (props: Props) => {
    const [error, setError] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [isPending, startTransition] = React.useTransition()
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get("callbackUrl")
    const router = useRouter()

    const { handleSubmit, register, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validateSchema),
        reValidateMode: 'onBlur',
    })
    const submit = handleSubmit(async (data) => {
        setError('')
        setLoading(true)
        signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
        }).then((res) => {
            if (res?.error) {
                setError(res.error)
                reset()
                return
            }
            toast.success("Successfully login!")
            router.push(`${callbackUrl !== null ? callbackUrl : "/"}`)
        }).finally(() => setLoading(false))
    })



    return (
        <LoginRegisterWrapper>
            <h1 className="text-center mb-6 md:mb-12">
                <GradientText size={"sm"} className='font-bold leading-tight tracking-tight'>
                    Welcome back!
                </GradientText>
            </h1>
            <div className='max-w-[400px] w-full mx-auto relative'>
                <div className="w-full md:space-y-6 sm:p-8 p-8  rounded-xl  border md:mt-0 sm:max-w-md bg-on_light_card_bg   dark:bg-on_dark_card_bg dark:border-on_dark_border">
                    {(errors.email || errors.password || error !== '') && <ErrorFeedback message={errors.email?.message || errors.password?.message || error} />}
                    <form className="space-y-4 md:space-y-6" action="#" onSubmit={submit}>
                        <InputField type='text' placeholder='name@company.com' {...register("email")} />

                        <PasswordInput placeholder="••••••••" {...register('password')} />

                        <div className="flex items-center justify-between">
                            <Link href="#" className="text-sm text-on_light_text_white text-primary-600 hover:underline dark:text-on_dark_text_white">Forgot password?</Link>
                        </div>
                        <Button
                            className='w-full flex items-center justify-center rounded-lg h-10'
                            disable={loading ? "disabled" : "none"}
                            disabled={loading}
                            type='submit'>
                            {
                                loading ? <ColorRing
                                    height="30"
                                    width="30"
                                    colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                                /> : " Sign in"
                            }
                        </Button>
                        <p className="text-sm  text-on_dark_text_gray">
                            Don’t have an account yet?
                            <Link href="/register" >
                                <GradientText className='whitespace-pre-wrap'> Sign up</GradientText>
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
                <GoogleButton onClick={() => { signIn("google", { callbackUrl: callbackUrl || "/" }); }} type='button' title='Sign in with google' />
            </div>
        </LoginRegisterWrapper>
    )
}

export default Login