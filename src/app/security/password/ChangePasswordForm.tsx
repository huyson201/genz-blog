"use client"
import PasswordInput from '@/components/Input/PasswordInput'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form'
import ErrorFeedback from '@/components/ErrorFeedback/ErrorFeedback'
import useSWRMutation from 'swr/mutation'
import { ChangePasswordData } from '@/types/type'
import authService from '@/services/auth.service'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
const schema = yup.object({
    current_password: yup.string().required().min(6).max(32),
    new_password: yup.string().required().min(6).max(32),
    confirm_new_password: yup.string().required().oneOf([yup.ref("new_password")], "password must match")
})
type Props = {}

const ChangePasswordForm = (props: Props) => {
    const router = useRouter()
    const [error, setError] = useState<string>()
    const { data: session } = useSession()
    const { trigger, isMutating, reset: resetMutate } = useSWRMutation("/auth/change-password",
        (
            url: string,
            { arg }: { arg: { token: string; data: ChangePasswordData; } }
        ) => authService.changePassword(arg.token, arg.data))

    const { handleSubmit, register, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
        reValidateMode: "onBlur"
    })

    const submit = handleSubmit(async (data) => {
        if (!session) return
        setError("")
        try {
            await toast.promise(trigger({ token: session.backendTokens.access_token, data }), {
                loading: "Changing password!",
                success: "Password changed!",
                error: "Change password fail!"
            })
            router.push("/me")
        } catch (error: any) {
            setError(error.message)
        }
        finally {
            reset()
        }

    })


    return (
        <form action="#" className='mt-4 space-y-6' onSubmit={submit}>
            {
                error && error !== "" && <ErrorFeedback message={error} />
            }
            <div>
                <label htmlFor="#current-pw" className='text-sm dark:text-gray-500 text-[#606266]'>
                    <span className='text-red-400'>*</span> Current password
                </label>
                <PasswordInput {...register("current_password")} id='current-pw' className='py-1 rounded mt-2' />
                {
                    errors.current_password && <ErrorFeedback message={errors.current_password.message || ""} />
                }
            </div>
            <div>
                <label htmlFor="#new-pw" className='text-sm dark:text-gray-500 text-[#606266]'>
                    <span className='text-red-400'>*</span> New password
                </label>
                <PasswordInput {...register("new_password")} id='new-pw' className='py-1 rounded mt-2' />
                {
                    errors.new_password && <ErrorFeedback message={errors.new_password.message || ""} />
                }
            </div>
            <div>
                <label htmlFor="#confirm-pw" className='text-sm dark:text-gray-500 text-[#606266]'>
                    <span className='text-red-400'>*</span> Re-enter new password
                </label>
                <PasswordInput {...register("confirm_new_password")} id='confirm-pw' className='py-1 rounded mt-2' />
                {
                    errors.confirm_new_password && <ErrorFeedback message={errors.confirm_new_password.message || ""} />
                }
            </div>
            <div className='flex items-center justify-end gap-3 '>
                <Link href={"/me"} className='text-sm px-2 py-1.5 rounded border hover:bg-gray-100 dark:hover:bg-on_dark_card_bg border-on_light_border_2 dark:border-on_dark_border transition-all'>
                    Cancel
                </Link>
                <button type='submit' className='text-sm font-semibold rounded bg-primary-gradient text-white bg-200% hover:bg-right transition-all px-2 py-1.5'>
                    Save Change
                </button>
            </div>
        </form>
    )
}

export default ChangePasswordForm