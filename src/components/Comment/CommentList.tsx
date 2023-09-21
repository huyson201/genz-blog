
import React from 'react'
import Profile from '@/assets/profile.jpg'
import Image from 'next/image'
type Props = {}

const CommentList = (props: Props) => {
    return (
        <div className='mt-6 space-y-8'>
            <div className='comment-box '>
                <div className='flex-col gap-y-4 md:flex-row flex justify-between items-start'>
                    <div className='flex items-center gap-x-2 md:flex-1 comment-head'>
                        <Image src={Profile} alt='avatar' width={40} height={40} className='rounded-full' />
                        <div>
                            <div className='font-bold text-[#4e658a] dark:text-[#66768f]'>Robert Fox</div>
                            <div className='text-[#4e658a] dark:text-[#66768f] text-sm font-normal'>August 25, 2023</div>
                        </div>
                    </div>
                    <div className='bg-on_light_card_bg dark:bg-on_dark_card_bg border text-sm md:text-base
                 dark:border-on_dark_border border-on_light_border_2 p-4 md:w-3/5 rounded-lg text-[#c2d4ee] dark:text-[#94a9c9]'>
                        White white dreamy drama tically place everything although. Place out apartment afternoon whimsical kinder, little romantic joy we flowers handmade.
                    </div>
                </div>
                {/*  */}
                <div className='comment-box '>
                    <div className='flex-col gap-y-4 md:flex-row flex justify-between items-start'>
                        <div className='flex items-center gap-x-2 md:flex-1 comment-head'>
                            <Image src={Profile} alt='avatar' width={40} height={40} className='rounded-full' />
                            <div>
                                <div className='font-bold text-[#4e658a] dark:text-[#66768f]'>Robert Fox</div>
                                <div className='text-[#4e658a] dark:text-[#66768f] text-sm font-normal'>August 25, 2023</div>
                            </div>
                        </div>
                        <div className='bg-on_light_card_bg dark:bg-on_dark_card_bg border text-sm md:text-base
                 dark:border-on_dark_border border-on_light_border_2 p-4 md:w-3/5 rounded-lg text-[#c2d4ee] dark:text-[#94a9c9]'>
                            White white dreamy drama tically place everything although. Place out apartment afternoon whimsical kinder, little romantic joy we flowers handmade.
                        </div>
                    </div>

                </div>
            </div>
            <div className='comment-box '>
                <div className='flex-col gap-y-4 md:flex-row flex justify-between items-start'>
                    <div className='flex items-center gap-x-2 md:flex-1 comment-head'>
                        <Image src={Profile} alt='avatar' width={40} height={40} className='rounded-full' />
                        <div>
                            <div className='font-bold text-[#4e658a] dark:text-[#66768f]'>Robert Fox</div>
                            <div className='text-[#4e658a] dark:text-[#66768f] text-sm font-normal'>August 25, 2023</div>
                        </div>
                    </div>
                    <div className='bg-on_light_card_bg dark:bg-on_dark_card_bg border text-sm md:text-base
                 dark:border-on_dark_border border-on_light_border_2 p-4 md:w-3/5 rounded-lg text-[#c2d4ee] dark:text-[#94a9c9]'>
                        White white dreamy drama tically place everything although. Place out apartment afternoon whimsical kinder, little romantic joy we flowers handmade.
                    </div>
                </div>

            </div>

            <div className='comment-box '>
                <div className='flex-col gap-y-4 md:flex-row flex justify-between items-start'>
                    <div className='flex items-center gap-x-2 md:flex-1 comment-head'>
                        <Image src={Profile} alt='avatar' width={40} height={40} className='rounded-full' />
                        <div>
                            <div className='font-bold text-[#4e658a] dark:text-[#66768f]'>Robert Fox</div>
                            <div className='text-[#4e658a] dark:text-[#66768f] text-sm font-normal'>August 25, 2023</div>
                        </div>
                    </div>
                    <div className='bg-on_light_card_bg dark:bg-on_dark_card_bg border text-sm md:text-base
                 dark:border-on_dark_border border-on_light_border_2 p-4 md:w-3/5 rounded-lg text-[#c2d4ee] dark:text-[#94a9c9]'>
                        White white dreamy drama tically place everything although. Place out apartment afternoon whimsical kinder, little romantic joy we flowers handmade.
                    </div>
                </div>

            </div>

        </div>
    )
}

export default CommentList