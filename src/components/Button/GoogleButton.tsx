
import Image from 'next/image'
import React from 'react'
import googleIcon from '@/assets/google.svg'


interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    title: string
}

const GoogleButton = ({ title, className, ...props }: Props) => {
    return (
        <button className='w-full flex items-center justify-center gap-2 text-[#708ab0] dark:text-on_dark_text_gray text-sm font-bold
                                           py-2 rounded-3xl border-[#c2d4ee] bg-on_light_card_bg dark:bg-on_dark_card_bg dark:border-on_dark_border border  transition-all
                                           hover:-translate-y-0.5 dark:hover:text-on_dark_text_white hover:text-on_light_text_white'>
            <Image src={googleIcon} alt='google icon' />
            <span>{title}</span>
        </button>
    )
}

export default GoogleButton