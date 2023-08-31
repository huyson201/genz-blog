
import React from 'react'
import Wrapper from '../Common/Wrapper/Wrapper'
import Image from 'next/image'
import Error404 from '@/assets/404.svg'
import Link from 'next/link'
type Props = {}

const Page404 = (props: Props) => {
  return (
    <section className='relative after:w-full after:h-full after:top-0 after:bg-[100%] after:left-0 after:bg-no-repeat after:absolute  after:bg-shadow-2'>
      <Wrapper className='relative z-[2]'>
        <div className='flex flex-col lg:flex-row py-24 md:px-16 justify-center lg:justify-start lg:items-center gap-12'>
          <Image src={Error404} alt='error-404' />
          <div className='space-y-4'>
            <h1 className='bg-primary-gradient inline-block bg-clip-text bg-200% text-transparent xs:text-[25px] text-[20px] sm:text-[35px] md:text-[45px] font-bold'>Don&apos;t be spooked !</h1>
            <p className='text-base xs:text-[18px] md:text-xl text-[#708ab0] dark:text-on_dark_text_gray lg:w-3/4'>
              The page you’re looking for has slipped in to an unknown realm. Click the button below to go back to the homepage.
            </p>
            <Link href={'/'} className='px-4 py-2.5 inline-block mt-6 rounded-lg bg-primary-gradient
                                         hover:bg-right hover:-translate-y-0.5 transition-all duration-500
                                         bg-200% text-white text-sm font-bold'>
              Homepage
            </Link>
          </div>
        </div>

      </Wrapper>
    </section>
  )
}

export default Page404