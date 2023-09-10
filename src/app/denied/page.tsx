
import Wrapper from '@/components/Common/Wrapper/Wrapper'
import Link from 'next/link'
import React from 'react'

type Props = {}

const Denied = (props: Props) => {
  return (
    <Wrapper>
      <div className='flex items-center justify-center flex-col py-24'>
        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-blue">403</h1>
        <div className='text-xl lg:text-2xl font-bold dark:text-on_dark_text_gray'>ACCESS FORBIDDEN</div>
        <Link href={'/'} className='px-6 py-2.5 inline-block mt-6 rounded-lg bg-primary-gradient
                                         hover:bg-right hover:-translate-y-0.5 transition-all duration-500
                                         bg-200% text-white text-sm font-bold'>
          Homepage
        </Link>
      </div>
    </Wrapper>
  )
}

export default Denied