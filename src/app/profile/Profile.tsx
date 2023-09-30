"use client"
import { Button, buttonVariants } from '@/components/Button/Button'
import ErrorFeedback from '@/components/ErrorFeedback/ErrorFeedback'
import Input from '@/components/Input/Input'
import UploadImage from '@/components/UploadImage/UploadImage'
import authService from '@/services/auth.service'
import { Auth, UpdateProfileData } from '@/types/type'
import { cn } from '@/utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import useSWRMutation from 'swr/mutation'
import { twMerge } from 'tailwind-merge'
import * as yup from 'yup'
type Props = {
    data: Auth
}

const schema = yup.object({
    name: yup.string().required()
})

const Profile = ({ data }: Props) => {
    const { data: session, update: sessionUpdate } = useSession()
    const [openBrowser, setBrowser] = useState(false)
    const { trigger, isMutating } = useSWRMutation("/auth/profile", (url: string, { arg }: { arg: { token: string, data: UpdateProfileData } }) => authService.updateProfile(arg.token, arg.data))
    const [error, setError] = useState("")
    const [previewImg, setPreviewImg] = useState<string>()
    const router = useRouter()



    const handleSelectImg = (img: string) => {
        setPreviewImg(img)
        setBrowser(false)
    }

    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        reValidateMode: "onChange"
    })


    const isProfileChange = (currentData: Auth, changeData: { previewImg?: string, name: string }) => {
        return (changeData.previewImg !== currentData.avatar_url || changeData.name !== currentData.name)

    }

    const submitForm = handleSubmit(async (formData) => {
        if (!session) return
        if (!isProfileChange(data, { previewImg: previewImg, name: formData.name })) return

        try {
            const triggerPromise = trigger({
                token: session.backendTokens.access_token,
                data: { name: formData.name, avatar_url: previewImg }
            })

            const toastMessage = {
                error: "Update profile fail!",
                success: "Successfully update profile!",
                loading: "saving!"
            }
            const res = await toast.promise(triggerPromise, toastMessage)

            const profileUpdatingData = {
                ...session,
                user: res
            }
            await sessionUpdate(profileUpdatingData)
            router.refresh()
        } catch (error: any) {
            setError(error.message)
        }
    })

    return (
        <>
            <form action={"#"} onSubmit={submitForm} className='mt-4 space-y-6'>

                <div className="flex items-center justify-center ">
                    <div className='relative cursor-pointer' onClick={() => setBrowser(true)}>
                        <Image src={previewImg ?? data.avatar_url} alt='avatar' height={72} width={72} className='rounded-full w-[72px] h-[72px]' />
                        <div className='text-xs text-center font-medium absolute bottom-0 w-full left-0 bg-black/60 text-white'>Change</div>
                    </div>
                </div>
                {
                    error !== "" && <div>
                        <ErrorFeedback message={error} className='p-0' />
                    </div>
                }
                <div>
                    <div className='text-sm dark:text-gray-500 text-[#606266]'>Email</div>
                    <div className=' mt-2 flex  gap-6'>
                        <div className='opacity-80 text-on_text_gray_2 '>{data.email}</div>
                        <button
                            type='button'
                            onClick={() => router.push("/auth/verify-request")}
                            disabled={data.verified}
                            className={twMerge(`text-xs border text-center rounded px-1 py-0.5 `, !data.verified ? 'text-red-400 border-red-400' : 'text-green-500 border-green-500')}>
                            Verified
                        </button>
                    </div>
                </div>
                <div>
                    <label htmlFor="#new-pw" className='text-sm dark:text-gray-500 text-[#606266]'>
                        <span className='text-red-400'>*</span> Display Name
                    </label>
                    <Input {...register("name")} className='mt-2 text-sm' inputSize={"xs"} type='text' defaultValue={data.name} error={errors.name?.message} valid={errors.name ? "invalid" : "none"} />
                </div>

                <div className='flex items-center justify-end gap-3 '>
                    <Link href={"/me"} className={cn(buttonVariants({ size: "xs", variant: "outline" }))}>
                        Cancel
                    </Link>
                    <Button disabled={isMutating} disable={isMutating ? "disabled" : "none"} size={"xs"}>
                        Save Change
                    </Button>

                </div>
            </form>
            <UploadImage onSelectImage={handleSelectImg} showBlankSelect={false} open={openBrowser} onRequestClose={() => setBrowser(false)} />
        </>
    )
}

export default Profile