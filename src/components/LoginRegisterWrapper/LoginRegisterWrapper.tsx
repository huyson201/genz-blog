
import React from 'react'
import Wrapper from '../Common/Wrapper/Wrapper'

type Props = {
    children: any
}

const LoginRegisterWrapper = ({ children }: Props) => {
    return (
        <section className='mb-32'>
            <Wrapper>
                <div className='py-12 relative after:absolute after:bottom-0 after:right-0 after:hidden lg:after:block after:translate-x-1/4  xl:after:-translate-x-1/3 after:translate-y-[20%] after:w-[329px] after:h-[312px] after:bg-security '>
                    {children}
                </div>
            </Wrapper>
        </section>
    )
}

export default LoginRegisterWrapper