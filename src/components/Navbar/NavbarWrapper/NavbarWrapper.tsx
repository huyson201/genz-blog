"use client";


import React from 'react'
import Navbar from '../Navbar'
import MobileNavbar from '../MobileNavbar/MobileNavbar'
import { MobileNavContextProvider } from '@/contexts/MobileNavContext';

type Props = {}

const NavbarWrapper = (props: Props) => {
    return (
        <MobileNavContextProvider>
            <Navbar />
            <MobileNavbar />
        </MobileNavContextProvider>

    )
}

export default NavbarWrapper