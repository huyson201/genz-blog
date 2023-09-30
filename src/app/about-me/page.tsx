
import Wrapper from '@/components/Common/Wrapper/Wrapper'
import React from 'react'
import ProfilePicture from '@/assets/profile.jpg'
import Image from 'next/image'
import GradientText from '@/components/GradientText/GradientText'
import SocialCircle from '@/components/SocialCircle/SocialCircle'
import { FaFacebookF, FaInstagram, FaLocationDot, FaTwitter } from 'react-icons/fa6'
import { PiGithubLogoFill } from 'react-icons/pi'
import { FaUserAlt } from 'react-icons/fa'
import { BsFillCalendarDayFill, BsFillTelephoneFill } from 'react-icons/bs'
import { IoMdMail } from 'react-icons/io'
import { Metadata } from 'next'
import { createOpenGraphImg } from '@/utils'


type Props = {}
export const metadata: Metadata = {
    title: 'My Portfolio - Learn About Me and My Work',
    description: "Explore my portfolio to get to know me better and discover my work. Learn about my skills, experiences, and projects in web development, design, and more.",
    alternates: {
        canonical: "/about-me"
    },
    openGraph: {
        title: 'My Portfolio - Learn About Me and My Work',
        description: "Explore my portfolio to get to know me better and discover my work. Learn about my skills, experiences, and projects in web development, design, and more.",
        images: [`https://i.ibb.co/h1YB2N4/kea64p064kaz4inli0tcp44w.png`],
        url: "/about-me"
    },
}

const skillIcons = [
    {
        url: "https://svgshare.com/i/xqv.svg",
        alt: "html"
    },
    {
        url: 'https://svgshare.com/i/xqE.svg',
        alt: "css"
    },
    {
        url: 'https://svgshare.com/i/xoq.svg',
        alt: "sass"
    },
    {
        url: 'https://svgshare.com/i/xqt.svg',
        alt: "nodejs"
    },
    {
        url: 'https://svgshare.com/i/xqi.svg',
        alt: "js"
    },
    {
        url: 'https://svgshare.com/i/xqj.svg',
        alt: "ts"
    },
    {
        url: 'https://svgshare.com/i/xoH.svg',
        alt: "react"
    },
    {
        url: 'https://svgshare.com/i/xor.svg',
        alt: "redux"
    },
    {
        url: 'https://svgshare.com/i/xqk.svg',
        alt: "mysql"
    },
    {
        url: 'https://svgshare.com/i/xqw.svg',
        alt: "mongo"
    },
    {
        url: 'https://svgshare.com/i/xqY.svg',
        alt: "redis"
    },
    {
        url: 'https://svgshare.com/i/xqP.svg',
        alt: "git"
    },
    {
        url: 'https://svgshare.com/i/xqu.svg',
        alt: "express"
    },
    {
        url: 'https://svgshare.com/i/xqD.svg',
        alt: "nestJs"
    },
    {
        url: 'https://svgshare.com/i/xqZ.svg',
        alt: "nextJs"
    },
]
const page = (props: Props) => {
    const skillImages = skillIcons.map((icon, idx) => (
        <Image key={idx.toString()} className='w-full' src={icon.url} width={300} height={300} alt={icon.alt} />

    ))
    return (
        <div className='mb-12'>
            <div className='bg-on_dark_card_bg dark:bg-on_dark_card_bg '>
                <Wrapper>
                    <div className=' py-16 xl:px-16 flex flex-col sm:flex-row gap-6 sm:items-center'>
                        <Image className='dark:shadow-[0_3px_20px_rgba(11,209,209,.2)] transition-shadow
                        dark:hover:shadow-[0_3px_20px_rgba(11,209,209,.3)] rounded-full border border-blue'
                            width={160}
                            height={160}
                            src={ProfilePicture} alt='avatar' />
                        <div className='space-y-4'>
                            <span className='dark:text-on_dark_text_gray font-bold text-[#7e9cc7] text-sm transition-colors'>Hello Everyone!</span>
                            <h1 className=''>
                                <GradientText className='font-bold text-[22px] md:text-2xl lg:text-3xl' size={"default"}>
                                    I&apos;m Son Nguyen, a lover of technology, business and experiencing new things
                                </GradientText>
                            </h1>
                            <div className='flex items-center gap-3'>
                                <SocialCircle href={"#"}>
                                    <FaFacebookF />
                                </SocialCircle>
                                <SocialCircle href={"#"} >
                                    <FaInstagram />
                                </SocialCircle>
                                <SocialCircle href={"#"} >
                                    <FaTwitter />
                                </SocialCircle>
                                <SocialCircle href={"#"} >
                                    <PiGithubLogoFill />
                                </SocialCircle>
                            </div>
                        </div>
                    </div>
                </Wrapper>
            </div>

            <Wrapper>
                <div className='py-12 xl:px-16'>
                    <h2 className='text-center'>
                        <GradientText size={"lg"} className='font-bold'>
                            About Me
                        </GradientText>
                    </h2>
                    <div className=' flex items-center justify-center flex-col py-6 '>
                        <div className='w-full md:w-[400px] space-y-6'>
                            <div className="flex items-center ">
                                <div className='w-2/4 text-on_text_gray_2 font-medium gap-1.5 flex items-center'>
                                    <span className="text-sm w-6 h-6 flex items-center justify-center rounded-full bg-primary-gradient bg-200%
                                text-white
                                ">
                                        <FaUserAlt />
                                    </span>
                                    Name:
                                </div>
                                <div className='w-2/4 text-on_light_text_gray dark:text-on_dark_text_gray'>Nguyen Doan Huy Son</div>
                            </div>

                            <div className="flex items-center ">
                                <div className='w-2/4  text-on_text_gray_2 font-medium gap-1.5 flex items-center'>
                                    <span className="text-sm w-6 h-6 flex items-center justify-center rounded-full bg-primary-gradient bg-200%
                                text-white
                                ">
                                        <BsFillCalendarDayFill />
                                    </span>
                                    Date of Birth:
                                </div>
                                <div className='w-2/4 text-on_light_text_gray dark:text-on_dark_text_gray'>15/05/2001</div>
                            </div>
                            <div className="flex items-center ">
                                <div className='w-2/4  text-on_text_gray_2 font-medium gap-1.5 flex items-center'>
                                    <span className="text-sm w-6 h-6 flex items-center justify-center rounded-full bg-primary-gradient bg-200%
                                text-white
                                ">
                                        <FaLocationDot />
                                    </span>
                                    Address:
                                </div>
                                <div className='w-2/4 text-on_light_text_gray dark:text-on_dark_text_gray'>Tp. Ho Chi Minh</div>
                            </div>
                            <div className="flex items-center ">
                                <div className='w-2/4  text-on_text_gray_2 font-medium gap-1.5 flex items-center'>
                                    <span className="text-sm w-6 h-6 flex items-center justify-center rounded-full bg-primary-gradient bg-200%
                                text-white
                                ">
                                        <IoMdMail />
                                    </span>
                                    Email:
                                </div>
                                <div className='w-2/4 text-on_light_text_gray dark:text-on_dark_text_gray'>sonnguyen201.dev&#8203;@gmail.com</div>
                            </div>
                            <div className="flex items-center ">
                                <div className='w-2/4  text-on_text_gray_2 font-medium gap-1.5 flex items-center'>
                                    <span className="text-sm w-6 h-6 flex items-center justify-center rounded-full bg-primary-gradient bg-200%
                                text-white
                                ">
                                        <BsFillTelephoneFill />
                                    </span>
                                    Phone:
                                </div>
                                <div className='w-2/4 text-on_light_text_gray dark:text-on_dark_text_gray'>+84868894648</div>
                            </div>
                        </div>
                    </div>
                    <h2 className='text-center mt-12'>
                        <GradientText size={"lg"} className='font-bold'>
                            My Skills
                        </GradientText>
                    </h2>
                    <div className='mt-4 grid grid-cols-3 sm:grid-cols-6 gap-6 md:grid-cols-7'>
                        {skillImages}
                    </div>
                </div>
            </Wrapper>
        </div>


    )
}

export default page