
import Wrapper from '@/components/Common/Wrapper/Wrapper'
import React from 'react'
import ProfilePicture from '@/assets/profile.jpg'
import Image from 'next/image'
import GradientText from '@/components/GradientText/GradientText'
import SocialCircle from '@/components/SocialCircle/SocialCircle'
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa6'
import { PiGithubLogoFill } from 'react-icons/pi'


type Props = {}

const page = (props: Props) => {
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
                <div className='py-6 xl:px-16'>
                    <h2 className='text-center'>
                        <GradientText size={"lg"} className='font-bold'>
                            About
                        </GradientText>
                    </h2>
                    <h2 className='text-center'>
                        <GradientText size={"lg"} className='font-bold'>
                            My Skills
                        </GradientText>
                    </h2>
                    <div className='mt-4 grid grid-cols-3 sm:grid-cols-6 gap-6 md:grid-cols-7'>
                        <Image className='w-full' src={'https://svgshare.com/i/xqv.svg'} width={300} height={300} alt='html' />
                        <Image className='w-full' src={'https://svgshare.com/i/xqE.svg'} width={300} height={300} alt='css' />
                        <Image className='w-full' src={' https://svgshare.com/i/xoq.svg'} width={300} height={300} alt="sass" />
                        <Image className='w-full' src={'https://svgshare.com/i/xqt.svg'} width={300} height={300} alt="nodejs" />
                        <Image className='w-full' src={'https://svgshare.com/i/xqi.svg'} width={300} height={300} alt="js" />
                        <Image className='w-full' src={'https://svgshare.com/i/xqj.svg'} width={300} height={300} alt="ts" />
                        <Image className='w-full' src={'https://svgshare.com/i/xoH.svg'} width={300} height={300} alt="react" />
                        <Image className='w-full' src={'https://svgshare.com/i/xor.svg'} width={300} height={300} alt="redux" />
                        <Image className='w-full' src={'https://svgshare.com/i/xqk.svg'} width={300} height={300} alt="mysql" />
                        <Image className='w-full' src={'https://svgshare.com/i/xqw.svg'} width={300} height={300} alt="mongo" />
                        <Image className='w-full' src={'https://svgshare.com/i/xqY.svg'} width={300} height={300} alt="redis" />
                        <Image className='w-full' src={'https://svgshare.com/i/xqP.svg'} width={300} height={300} alt="git" />
                        <Image className='w-full' src={'https://svgshare.com/i/xqu.svg'} width={300} height={300} alt="express" />
                        <Image className='w-full' src={'https://svgshare.com/i/xqD.svg'} width={300} height={300} alt="express" />
                        <Image className='w-full' src={'https://svgshare.com/i/xqZ.svg'} width={300} height={300} alt="express" />
                    </div>
                </div>
            </Wrapper>



        </div>

    )
}

export default page