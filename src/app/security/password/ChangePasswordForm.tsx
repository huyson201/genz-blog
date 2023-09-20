"use client"

import PasswordInput from '@/components/Input/PasswordInput'
import React from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Props = {}

const ChangePasswordForm = (props: Props) => {
    const router = useRouter()

    return (
        <form action="#" className='mt-4 space-y-6'>
            <div>
                <label htmlFor="#current-pw" className='text-sm dark:text-gray-500 text-[#606266]'>
                    <span className='text-red-400'>*</span> Current password
                </label>
                <PasswordInput id='current-pw' className='py-1 rounded mt-2' />
            </div>
            <div>
                <label htmlFor="#new-pw" className='text-sm dark:text-gray-500 text-[#606266]'>
                    <span className='text-red-400'>*</span> New password
                </label>
                <PasswordInput id='new-pw' className='py-1 rounded mt-2' />
            </div>
            <div>
                <label htmlFor="#confirm-pw" className='text-sm dark:text-gray-500 text-[#606266]'>
                    <span className='text-red-400'>*</span> Re-enter new password
                </label>
                <PasswordInput id='confirm-pw' className='py-1 rounded mt-2' />
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
    )
}

export default ChangePasswordForm