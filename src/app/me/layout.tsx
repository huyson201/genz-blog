
"use client"
import Wrapper from '@/components/Common/Wrapper/Wrapper'
import ManagerHead from '@/components/ManagerHead/ManagerHead'
import SidebarNav from '@/components/SidebarNav/SidebarNav'
import React, { Fragment } from 'react'


type Props = {
    children: React.ReactNode
}

const MeLayout = ({ children }: Props) => {
    return (
        <section className='mb-12 pt-6 pb-12'>
            <Wrapper>
                <div className='flex relative'>
                    <SidebarNav />
                    <div className='flex-1 md:pl-6'>
                        <ManagerHead />
                        {children}
                    </div>
                </div>
            </Wrapper>
        </section>
    )
}

export default MeLayout