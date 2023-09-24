"use client"
import ErrorFeedback from '@/components/ErrorFeedback/ErrorFeedback'
import InputField from '@/components/Input/InputField'
import UploadImage from '@/components/UploadImage/UploadImage'
import { RequireAuthException } from '@/lib/exception'
import authService from '@/services/auth.service'
import { Auth, UpdateProfileData } from '@/types/type'
import { Metadata } from 'next'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import useSWRMutation from 'swr/mutation'
import { twMerge } from 'tailwind-merge'

type Props = {
    data: Auth
}
export const metadata: Metadata = {
    title: 'Profile - Customize Your Information - Gen Z Blogger',
    description: "Explore and customize your profile on Gen Z Blogger with our user-friendly editing tool. Update your information, add details, and personalize your user profile the way you want.",
    alternates: {
        canonical: "/profile"
    },
    openGraph: {
        title: 'Profile - Customize Your Information - Gen Z Blogger',
        description: "Explore and customize your profile on Gen Z Blogger with our user-friendly editing tool. Update your information, add details, and personalize your user profile the way you want.",
    },
}
const Profile = ({ data }: Props) => {
    const { data: session, update: sessionUpdate } = useSession()
    const [openBrowser, setBrowser] = useState(false)
    const { trigger, isMutating } = useSWRMutation("/auth/profile", (url: string, { arg }: { arg: { token: string, data: UpdateProfileData } }) => authService.updateProfile(arg.token, arg.data))
    const [error, setError] = useState("")
    const [previewImg, setPreviewImg] = useState<string>()
    const inputNameRef = useRef<HTMLInputElement>(null)
    const router = useRouter()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")
        if (!inputNameRef.current || inputNameRef.current.value === "") {
            setError("Name is required")
            return
        }

        if (!session) return
        try {
            const value = inputNameRef.current.value
            const triggerPromise = trigger({
                token: session.backendTokens.access_token,
                data: { name: value, avatar_url: previewImg }
            })

            const res = await toast.promise(triggerPromise, {
                error: "Update profile fail!",
                success: "Successfully update profile!",
                loading: "saving!"
            })
            const sessionRes = await sessionUpdate({
                ...session,
                user: res
            })
            router.refresh()
        } catch (error: any) {
            setError(error.message)
        }
    }

    const handleSelectImg = (img: string) => {
        setPreviewImg(img)
        setBrowser(false)
    }

    return (
        <>
            <form action={"#"} onSubmit={handleSubmit} className='mt-4 space-y-6'>
                <div className="flex items-center justify-center ">
                    <div className='relative cursor-pointer' onClick={() => setBrowser(true)}>
                        <Image src={previewImg ?? data.avatar_url} alt='avatar' height={72} width={72} className='rounded-full w-[72px] h-[72px]' />
                        <div className='text-xs text-center font-medium absolute bottom-0 w-full left-0 bg-black/60 text-white'>Change</div>
                    </div>
                </div>
                <div>
                    <div className='text-sm dark:text-gray-500 text-[#606266]'>Email</div>
                    <div className=' mt-2 flex items-center gap-6'>
                        <div className='opacity-80 text-on_text_gray_2 '>{data.email}</div>
                        <button
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
                    <InputField ref={inputNameRef} className='mt-2 py-1 rounded' type='text' defaultValue={data.name} />
                </div>
                {
                    error !== "" && <div>
                        <ErrorFeedback message='error' />
                    </div>
                }
                <div className='flex items-center justify-end gap-3 '>
                    <Link href={"/me"} className='text-sm px-2 py-1.5 rounded border hover:bg-gray-100 dark:hover:bg-on_dark_card_bg border-on_light_border_2 dark:border-on_dark_border transition-all'>
                        Cancel
                    </Link>
                    <button className='text-sm font-semibold rounded bg-primary-gradient text-white bg-200% hover:bg-right transition-all px-2 py-1.5'>
                        Save Change
                    </button>
                </div>
            </form>
            <UploadImage onSelectImage={handleSelectImg} showBlankSelect={false} open={openBrowser} onRequestClose={() => setBrowser(false)} />
        </>
    )
}

export default Profile