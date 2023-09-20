"use client"
import InputField from '@/components/Input/InputField'
import UploadImage from '@/components/UploadImage/UploadImage'
import { RequireAuthException } from '@/lib/exception'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

type Props = {}

const Profile = (props: Props) => {
    const { data: session } = useSession()
    const [openBrowser, setBrowser] = useState(false)
    if (!session) return <div> loading... </div>

    return (
        <>
            <form action={"#"} className='mt-4 space-y-6'>
                <div className="flex items-center justify-center ">
                    <div className='relative cursor-pointer' onClick={() => setBrowser(true)}>
                        <Image src={session.user.avatar_url} alt='avatar' height={72} width={72} className='rounded-full' />
                        <div className='text-xs text-center font-medium absolute bottom-0 w-full left-0 bg-black/60 text-white'>Change</div>
                    </div>
                </div>
                <div>
                    <div className='text-sm dark:text-gray-500 text-[#606266]'>Email</div>
                    <div className='opacity-80 text-on_text_gray_2 mt-2 '>{session.user.email}</div>
                </div>
                <div>
                    <label htmlFor="#new-pw" className='text-sm dark:text-gray-500 text-[#606266]'>
                        <span className='text-red-400'>*</span> Display Name
                    </label>
                    <InputField className='mt-2 py-1 rounded' type='text' defaultValue={session.user.name} />
                </div>
                <div className='flex items-center justify-end gap-3 '>
                    <Link href={"/me"} className='text-sm px-2 py-1.5 rounded border hover:bg-gray-100 dark:hover:bg-on_dark_card_bg border-on_light_border_2 dark:border-on_dark_border transition-all'>
                        Cancel
                    </Link>
                    <button className='text-sm font-semibold rounded bg-primary-gradient text-white bg-200% hover:bg-right transition-all px-2 py-1.5'>
                        Save Change
                    </button>
                </div>
            </form>
            <UploadImage showBlankSelect={false} open={openBrowser} onRequestClose={() => setBrowser(false)} />
        </>
    )
}

export default Profile