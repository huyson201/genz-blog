"use client"
import useSWRMutation from 'swr/mutation'
import Link from 'next/link'
import React from 'react'
import InputField from '@/components/Input/InputField'
import PasswordInput from '@/components/Input/PasswordInput'
import LoginRegisterWrapper from '@/components/LoginRegisterWrapper/LoginRegisterWrapper'
import GoogleButton from '@/components/Button/GoogleButton'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import ErrorFeedback from '@/components/ErrorFeedback/ErrorFeedback'
import authService from '@/services/auth.service'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'react-hot-toast'
import CustomError from '@/CustomError'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/Button/Button'
import { ColorRing } from 'react-loader-spinner'
import GradientText from '@/components/GradientText/GradientText'
const validateSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).max(32).required(),
    confirm_password: yup.string().required().oneOf([yup.ref('password')], 'Passwords must match')
})

type Props = {}

const Register = (props: Props) => {
    const { trigger, isMutating, error: fetchError } = useSWRMutation('/auth/register', authService.register)
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get("callbackUrl")
    const router = useRouter()
    const [error, setError] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: yupResolver(validateSchema),
        reValidateMode: 'onBlur',
    })
    const submit = handleSubmit(async (data) => {
        setError('')
        try {
            const res = await trigger(data)
            toast.success('Successfully registered!')
            return router.push("/login")
        } catch (error) {
            if (error instanceof CustomError) {
                setError(error.message)
                return
            }

            toast.error('Something error, please come back late!')
        }
    })


    return (
        <LoginRegisterWrapper>
            <h1 className="text-center mb-6 md:mb-12">
                <GradientText size={"sm"} className='font-bold leading-tight tracking-tight'>
                    Register
                </GradientText>
            </h1>
            <div className='max-w-[400px] w-full mx-auto relative'>
                <div className="w-full md:space-y-6 sm:p-8 p-8  rounded-xl  border md:mt-0 sm:max-w-md bg-on_light_card_bg border-on_light_border_2 dark:bg-on_dark_card_bg dark:border-on_dark_border">
                    {(errors.name || errors.confirm_password || errors.email || errors.password || error !== '') && <ErrorFeedback message={errors.email?.message || errors.password?.message || errors.name?.message || errors.confirm_password?.message || error} />}

                    <form className="space-y-4 md:space-y-6" action="#" onSubmit={submit}>
                        <InputField key={`full name`} type='text' placeholder='Full name' {...register("name")} />
                        <InputField key={`email`} type='email' placeholder='name@company.com' {...register("email")} />

                        <PasswordInput key={`password`} placeholder="Password" {...register("password")} />
                        <PasswordInput key={`confirm password`} placeholder="Confirm password" {...register("confirm_password")} />

                        <div className="flex items-center justify-between">
                            <Link href="#" className="text-sm text-on_light_text_white text-primary-600 hover:underline dark:text-on_dark_text_white">Forgot password?</Link>
                        </div>

                        <Button
                            className='w-full flex items-center justify-center rounded-lg h-10'
                            disable={isMutating ? "disabled" : "none"}
                            disabled={isMutating}
                            type='submit'>
                            {
                                loading ? <ColorRing
                                    height="30"
                                    width="30"
                                    colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                                /> : "Create an account"
                            }
                        </Button>

                        <p className="text-sm  text-on_dark_text_gray">
                            Already have an account? <Link href="/login" >
                                <GradientText>Sign in</GradientText>
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
                <GoogleButton onClick={() => { signIn("google", { callbackUrl: callbackUrl || "/" }); }} type='button' title='Sign up with google' />
            </div>
        </LoginRegisterWrapper>
    )
}

export default Register