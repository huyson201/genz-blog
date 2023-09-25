"use client";


import React, { useState } from 'react'
import Navbar from '../Navbar'
import MobileNavbar from '../MobileNavbar/MobileNavbar'
import { MobileNavContextProvider } from '@/contexts/MobileNavContext';

type Props = {}

const NavbarWrapper = (props: Props) => {
    const [showNavMobile, setShowNavMobile] = useState(false)
    return (
        <MobileNavContextProvider>
            <Navbar />
            <MobileNavbar />
        </MobileNavContextProvider>

    )
}

export default NavbarWrapper