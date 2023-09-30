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
import { Button, buttonVariants } from '@/components/Button/Button'
import { cn } from '@/utils'
const schema = yup.object({
    current_password: yup.string().required().min(6).max(32),
    new_password: yup.string().required().min(6).max(32),
    confirm_new_password: yup.string().required().oneOf([yup.ref("new_password")], "password must match")
})
type Props = {}

const changePasswordFetcher = (_: string, { arg }: { arg: { token: string; data: ChangePasswordData } }) => authService.changePassword(arg.token, arg.data)

const ChangePasswordForm = (props: Props) => {
    const router = useRouter()
    const [error, setError] = useState<string>()
    const { data: session } = useSession()


    const { trigger, isMutating } = useSWRMutation("/auth/change-password", changePasswordFetcher)

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
        <form action="#" className='mt-4 ' onSubmit={submit}>
            {
                error && <ErrorFeedback message={error} className='p-0' />
            }

            <div className='space-y-6'>
                <div>
                    <label htmlFor="#current-pw" className='text-sm dark:text-gray-500 text-[#606266]'>
                        <span className='text-red-400'>*</span> Current password
                    </label>
                    <PasswordInput valid={errors.current_password ? "invalid" : "none"} error={errors.current_password?.message} inputSize={"default"} {...register("current_password")} id='current-pw' className=' mt-2' />

                </div>
                <div>
                    <label htmlFor="#new-pw" className='text-sm dark:text-gray-500 text-[#606266]'>
                        <span className='text-red-400'>*</span> New password
                    </label>
                    <PasswordInput valid={errors.new_password ? "invalid" : "none"} error={errors.new_password?.message} inputSize={"default"} {...register("new_password")} id='new-pw' className='mt-2' />

                </div>
                <div>
                    <label htmlFor="#confirm-pw" className='text-sm dark:text-gray-500 text-[#606266]'>
                        <span className='text-red-400'>*</span> Re-enter new password
                    </label>
                    <PasswordInput valid={errors.confirm_new_password ? "invalid" : "none"} error={errors.confirm_new_password?.message} inputSize={"default"} {...register("confirm_new_password")} id='confirm-pw' className=' mt-2' />

                </div>
                <div className='flex items-center justify-end gap-3 '>
                    <Link href={"/me"} className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
                        Cancel
                    </Link>
                    <Button disabled={isMutating} disable={isMutating ? "disabled" : "none"} type='submit' size={"sm"}>
                        Save Change
                    </Button>

                </div>
            </div>
        </form>
    )
}

export default ChangePasswordForm