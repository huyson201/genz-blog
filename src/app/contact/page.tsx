

import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import Wrapper from '@/components/Common/Wrapper/Wrapper'
import GoogleMap from '@/components/GoogleMap/GoogleMap'
import GradientText from '@/components/GradientText/GradientText'
import React from 'react'

type Props = {}

const Contact = (props: Props) => {
    return (
        <section>
            <Wrapper>
                <div className='py-6 mb-40'>
                    <Breadcrumb />
                    <h1 className='mt-6 text-center '>
                        <GradientText size={"xl"} className='font-extrabold' >
                            Contact Us
                        </GradientText>
                    </h1>

                    <p className='mt-6 md:px-24 text-center text-[#708ab0] dark:text-on_dark_text_gray text-base sm:text-xl'>
                        I am a passionate, dedicated, and creative software developer. I truly love the field of software development and particularly enjoy tackling technical challenges. To me, programming is not just a job but also a personal passion and mission. I constantly seek perfection in building applications, ensuring that my code is of the highest quality and adheres to best practices. I always prioritize optimizing speed, security, and performance to deliver outstanding software products.
                    </p>
                    <div className='flex flex-wrap items-center gap-x-4 gap-y-6 justify-center mt-12'>
                        <div className='text-on_dark_text_gray text-sm text-center py-[10px] pl-[50px] bg-headset bg-no-repeat'>
                            (84) 868-894-648
                        </div>
                        <div className='text-on_dark_text_gray text-sm text-center py-[10px] pl-[50px] bg-marker bg-no-repeat'>
                            sonnguyen201.dev&#8203;@gmail.com
                        </div>
                        <div className='text-on_dark_text_gray text-sm text-center py-[10px] pl-[50px] bg-paper-plane bg-no-repeat'>
                            Ho Chi Minh City
                        </div>
                    </div>

                    <GoogleMap />
                </div>
            </Wrapper>
        </section>
    )
}

export default Contact